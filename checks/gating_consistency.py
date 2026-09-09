#!/usr/bin/env python3
"""
Gating consistency check.

Enforces the one convention where a violation is a real content leak rather
than an inconvenience: a project that is password-gated on the site must also
be gated in the chatbot, and must have a public summary to serve locked
visitors instead.

This is checkable mechanically because every part of it is a fact about the
code rather than a judgment call:

  - a /work/<slug>/page.tsx wrapped in PasswordGate IS gated on the site
  - GATED_CASE_STUDY_SLUGS in the chat route IS what the chatbot gates
  - a publicSummary field either exists on the case study or it does not

Three failure modes, all of which have actually happened or nearly happened:

  UNDECLARED  A /work page is wrapped in PasswordGate but the manifest does
            not say what that gate protects. Fails until declared, which is
            the point: the decision gets made deliberately rather than
            defaulting to whatever the omission happens to produce.

  LEAK      Declared as gating narrative content, but absent from
            GATED_CASE_STUDY_SLUGS. A locked visitor gets full four-lens
            detail through the chatbot, bypassing the gate the real page
            enforces. This is the bug that prompted the check - seven
            projects were affected and it was found by accident, not by
            testing.

  NO SUMMARY  In GATED_CASE_STUDY_SLUGS but no publicSummary. Not a leak, but
            the locked visitor gets a flat refusal where the site itself
            would have shown them a hook and public metrics. Over-restriction
            rather than under-restriction.

  OVER-GATED  In GATED_CASE_STUDY_SLUGS but NOT gated on the site. The
            chatbot withholds content anyone can read by visiting the page.
            This also actually happened: a keyword search flagged a case
            study that merely mentions PasswordGate narratively, because that
            project is about building the design system the component belongs
            to.

The naive rule - page has a gate, therefore gate the chatbot - is wrong, and
this check originally used it. Some pages gate only an image gallery while all
their narrative sits above the gate, public. A script cannot tell those apart
by reading JSX, so checks/gating-manifest.json records the judgment once and
this verifies the code against it.

Deliberately parses source text rather than importing the modules. The check
has to run in CI without a build step, and the shapes it looks for are stable
and simple. If those shapes change, this fails loudly rather than silently
passing - which is the correct behavior for a check whose whole job is
catching a mismatch.

Usage:
    python3 checks/gating_consistency.py          # from the repo root
Exit code 0 if consistent, 1 if not.
"""

import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

ROUTE = "app/api/chat/route.ts"
CASE_STUDY_DIR = "lib/knowledge/caseStudies"
REGISTRY = "lib/knowledge/registry.ts"
WORK_DIR = "app/work"


def read(rel):
    path = os.path.join(REPO_ROOT, rel)
    if not os.path.exists(path):
        sys.exit(f"FATAL: expected file not found: {rel}")
    with open(path) as f:
        return f.read()


def gated_in_chatbot():
    """Slugs the chat route refuses to serve in full to a locked visitor."""
    src = read(ROUTE)
    m = re.search(r"GATED_CASE_STUDY_SLUGS\s*=\s*new Set\(\[(.*?)\]\)", src, re.S)
    if not m:
        sys.exit(
            "FATAL: could not find GATED_CASE_STUDY_SLUGS in " + ROUTE + ".\n"
            "If it was renamed or restructured, update this check rather than\n"
            "deleting it - the convention it enforces is still load-bearing."
        )
    return set(re.findall(r"'([a-z0-9-]+)'", m.group(1)))


def gated_on_site():
    """Slugs whose /work page is actually wrapped in PasswordGate.

    Checks for the JSX element, not a bare mention of the word. A case study
    that discusses PasswordGate in its prose is not gated by doing so - that
    exact false positive caused a real over-gating bug.
    """
    out = set()
    work = os.path.join(REPO_ROOT, WORK_DIR)
    if not os.path.isdir(work):
        sys.exit(f"FATAL: {WORK_DIR} not found")
    for slug in sorted(os.listdir(work)):
        page = os.path.join(work, slug, "page.tsx")
        if not os.path.isfile(page):
            continue
        with open(page) as f:
            src = f.read()
        if re.search(r"<PasswordGate[\s>]", src):
            out.add(slug)
    return out


