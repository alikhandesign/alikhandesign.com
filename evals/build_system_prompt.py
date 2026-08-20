"""
Fetches the live lib/systemPrompt.ts and lib/sources.ts directly from GitHub
and assembles the exact system prompt the production API route sends -
public + protected sections, with {{SOURCES}} substituted for the real,
current source list. This mirrors the substitution logic in
app/api/chat/route.ts exactly, so what gets tested here is never stale
relative to what's actually deployed.

No local checkout required - this always reads the current state of `main`
directly from GitHub's API, so running this script always tests against
what's really live, not whatever happens to be sitting in a local clone.
"""

import base64
import os
import re
import urllib.request
import json

REPO = "alikhandesign/alikhandesign.com"
GITHUB_API = "https://api.github.com"


def _fetch_file(path: str, token: str | None = None) -> str:
    """Fetch a file's raw text content from the main branch via GitHub's API."""
    url = f"{GITHUB_API}/repos/{REPO}/contents/{path}?ref=main"
    headers = {"Accept": "application/vnd.github.v3+json"}
    if token:
        headers["Authorization"] = f"token {token}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read())
    return base64.b64decode(data["content"]).decode("utf-8")


def _parse_sources(sources_ts: str) -> str:
    """Extract SITE_SOURCES entries and format them exactly as route.ts does
    when building the REFERENCEABLE PAGES list."""
    pattern = re.compile(
        r"id:\s*(\d+),\s*title:\s*'([^']*)',\s*url:\s*'[^']*',\s*"
        r"description:\s*'((?:[^'\\]|\\.)*)'"
    )
    lines = []
    for match in pattern.finditer(sources_ts):
        source_id, title, description = match.groups()
        description = description.replace("\\'", "'")
        lines.append(f"[{source_id}] {title} — {description}")
    return "\n".join(lines)


def build_system_prompt(token: str | None = None, unlocked: bool = True) -> str:
    """
    Returns the full, current system prompt as production would send it.

    unlocked=True includes PROTECTED_SYSTEM_PROMPT (matches a visitor who has
    entered the case study password - this is the superset and the version
    worth testing by default, since it's a strict superset of the public one).
    """
    token = token or os.environ.get("GITHUB_TOKEN")

    system_prompt_ts = _fetch_file("lib/systemPrompt.ts", token)
    sources_ts = _fetch_file("lib/sources.ts", token)

    public_match = re.search(
        r"export const PUBLIC_SYSTEM_PROMPT = `(.*?)`\n\n"
        r"export const PROTECTED_SYSTEM_PROMPT = `(.*?)`\n",
        system_prompt_ts,
        re.DOTALL,
    )
    if not public_match:
        raise RuntimeError(
            "Could not parse PUBLIC_SYSTEM_PROMPT / PROTECTED_SYSTEM_PROMPT "
            "from lib/systemPrompt.ts - the file's structure may have changed."
        )

    public_prompt, protected_prompt = public_match.groups()
    sources_text = _parse_sources(sources_ts)

    full_prompt = public_prompt
    if unlocked:
        full_prompt = f"{public_prompt}\n\n{protected_prompt}"

    return full_prompt.replace("{{SOURCES}}", sources_text)


if __name__ == "__main__":
    # Quick sanity check when run directly: fetch and print length + a
    # couple of known landmarks, so a broken parse fails loudly and early.
    prompt = build_system_prompt()
    print(f"Fetched system prompt: {len(prompt)} characters")
    for landmark in ["CONFIDENCE CALIBRATION", "SOURCE CITATION", "[1] AI Feedback"]:
        found = landmark in prompt
        print(f"  Contains '{landmark}': {found}")
