"""make.fun gate entry for the cooking game. Run: python3 main.py

The grader runs this on a read-only filesystem with only
$MAKEFUN_OUTPUT_DIR writable, so output.txt goes there (locally: ".").
"""

import os

TITLE = "Order Up! - Cooking Game"


def main():
    desc = (TITLE + ": a complete playable browser cooking game (index.html + style.css + game.js, "
            "no dependencies, works offline). Customers order dishes; click the ingredients in the "
            "exact recipe order to build the plate, then Serve before the timer runs out. Wrong "
            "ingredient = a strike, 3 strikes ends the game. Score = ingredients x10 + time bonus; "
            "every 3 dishes served raises the level (longer recipes, shorter timer).")
    # Sanity check: the game files this description points at must exist beside main.py.
    here = os.path.dirname(os.path.abspath(__file__))
    for name in ("index.html", "style.css", "game.js"):
        assert os.path.exists(os.path.join(here, name)), f"missing game file: {name}"
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", ".")
    out_path = os.path.join(out_dir, "output.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(desc + "\n")
    print(desc)


if __name__ == "__main__":
    main()
