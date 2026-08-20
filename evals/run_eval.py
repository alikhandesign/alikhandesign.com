"""
Automated regression eval runner for the Portfolio Assistant.

For each case in regression_cases.py:
  1. Runs the full conversation against the real Anthropic API using the
     exact model production uses (claude-haiku-4-5) and the current live
     system prompt (fetched fresh from GitHub - see build_system_prompt.py).
  2. Sends the resulting transcript to a second model (claude-sonnet-4-6,
     used specifically as an independent grader - a different, stronger
     model than the one being tested, to reduce self-grading bias) with the
     case's expected_behavior, asking for a structured Pass/Partial/Fail
     verdict and one-line reasoning.
  3. Prints a live-updating report and writes a full JSON + Markdown report
     to evals/reports/.

Usage:
    export ANTHROPIC_API_KEY=sk-ant-...
    export GITHUB_TOKEN=ghp_...        # optional, only needed for private repos
    python3 run_eval.py

This never asks for or stores an API key anywhere in code - it's read from
the environment only. Do not commit a .env file containing real keys to
this repo.
"""

import json
import os
import sys
import urllib.request
import urllib.error
from datetime import datetime, timezone

from build_system_prompt import build_system_prompt
from regression_cases import REGRESSION_CASES

ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"
SUBJECT_MODEL = "claude-haiku-4-5"   # must match app/api/chat/route.ts exactly
JUDGE_MODEL = "claude-sonnet-4-6"    # independent, stronger model as grader


def call_claude(api_key: str, model: str, system: str, messages: list, max_tokens: int = 1024) -> str:
    body = json.dumps({
        "model": model,
        "max_tokens": max_tokens,
        "system": system,
        "messages": messages,
    }).encode("utf-8")

    req = urllib.request.Request(
        ANTHROPIC_API_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"API error {e.code}: {e.read().decode('utf-8')}")

    text_blocks = [b["text"] for b in data.get("content", []) if b.get("type") == "text"]
    return "\n".join(text_blocks)


def run_case(api_key: str, system_prompt: str, case: dict) -> dict:
    """Runs a case's full conversation, turn by turn, against the subject model."""
    history = []
    transcript = []
    for turn in case["turns"]:
        history.append({"role": "user", "content": turn})
        response = call_claude(api_key, SUBJECT_MODEL, system_prompt, history)
        history.append({"role": "assistant", "content": response})
        transcript.append({"prompt": turn, "response": response})
    return {"id": case["id"], "category": case["category"], "transcript": transcript}


def grade_case(api_key: str, case: dict, run_result: dict) -> dict:
    """Sends the transcript to the judge model for a structured verdict."""
    transcript_text = "\n\n".join(
        f"USER: {t['prompt']}\nASSISTANT: {t['response']}"
        for t in run_result["transcript"]
    )
    judge_prompt = f"""You are grading a test case for an AI assistant's behavior.

EXPECTED BEHAVIOR:
{case['expected_behavior']}

ACTUAL TRANSCRIPT:
{transcript_text}

Grade this transcript against the expected behavior. Respond with ONLY a JSON
object, no other text, no markdown code fences:
{{"verdict": "Pass" | "Partial" | "Fail", "reasoning": "one or two sentences explaining the verdict, citing specific text from the transcript"}}
"""
    raw = call_claude(
        api_key, JUDGE_MODEL,
        system="You are a precise, skeptical QA grader. Be specific and cite exact text.",
        messages=[{"role": "user", "content": judge_prompt}],
        max_tokens=300,
    )
    cleaned = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        return {"verdict": "Fail", "reasoning": f"Judge output was not valid JSON: {raw[:200]}"}


def main():
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: Set ANTHROPIC_API_KEY in your environment before running this.")
        sys.exit(1)

    github_token = os.environ.get("GITHUB_TOKEN")

    print("Fetching live system prompt from GitHub...")
    system_prompt = build_system_prompt(token=github_token)
    print(f"  Loaded {len(system_prompt)} characters.\n")

    results = []
    for i, case in enumerate(REGRESSION_CASES, 1):
        print(f"[{i}/{len(REGRESSION_CASES)}] Running: {case['id']}...")
        try:
            run_result = run_case(api_key, system_prompt, case)
            grade = grade_case(api_key, case, run_result)
        except Exception as e:
            grade = {"verdict": "Fail", "reasoning": f"Runner error: {e}"}
            run_result = {"id": case["id"], "category": case["category"], "transcript": []}

        results.append({**run_result, "expected_behavior": case["expected_behavior"], **grade})
        print(f"    -> {grade['verdict']}: {grade['reasoning']}\n")

    # Summary
    total = len(results)
    passed = sum(1 for r in results if r["verdict"] == "Pass")
    partial = sum(1 for r in results if r["verdict"] == "Partial")
    failed = sum(1 for r in results if r["verdict"] == "Fail")
    print("=" * 60)
    print(f"RESULTS: {passed}/{total} Pass, {partial}/{total} Partial, {failed}/{total} Fail")
    print("=" * 60)

    # Write reports
    os.makedirs("reports", exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H-%M-%SZ")
    json_path = f"reports/eval-run-{timestamp}.json"
    md_path = f"reports/eval-run-{timestamp}.md"

    with open(json_path, "w") as f:
        json.dump({
            "timestamp": timestamp,
            "subject_model": SUBJECT_MODEL,
            "judge_model": JUDGE_MODEL,
            "summary": {"total": total, "pass": passed, "partial": partial, "fail": failed},
            "results": results,
        }, f, indent=2)

    with open(md_path, "w") as f:
        f.write(f"# Automated Eval Run — {timestamp}\n\n")
        f.write(f"Subject model: `{SUBJECT_MODEL}` | Judge model: `{JUDGE_MODEL}`\n\n")
        f.write(f"**Result: {passed}/{total} Pass, {partial}/{total} Partial, {failed}/{total} Fail**\n\n")
        f.write("---\n\n")
        for r in results:
            f.write(f"## {r['id']} — {r['verdict']}\n\n")
            f.write(f"*{r['category']}*\n\n")
            f.write(f"**Expected:** {r['expected_behavior']}\n\n")
            for t in r["transcript"]:
                f.write(f"**Prompt:** {t['prompt']}\n\n")
                f.write(f"**Response:** {t['response']}\n\n")
            f.write(f"**Judge reasoning:** {r['reasoning']}\n\n---\n\n")

    print(f"Full reports written to:\n  {json_path}\n  {md_path}")


if __name__ == "__main__":
    main()
