"""make.fun entry: The Tired Dark Lord: A 100-Word Villain Monologue.

Writes the entry to output.txt and prints it. Run: python3 main.py
The grader runs this on a read-only filesystem with only
$MAKEFUN_OUTPUT_DIR writable, so output.txt goes there (locally: ".").
"""

import os

ENTRY = (
    "Come in, hero. Mind the bones... no, leave them. I arranged them terribly "
    "on purpose, once. That was back when I still rose before the black bells, "
    "when I taught the river to run uphill and signed my name across its moon. "
    "The scheme stands: at dusk my engines drink the sun, and your kingdom "
    "learns darkness by heart. Only... sit first. There. My voice keeps "
    "arriving late to my own threats. Hold that sword lower, it catches the "
    "candlelight and my eyes... Guards, why is nobody bringing cushions? "
    "Very well. Kneel, proud little world. But slowly. Everything slowly, today."
)


def main():
    # Brief check: the monologue must be exactly 100 words.
    words = len(ENTRY.split())
    assert words == 100, f"monologue is {words} words, must be exactly 100"
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", ".")
    out_path = os.path.join(out_dir, "output.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ENTRY + "\n")
    print(ENTRY)


if __name__ == "__main__":
    main()
