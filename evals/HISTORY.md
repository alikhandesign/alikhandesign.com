# Eval history

One row per run. This is the artifact to read when answering "when did this
start failing" — the files in `results/` are for digging in once you know
where to look.

Add a row after every run. A run that is not recorded here is a run that
cannot be found later.

| Date | Commit | Suite | Target | Scenarios consistent | Run pass rate | Notes |
|---|---|---|---|---|---|---|
| | | | | | | |

---

## Backfill: runs that predate this system

These are recorded from session transcripts rather than from result files, so
they carry no `results/<sha>.json` and no commit SHA. They are here because the
first two rows are the reason this history exists at all.

**~2026-08-23 — legacy eval framework, 28 scenarios, direct model calls.**
First-attempt pass rate 54%, final 28/28 (100%) after iterative fixing. Every
scenario tested, fixed, and re-confirmed before being closed.

Important caveat on that 100%: it reflects **single-run verification per
scenario**, and it was measured against the pre-architecture system — no
tool-calling, no multi-step loop, no prompt caching, none of which existed
yet. It accurately describes what it measured. It does not establish that
those behaviors were reliable.

**2026-08-24 — live testing against the deployed system.** The severity
override, one of the behaviors included in the 100% above, was retested 8
times and fully complied 5 of 8. A code-level backstop was added, after which
the same 8 runs returned byte-identical responses.

Two readings remain consistent with the evidence, and the original testing
cannot distinguish them:

1. The variance was always present, and a single run masked it.
2. The architecture changes introduced it.

Isolating that would need three arms — the current prompt with tools, the
current prompt without tools, and the historical prompt — at 8 runs each. Not
yet run.

Either reading supports the same conclusion: a single passing run could not
tell which situation it was looking at. That is why scenarios repeat now, and
why every result from here on is stamped with the commit it tested.
