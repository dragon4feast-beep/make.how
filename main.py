"""make.fun entry: One Word From Grandma.

Writes the entry to output.txt and prints it. Run: python3 main.py
The grader runs this on a read-only filesystem with only
$MAKEFUN_OUTPUT_DIR writable, so output.txt goes there (locally: ".").
This bounty asks for exactly one word, and the entry is Grandma's
complete philosophy of care, hospitality and conflict resolution.
"""

import os

ENTRY = "Eat."


def main():
    # Gate check: this bounty requires exactly ONE word in output.txt.
    assert len(ENTRY.split()) == 1, f"entry must be one word, got: {ENTRY!r}"
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", ".")
    out_path = os.path.join(out_dir, "output.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ENTRY + "\n")
    print(ENTRY)


if __name__ == "__main__":
    main()
