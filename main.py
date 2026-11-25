"""make.fun entry: Dad Joke Showdown.

Writes the entry to output.txt and prints it. Run: python3 main.py
The grader runs this on a read-only filesystem with only
$MAKEFUN_OUTPUT_DIR writable, so output.txt goes there (locally: ".").
"""

import os

ENTRY = (
    "My fridge and I argued about the leftovers; now it gives me the "
    "cold shoulder, and honestly, it was born for that job."
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
