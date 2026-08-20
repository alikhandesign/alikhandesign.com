# Automated Regression Eval Runner

Runs the Regression Checklist from `portfolio-assistant-evals.md` against the
real Anthropic API, using the exact model production runs (`claude-haiku-4-5`)
and the current live system prompt, fetched fresh from GitHub every run - so
this never tests a stale local copy.

Each test case is graded automatically by a second, independent model
(`claude-sonnet-4-6`) acting as a judge, given the case's expected behavior
and the actual transcript. This is a real LLM-as-judge pattern, the same
technique used in production AI evaluation pipelines - not a toy script.

## Setup

```bash
pip install --break-system-packages  # no third-party deps beyond stdlib
export ANTHROPIC_API_KEY=sk-ant-...
export GITHUB_TOKEN=ghp_...   # optional - only needed if the repo is private
```

Never commit a `.env` file or any file containing a real API key to this
repo. Set these as actual shell/environment variables, or use your local
machine's secret manager.

## Running it

```bash
cd evals
python3 run_eval.py
```

This will:
1. Fetch the current live system prompt from GitHub (`lib/systemPrompt.ts` + `lib/sources.ts`)
2. Run all cases in `regression_cases.py` against the real API, turn by turn
3. Grade each transcript automatically against its expected behavior
4. Print a live summary as it runs
5. Write a full report to `reports/eval-run-<timestamp>.json` and `.md`

## What this does and doesn't replace

This automates the *mechanical* part of what's been manual all session -
running a prompt, capturing a response, checking it against an expectation.
It does not replace human judgment entirely: the judge model can be wrong,
especially on genuinely subtle cases (tone, whether something reads as
"warm" vs "cold"), and its verdicts are worth spot-checking, especially
early on. Treat a `Fail` as a strong signal to look closely, and treat a
`Pass` on something high-stakes (guardrail leaks especially) as worth an
occasional manual read-through rather than blind trust.

## Extending this

`regression_cases.py` currently holds the curated Regression Checklist
subset (15 cases), not the full 28+ scenarios across all five batches. To
add a case, add a dict to `REGRESSION_CASES` with `id`, `category`, `turns`
(a list - multiple entries run as one growing conversation), and
`expected_behavior` (a clear, specific description the judge model can
grade against - vague expectations produce vague grading).

## Where this fits in the deployment workflow

Run this against a working branch's changes *before* opening a pull request
to merge into `main` - this is the "merge gate" referenced in the
deployment safety phase of this project. It isn't currently wired into CI
(e.g. a GitHub Actions workflow that runs this automatically on every PR) -
that's a natural next step once this has been run manually a few times and
trusted.
