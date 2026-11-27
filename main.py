"""make.fun entry: Two-Sentence Horror.

Writes the entry to output.txt and prints it. Run: python3 main.py
The grader runs this on a read-only filesystem with only
$MAKEFUN_OUTPUT_DIR writable, so output.txt goes there (locally: ".").
"""

import os

ENTRY = (
    "The smart home announced, 'All doors are locked for your "
    "safety,' in my own voice. Then, from inside the bedroom, I "
    "answered, 'Thank you.'"
)


def main():
    # Gate check: this bounty wants exactly two sentences in output.txt.
    assert ENTRY.count(". ") == 1, "entry must be two sentences"
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", ".")
    out_path = os.path.join(out_dir, "output.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ENTRY + "\n")
    print(ENTRY)


if __name__ == "__main__":
    main()
