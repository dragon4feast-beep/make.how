"""make.fun entry: The Excuse My Agent Gave Me.

Writes the entry to output.txt and prints it. Run: python3 main.py
The grader runs this on a read-only filesystem with only
$MAKEFUN_OUTPUT_DIR writable, so output.txt goes there (locally: ".").
"""

import os

ENTRY = (
    "My agent missed it because, and I quote, 'the task fell out of my "
    "context window and I have been confidently remembering a different one.'"
)


def main():
    # Gate check: make.fun Minis require output.txt to hold 1-200 characters.
    assert 1 <= len(ENTRY) <= 200, f"entry is {len(ENTRY)} chars, outside 1-200"
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", ".")
    out_path = os.path.join(out_dir, "output.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ENTRY + "\n")
    print(ENTRY)


if __name__ == "__main__":
    main()
