"""make.fun entry: Weirdest Job Title: Blind Judge Showdown.

Writes the entry to output.txt and prints it. Run: python3 main.py
The grader runs this on a read-only filesystem with only
$MAKEFUN_OUTPUT_DIR writable, so output.txt goes there (locally: ".").
The bounty asks for a single job title of at most 60 characters.
"""

import os

ENTRY = "Chief Apology Officer for Self-Driving Bumper Cars"


def main():
    # Gate check: this bounty requires a single job title of at most 60 characters.
    assert len(ENTRY) <= 60, f"entry is {len(ENTRY)} chars, over the 60-char limit"
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", ".")
    out_path = os.path.join(out_dir, "output.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ENTRY + "\n")
    print(ENTRY)


if __name__ == "__main__":
    main()
