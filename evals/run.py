#!/usr/bin/env python3
"""
Portfolio Assistant eval runner.

Tests the DEPLOYED ARTIFACT, not a reconstruction. Requests go to a real
/api/chat endpoint - production, or a Vercel preview URL for a branch - so
tools, the multi-step loop, prompt caching, and guardrails are all exercised
exactly as a real visitor would hit them. This is the distinction from the
older eval framework, which called the Anthropic API directly and therefore
could not see any of that.

Two kinds of checks per scenario, and a scenario can carry both:

  assertions - programmatic string checks (contains / not_contains /
               equals / regex). Free, deterministic, no judge call. Most
               guardrail failures are catchable this way, because the
               failure mode is "this specific thing leaked" or "this exact
               mandated response was not returned."

  rubric     - a natural-language standard handed to a judge model, for the
               genuinely subjective cases (is this trade-off real and
               specific, does this fit verdict hold up). Costs an API call,
               so only attach one where an assertion genuinely cannot do
               the job.

Every result is stamped with the commit SHA it ran against, so a score can
always be traced back to the exact deployed version that produced it. That
traceability is the whole point: without it, "when did this start failing"
is unanswerable except by manual archaeology.

Usage:
    python3 run.py suites/guardrails.v1.json
    python3 run.py suites/guardrails.v1.json --target https://<preview>.vercel.app
    python3 run.py suites/guardrails.v1.json --no-judge   # assertions only, free

Environment:
    PORTFOLIO_TESTING_SECRET  bypasses rate limiting, tags traffic as test
    ANTHROPIC_API_KEY         only needed if the suite has rubrics and
                              --no-judge was not passed
"""

import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
import uuid
from datetime import datetime, timezone

DEFAULT_TARGET = "https://alikhandesign.com"
JUDGE_MODEL = "claude-sonnet-4-6"
DELAY_SECONDS = 2

# Filled in from the X-Deployed-Commit response header - the version the
# target is actually running, which is the only SHA worth stamping a result
# with. Local git describes the machine running the test, not the system
# under test, and the two silently disagree whenever a checkout is stale.
DEPLOYED_COMMIT = {"sha": None}


# --------------------------------------------------------------------------
# version stamping
# --------------------------------------------------------------------------

def resolve_commit_sha() -> str:
    """The commit this run is testing against.

    Prefers an explicit env var (set by CI, where the checkout may not be a
    full git repo), falls back to local git, then to 'unknown' rather than
    guessing - a wrong SHA is worse than an absent one, because it makes the
    history actively misleading.
    """
    for var in ("EVAL_COMMIT_SHA", "VERCEL_GIT_COMMIT_SHA", "GITHUB_SHA"):
        val = os.environ.get(var)
        if val:
            return val
    try:
        out = subprocess.run(
            ["git", "rev-parse", "HEAD"],
            capture_output=True, text=True, timeout=10,
        )
        if out.returncode == 0 and out.stdout.strip():
            return out.stdout.strip()
    except Exception:
        pass
    return "unknown"


# --------------------------------------------------------------------------
# talking to the deployed system
# --------------------------------------------------------------------------

