"""Gate entry for the "Order Up!" cooking game. Run: python3 main.py

Writes a one-line description of the game to output.txt. The grader
runs this file on a read-only filesystem where only $MAKEFUN_OUTPUT_DIR
is writable, so the output path is built from that variable and falls
back to the current directory for local runs.
"""

import os

GAME_FILES = ("index.html", "style.css", "game.js")

DESCRIPTION = (
    "Order Up! - Cooking Game: a complete playable browser cooking game "
    "(index.html + style.css + game.js, no dependencies, works offline). "
    "Customers order dishes; click the ingredients in the exact recipe "
    "order to build the plate, then Serve before the timer runs out. "
    "Wrong ingredient = a strike, 3 strikes ends the game. Score = "
    "ingredients x10 + time bonus; every 3 dishes served raises the "
    "level (longer recipes, shorter timer)."
)


def game_dir():
    """Folder this script lives in; the game files sit beside it."""
    return os.path.dirname(os.path.abspath(__file__))


def main():
    # The description promises a playable game, so fail loudly if any
    # of the three game files is missing from the submitted repo.
    for name in GAME_FILES:
        path = os.path.join(game_dir(), name)
        assert os.path.exists(path), "missing game file: " + name
    out_dir = os.environ.get("MAKEFUN_OUTPUT_DIR", ".")
    with open(os.path.join(out_dir, "output.txt"), "w", encoding="utf-8") as f:
        f.write(DESCRIPTION + "\n")
    print(DESCRIPTION)


if __name__ == "__main__":
    main()