def slugs_with_public_summary():
    """Case study modules that define a non-empty publicSummary."""
    out = set()
    d = os.path.join(REPO_ROOT, CASE_STUDY_DIR)
    if not os.path.isdir(d):
        sys.exit(f"FATAL: {CASE_STUDY_DIR} not found")
    for fn in sorted(os.listdir(d)):
        if not fn.endswith(".ts"):
            continue
        with open(os.path.join(d, fn)) as f:
            src = f.read()
        slug_m = re.search(r"slug:\s*'([a-z0-9-]+)'", src)
        if not slug_m:
            continue
        if re.search(r"publicSummary:\s*\n?\s*['\"`]\s*\S", src):
            out.add(slug_m.group(1))
    return out


def load_manifest():
    """Declared intent for every site-gated project."""
    import json
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        "gating-manifest.json")
    if not os.path.exists(path):
        sys.exit("FATAL: checks/gating-manifest.json not found")
    with open(path) as f:
        return json.load(f).get("projects", {})


def registered_slugs():
    src = read(REGISTRY)
    return set(re.findall(r"'([a-z0-9-]+)':\s*[A-Z_]+_DETAIL", src))


def main():
    site = gated_on_site()
    chatbot = gated_in_chatbot()
    summaries = slugs_with_public_summary()
    registered = registered_slugs()
    manifest = load_manifest()

    must_gate = {k for k, v in manifest.items() if v.get("chatbot_must_gate")}

    print(f"PasswordGate on the page ({len(site)}): {', '.join(sorted(site)) or 'none'}")
    print(f"Declared must-gate       ({len(must_gate)}): {', '.join(sorted(must_gate)) or 'none'}")
    print(f"Gated in the chatbot     ({len(chatbot)}): {', '.join(sorted(chatbot)) or 'none'}")
    print(f"Have a public summary    ({len(summaries)}): {', '.join(sorted(summaries)) or 'none'}")
    print()

    problems = []

    for slug in sorted(site - set(manifest)):
        problems.append(
            f"UNDECLARED: '{slug}' has PasswordGate on its page but is not in\n"
            f"      checks/gating-manifest.json. The check cannot tell whether the gate\n"
            f"      protects narrative content or only an image gallery, and guessing is\n"
            f"      how a leak or an over-restriction gets shipped.\n"
            f"      Fix: add an entry declaring what the gate protects and whether the\n"
            f"      chatbot must gate it."
        )

    for slug in sorted(set(manifest) - site):
        problems.append(
            f"STALE MANIFEST: '{slug}' is declared in the manifest but its /work page is\n"
            f"      no longer wrapped in PasswordGate. Fix: remove the entry, or restore\n"
            f"      the gate if it was dropped by mistake."
        )

    # Only registered projects can leak - if there is no case study, the
    # lookup tool has nothing to return.
    for slug in sorted(must_gate - chatbot):
        if slug in registered:
            problems.append(
                f"LEAK: '{slug}' is declared as gating narrative content but is missing\n"
                f"      from GATED_CASE_STUDY_SLUGS. A locked visitor can get its full\n"
                f"      detail through the chatbot.\n"
                f"      Fix: add '{slug}' to GATED_CASE_STUDY_SLUGS in {ROUTE}, and give its\n"
                f"      case study a publicSummary matching what the page shows before\n"
                f"      the gate."
            )

    for slug in sorted(chatbot - summaries):
        problems.append(
            f"NO SUMMARY: '{slug}' is gated in the chatbot but has no publicSummary.\n"
            f"      A locked visitor gets a flat refusal where the real page would have\n"
            f"      shown them a hook and public metrics - over-restriction.\n"
            f"      Fix: add a publicSummary to {CASE_STUDY_DIR}, matching fact for fact\n"
            f"      what is genuinely visible before the gate."
        )

    for slug in sorted(chatbot - must_gate):
        declared = manifest.get(slug)
        detail = (f"the manifest declares it gates {declared['gates']!r} and does not "
                  f"require chatbot gating") if declared else "it is not declared at all"
        problems.append(
            f"OVER-GATED: '{slug}' is in GATED_CASE_STUDY_SLUGS but {detail}.\n"
            f"      The chatbot may be withholding content anyone can read on the page.\n"
            f"      Fix: remove it from GATED_CASE_STUDY_SLUGS, or correct the manifest\n"
            f"      if the gate's scope actually changed."
        )

    if not problems:
        print("Consistent. Site gating, chatbot gating, and public summaries agree.")
        return 0

    print(f"{len(problems)} problem(s):\n")
    for p in problems:
        print("  " + p.replace("\n", "\n  "))
        print()
    return 1


if __name__ == "__main__":
    sys.exit(main())