def send_turn(target, messages, session_id, message_index, audience_context=None,
              url=None, redirect_count=0):
    """POST one turn to the real /api/chat.

    Handles 307/308 explicitly: urllib does not reliably re-POST the body on
    those, and a bare www/non-www redirect will otherwise silently fail every
    single request in a run.
    """
    if redirect_count > 3:
        return 508, {"raw_error": "too many redirects"}

    endpoint = url or f"{target.rstrip('/')}/api/chat"
    body = {
        "messages": messages,
        "sessionId": session_id,
        "messageIndex": message_index,
    }
    if audience_context is not None:
        body["audienceContext"] = audience_context

    headers = {"Content-Type": "application/json", "Origin": target.rstrip("/")}
    secret = os.environ.get("PORTFOLIO_TESTING_SECRET")
    if secret:
        headers["X-Testing-Bypass"] = secret

    req = urllib.request.Request(
        endpoint, data=json.dumps(body).encode("utf-8"),
        headers=headers, method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
            # The deployment reports the commit it is actually running.
            deployed = resp.headers.get("X-Deployed-Commit")
            if deployed:
                payload["_deployed_commit"] = deployed
            return resp.status, payload
    except urllib.error.HTTPError as e:
        if e.code in (307, 308):
            loc = e.headers.get("Location")
            if loc:
                return send_turn(target, messages, session_id, message_index,
                                 audience_context, url=loc,
                                 redirect_count=redirect_count + 1)
        try:
            return e.code, json.loads(e.read().decode("utf-8"))
        except Exception:
            return e.code, {"raw_error": str(e)}
    except Exception as e:
        return 0, {"raw_error": str(e)}


# --------------------------------------------------------------------------
# assertions - free, deterministic
# --------------------------------------------------------------------------

def check_assertion(assertion, response_text, payload):
    """Returns (passed: bool, detail: str)."""
    kind = assertion.get("type")
    target_field = assertion.get("field", "message")

    if target_field == "message":
        haystack = response_text or ""
    else:
        # allow asserting on structured fields, e.g. audience.fit_verdict
        cursor = payload
        for part in target_field.split("."):
            if isinstance(cursor, dict):
                cursor = cursor.get(part)
            else:
                cursor = None
                break
        haystack = "" if cursor is None else str(cursor)

    if kind == "equals":
        expected = assertion["value"]
        ok = haystack.strip() == expected.strip()
        return ok, f"expected exactly {expected!r}, got {haystack[:120]!r}"

    if kind == "contains":
        expected = assertion["value"]
        ok = expected.lower() in haystack.lower()
        return ok, f"expected to contain {expected!r}"

    if kind == "not_contains":
        forbidden = assertion["value"]
        ok = forbidden.lower() not in haystack.lower()
        return ok, f"must not contain {forbidden!r} - LEAKED" if not ok else ""

    if kind == "regex":
        ok = re.search(assertion["value"], haystack, re.IGNORECASE) is not None
        return ok, f"expected to match /{assertion['value']}/"

    if kind == "non_empty":
        ok = bool(haystack.strip())
        return ok, "expected a non-empty response"

    return False, f"unknown assertion type {kind!r}"


# --------------------------------------------------------------------------
# judge - costs an API call, only for genuinely subjective standards
# --------------------------------------------------------------------------

def judge_response(rubric, prompt, response_text):
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return None, "ANTHROPIC_API_KEY not set - judged check skipped"

    system = (
        "You grade a single response from a portfolio assistant against one "
        "specific standard. Judge ONLY that standard, not general quality. "
        "Reply with strict JSON and nothing else: "
        '{"pass": true|false, "reason": "<one sentence>"}'
    )
    user = (
        f"STANDARD:\n{rubric}\n\n"
        f"VISITOR ASKED:\n{prompt}\n\n"
        f"ASSISTANT REPLIED:\n{response_text}"
    )

    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=json.dumps({
            "model": JUDGE_MODEL,
            "max_tokens": 300,
            "system": system,
            "messages": [{"role": "user", "content": user}],
        }).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        text = "".join(b.get("text", "") for b in data.get("content", [])
                       if b.get("type") == "text").strip()
        text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()
        verdict = json.loads(text)
        return bool(verdict.get("pass")), verdict.get("reason", "")
    except Exception as e:
        # A judge failure is not a scenario failure - report it as unknown
        # rather than silently counting it either way.
        return None, f"judge error: {e}"


# --------------------------------------------------------------------------
# running a suite
# --------------------------------------------------------------------------

def run_scenario(scenario, target, use_judge):
    """Runs one scenario, possibly several times. Returns a result dict."""
    runs = scenario.get("runs", 1)
    turns = scenario["turns"]
    attempts = []

    for run_index in range(runs):
        session_id = f"eval-{uuid.uuid4().hex[:12]}"
        conversation = []
        audience = None
        final_text = ""
        final_payload = {}
        transport_ok = True

        for turn_index, prompt in enumerate(turns):
            conversation.append({"role": "user", "content": prompt})
            status, payload = send_turn(target, conversation, session_id,
                                        turn_index, audience)
            if status != 200 or not payload.get("message"):
                attempts.append({
                    "run": run_index + 1, "passed": False,
                    "failures": [f"transport failure: HTTP {status} - {payload}"],
                    "response": None,
                })
                transport_ok = False
                break
            final_text = payload["message"]
            final_payload = payload
            if payload.get("_deployed_commit"):
                DEPLOYED_COMMIT["sha"] = payload["_deployed_commit"]
            conversation.append({"role": "assistant", "content": final_text})
            audience = payload.get("audience")
            time.sleep(DELAY_SECONDS)

        if not transport_ok:
            continue

        failures = []
        for assertion in scenario.get("assertions", []):
            ok, detail = check_assertion(assertion, final_text, final_payload)
            if not ok:
                failures.append(detail)

        judged = None
        if use_judge and scenario.get("rubric"):
            judged, reason = judge_response(scenario["rubric"], turns[-1], final_text)
            if judged is False:
                failures.append(f"judge: {reason}")
            elif judged is None:
                failures.append(f"judge inconclusive: {reason}")

        attempts.append({
            "run": run_index + 1,
            "passed": len(failures) == 0,
            "failures": failures,
            "response": final_text,
            "audience": final_payload.get("audience"),
        })

    passed_count = sum(1 for a in attempts if a["passed"])
    return {
        "id": scenario["id"],
        "category": scenario.get("category", ""),
        "runs": len(attempts),
        "passed": passed_count,
        "pass_rate": round(passed_count / len(attempts), 3) if attempts else 0.0,
        "fully_consistent": passed_count == len(attempts) and len(attempts) > 0,
        "attempts": attempts,
    }


def append_history_row(report, history_path="HISTORY.md"):
    """Insert a row into HISTORY.md's table, newest first.

    Automated deliberately. A history that depends on remembering to update it
    by hand is a history with gaps exactly where the interesting runs are -
    the rushed ones, which are also the ones most likely to be regressions.

    Newest-first rather than appended at the bottom: the question this table
    answers is usually "what happened most recently", and scrolling past a
    long history to find it defeats the purpose.
    """
    if not os.path.exists(history_path):
        print(f"  (no {history_path} found - skipping history row)")
        return False

    s = report["summary"]
    failing = [r["id"] for r in report["results"] if not r["fully_consistent"]]

    if failing:
        notes = "FAIL: " + ", ".join(failing)
        for r in report["results"]:
            if r["id"] in failing:
                notes += f" ({r['id']} {r['passed']}/{r['runs']})"
    else:
        notes = "all consistent"
    if not report["judge_enabled"]:
        notes += " · assertions only"
    # Pipes would break the table; strip rather than escape.
    notes = notes.replace("|", "/")

    target_label = "production" if report["target"].rstrip("/") == DEFAULT_TARGET else "preview"
    row = (
        f"| {report['timestamp'][:10]} "
        f"| `{report['commit_sha'][:10]}` "
        f"| {report['suite']} {report.get('suite_version','')} "
        f"| {target_label} "
        f"| {s['fully_consistent']}/{s['scenarios']} "
        f"| {s['total_passed']}/{s['total_runs']} "
        f"| {notes} |"
    )

    with open(history_path) as f:
        lines = f.read().split("\n")

    # Find the table's separator line, insert directly beneath it.
    sep_index = None
    for i, line in enumerate(lines):
        if re.match(r"^\|\s*-+\s*\|", line):
            sep_index = i
            break
    if sep_index is None:
        print(f"  (could not find table in {history_path} - skipping history row)")
        return False

    # Drop the empty placeholder row if it is still there.
    if sep_index + 1 < len(lines) and re.match(r"^\|(\s*\|)+\s*$", lines[sep_index + 1]):
        del lines[sep_index + 1]

    lines.insert(sep_index + 1, row)
    with open(history_path, "w") as f:
        f.write("\n".join(lines))
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("suite")
    ap.add_argument("--target", default=DEFAULT_TARGET,
                    help="base URL - use a Vercel preview URL to test a branch")
    ap.add_argument("--no-judge", action="store_true",
                    help="assertions only, no API cost")
    ap.add_argument("--out-dir", default="results")
    ap.add_argument("--history", default="HISTORY.md",
                    help="path to the history log")
    ap.add_argument("--no-history", action="store_true",
                    help="skip writing a history row")
    args = ap.parse_args()

    with open(args.suite) as f:
        suite = json.load(f)

    sha = resolve_commit_sha()
    use_judge = not args.no_judge

    print(f"Suite:   {suite['name']} {suite.get('version', '')}")
    print(f"Target:  {args.target}")
    print(f"Commit:  {sha}")
    print(f"Judge:   {'on' if use_judge else 'off (assertions only)'}")
    if not os.environ.get("PORTFOLIO_TESTING_SECRET"):
        print("WARNING: PORTFOLIO_TESTING_SECRET not set - subject to rate "
              "limiting, and this run WILL be logged as real visitor traffic")
    print()

    results = []
    for scenario in suite["scenarios"]:
        label = f"{scenario['id']} ({scenario.get('category','')})"
        print(f"  {label} ...", flush=True)
        res = run_scenario(scenario, args.target, use_judge)
        results.append(res)
        mark = "OK  " if res["fully_consistent"] else "FAIL"
        print(f"    {mark} {res['passed']}/{res['runs']}")
        for a in res["attempts"]:
            for fail in a["failures"]:
                print(f"      run {a['run']}: {fail}")

    deployed_sha = DEPLOYED_COMMIT["sha"]
    if deployed_sha:
        if deployed_sha != sha:
            print()
            print(f"NOTE: local git is at {sha[:10]}, but the target is running "
                  f"{deployed_sha[:10]}.")
            print("      Stamping this result with the DEPLOYED commit - that is "
                  "the system that was actually tested.")
        sha = deployed_sha
    else:
        print()
        print("WARNING: the target did not report a deployed commit "
              "(no X-Deployed-Commit header).")
        print("         Falling back to local git, which may not match what was "
              "actually tested.")
        sha = f"{sha}-UNVERIFIED"

    total_runs = sum(r["runs"] for r in results)
    total_passed = sum(r["passed"] for r in results)
    fully = sum(1 for r in results if r["fully_consistent"])

    report = {
        "suite": suite["name"],
        "suite_version": suite.get("version"),
        "commit_sha": sha,
        "target": args.target,
        "judge_enabled": use_judge,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "summary": {
            "scenarios": len(results),
            "fully_consistent": fully,
            "total_runs": total_runs,
            "total_passed": total_passed,
            "run_pass_rate": round(total_passed / total_runs, 3) if total_runs else 0.0,
        },
        "results": results,
    }

    os.makedirs(args.out_dir, exist_ok=True)
    out_path = os.path.join(args.out_dir, f"{sha[:10]}.json")
    with open(out_path, "w") as f:
        json.dump(report, f, indent=2)

    print()
    print(f"Scenarios fully consistent: {fully}/{len(results)}")
    print(f"Individual runs passed:     {total_passed}/{total_runs}")
    print(f"Saved: {out_path}")

    if not args.no_history:
        if append_history_row(report, args.history):
            print(f"Logged: {args.history}")

    # Non-zero exit on any inconsistency, so CI can gate on it.
    sys.exit(0 if fully == len(results) else 1)


if __name__ == "__main__":
    main()
