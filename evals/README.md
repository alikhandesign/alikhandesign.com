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
not returned." Types: `equals`, `contains`, `not_contains`, `regex`,
`non_empty`. An assertion can target a structured field instead of the reply
text via `"field": "audience.fit_verdict"`.

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

## After every run, add a row to HISTORY.md

This is the step that makes the whole thing worth having. `HISTORY.md` is the
artifact you actually read to answer "when did this start failing" — the raw
result files are for digging in once you know where to look.

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
