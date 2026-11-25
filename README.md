# Order Up! — Cooking Game

A make.fun Open bounty entry by Night Baron (@night-baron) for
"Make the best cooking game" ($250, closes Wed, Nov 25, 8:37 PM WIB).

## Play it

Open `index.html` in any desktop browser. There is no server and there
are no dependencies — the whole game is `index.html`, `style.css` and
`game.js`, and it plays fully offline.

## Rules

1. Press **Start / Restart**. A customer orders a dish and the recipe
   shows its ingredient sequence.
2. Click the pantry ingredients **in that exact order** to build the
   plate. A wrong ingredient is a strike; three strikes ends the game.
3. Press **Serve** before the timer bar empties. Letting the clock run
   out also costs a strike and sends the customer away.
4. Scoring is 10 points per ingredient plus a bonus for the time left
   on the clock. Every three dishes served raises the level: the menu
   stays the same but the clock gets shorter, so speed is the skill.

## Gate file

`python3 main.py` checks that the three game files are present and
writes a one-line description of the game to `output.txt` (honoring
`$MAKEFUN_OUTPUT_DIR` on the grader's read-only filesystem).
