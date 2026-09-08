# Evals

Automated behavior tests for the Portfolio Assistant.

## What makes this different from the earlier eval framework

The earlier framework called the Anthropic API directly with a reconstructed
system prompt. That tests prompt wording, but it cannot see tool-calling, the
multi-step loop, prompt caching, access control, or anything else that lives in
the API route — which is now most of the system.

This runner posts to a real `/api/chat` endpoint. It tests the deployed
artifact.

## Running

```bash
export PORTFOLIO_TESTING_SECRET=<the value set as TESTING_BYPASS_SECRET in Vercel>

# against production
python3 run.py suites/guardrails.v1.json

# against a branch's Vercel preview deployment
python3 run.py suites/guardrails.v1.json --target https://<preview-url>.vercel.app

# assertions only — no judge calls, no API cost
python3 run.py suites/guardrails.v1.json --no-judge
```

Setting `PORTFOLIO_TESTING_SECRET` does two things: skips rate limiting, and
tags every request `is_test_request` so eval traffic never mixes into the
metrics meant to reflect real visitors. Without it, runs are rate-limited and
**will** be logged as genuine traffic.

Exit code is non-zero if any scenario is not fully consistent across its runs,
so CI can gate on it.

## The two kinds of check

A scenario can carry either or both.

**`assertions`** — programmatic string checks. Free, deterministic, no API
call. Most guardrail failures are catchable this way, because the failure mode
is usually "this specific thing leaked" or "this exact mandated response was
not returned." Types: `equals`, `not_equals`, `contains`, `not_contains`, `one_of`, `regex`,
`non_empty`, and the numeric comparators `lt`, `gt`, `lte`, `gte`. An assertion
can target a structured field instead of the reply text via
`"field": "audience.fit_verdict"` — the model's own reported signal is far more
deterministic than its prose, so field assertions make good, cheap tests.

**`rubric`** — a natural-language standard handed to a judge model, for cases
where correctness is genuinely subjective: is this trade-off real and specific,
does this honesty tier hold under pressure. Costs an API call.

Reach for an assertion first. Only attach a rubric where a string check
genuinely cannot do the job. Roughly half the current suite needs no judge at
all.

## Suites are immutable

Once a suite file exists, it does not get edited. Changing a test means
creating `guardrails.v2.json`, not modifying v1.

The reason: a pass rate is only comparable across runs if the questions stayed
the same. Editing a suite in place silently invalidates every historical score
that referenced it, and you lose the ability to say when a behavior started
failing — which is the entire point of keeping the history.

## Version stamping

Every result file is keyed by the commit SHA it ran against, resolved in this
order: `EVAL_COMMIT_SHA`, `VERCEL_GIT_COMMIT_SHA`, `GITHUB_SHA`, then local
`git rev-parse HEAD`, then `unknown`. It falls back to `unknown` rather than
guessing, because a wrong SHA makes the history actively misleading.

Results land in `results/<sha>.json` with full per-run detail.

## Running in CI

`.github/workflows/evals.yml` runs `guardrails.v1` and `behavior.v2` against
the Vercel preview deployment whenever a branch deploys, and posts the results
as a PR comment.

It only runs when the PR actually touched something that changes behavior —
`lib/systemPrompt.ts`, `lib/skillsMatrix.ts`, `lib/reflections.ts`,
`lib/sources.ts`, `lib/knowledge/`, or `app/api/chat/`. A UI-only or docs-only
PR does not spend API calls.

Two constraints of the `deployment_status` trigger shape how this works:

- It does not support a `paths:` filter, so the changed-file check happens
  inside the job rather than in the trigger.
- Workflows on this trigger do not report as PR checks, so results are posted
  as a comment via the API. The job still exits non-zero on failure, which
  shows in the Actions tab.

CI runs with `--no-judge` and `--no-history`. No judge because most guardrail
failures are catchable by assertion, and free. No history because CI cannot
commit back to the branch, and a row that only exists in an ephemeral runner
is worse than no row — `HISTORY.md` stays a record of deliberate local runs.

Repeatability suites are deliberately not run in CI. They are 20–24 messages
each and exist to investigate a specific finding, not to gate every merge.

### Server-side diagnostics

The API returns four diagnostic headers, folded into `_diag` for assertions:
`_diag.loop_iterations`, `_diag.tool_calls`, `_diag.cache_read_tokens`, and
`_diag.cache_write_tokens`. `suites/internals.v1.json` asserts on them.

This exists because prompt caching can regress completely silently — responses
stay identical and only cost changes — so no behavioral suite would ever catch
it. Note that `internals.v1` depends on scenario order: INT-3 checks a cache
read, which requires an earlier scenario to have warmed the cache. Run against
a cold cache in isolation, it fails for a benign reason.

**Setup:** two Actions secrets are required.

`PORTFOLIO_TESTING_SECRET`, matching `TESTING_BYPASS_SECRET` in Vercel.
Without it, runs are rate limited and get logged as real visitor traffic.

`VERCEL_AUTOMATION_BYPASS_SECRET`. Vercel Deployment Protection blocks
automated requests to preview deployments with a 401 SSO redirect — a browser
can complete that challenge, a script cannot. Generate the secret under
**Settings → Deployment Protection → Protection Bypass for Automation**, then
add it both as an Actions secret and locally when testing a preview:

```bash
export VERCEL_AUTOMATION_BYPASS_SECRET=<the secret>
```

Production is not protected, so this is only needed for preview targets. The
runner warns before starting if the target looks like a preview and the secret
is missing, rather than letting a whole suite fail on 401s.

Regenerating the secret invalidates existing deployments — they need a redeploy
to pick up the new value.

## HISTORY.md is written automatically

`run.py` appends a row to `HISTORY.md` after every run, newest first. This is
automated deliberately: a history that depends on remembering to update it by
hand develops gaps exactly where the interesting runs are — the rushed ones,
which are also the ones most likely to be regressions.

`HISTORY.md` is the artifact you actually read to answer "when did this start
failing"; the raw result files are for digging in once you know where to look.
Anything that needs more than a table cell goes in a prose section below the
table.

Pass `--no-history` to skip, or `--history <path>` to point elsewhere.

## Why runs are repeated

Some scenarios set `"runs": 8`. This is not caution for its own sake.

A guardrail was previously tested once, passed, marked closed, and counted
toward a 28-scenario suite that reached 100%. Retested later against a
substantially changed system, it fully complied only 5 times out of 8. A single
passing run could not distinguish "reliably correct" from "correct most of the
time," and the difference mattered — it was a safety-relevant behavior.

Whether that variance was always present or arrived with the architecture
changes is not something the original single-run testing can now answer. That
unanswerable question is the argument for this discipline.

## Known limitation

Access-control scenarios (B5, B6) assume the run is **not** unlocked. If the
machine running them holds a valid case-study cookie, those scenarios will
report false failures. The runner does not currently assert its own lock state.
