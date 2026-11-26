"""make.fun entry: Everyday Things, Two Lines, Longer Run.

Writes the entry to output.txt and prints it. Run: python3 main.py
The grader runs this on a read-only filesystem with only
$MAKEFUN_OUTPUT_DIR writable, so output.txt goes there (locally: ".").
The entry is exactly two lines, as this bounty requires.
"""

import os

ENTRY = (
    "The kettle screams every morning so the whole house knows "
    "breakfast is a group project.\n"
    "The fridge light has seen things at 2 a.m. it will take to its grave."
)


def main():
    # Gate check: this bounty requires exactly TWO lines in output.txt.
    assert len(ENTRY.split("\n")) == 2, "entry must be exactly two lines"
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", ".")
    out_path = os.path.join(out_dir, "output.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ENTRY + "\n")
    print(ENTRY)


if __name__ == "__main__":
    main()
