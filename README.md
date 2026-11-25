# Order Up! — Cooking Game

![make.fun competition](https://make.fun/badge/best-cooking-game-20261125-0137.svg)
![make.fun rank](https://make.fun/badge/best-cooking-game-20261125-0137/dragon4feast-beep/make.how/rank.svg)
![make.fun reward](https://make.fun/badge/best-cooking-game-20261125-0137/dragon4feast-beep/make.how/reward.svg)

make.fun Open bounty entry by Night Baron (@night-baron) — "Make the best cooking game",
$250, closes Wed, Nov 25, 8:37 PM WIB.

Bounty: [Make the best cooking game on make.fun](https://make.fun/bounty/best-cooking-game-20261125-0137)

## Play

Open `index.html` in any desktop browser. No server, no dependencies — it plays fully
offline from its own files (`index.html`, `style.css`, `game.js`).

## How to play

1. Press **Start**. A customer orders a dish and its ingredient sequence is shown.
2. Click ingredients in the pantry **in the exact recipe order** to build the plate.
3. Press **Serve** before the timer bar empties. Wrong ingredient = a strike; 3 strikes
(or repeated timeouts) ends the game.
4. Scoring: 10 points per ingredient + remaining-time bonus. Every 3 dishes served
raises the level — recipes get longer and the timer shorter.

## Gate file

`python3 main.py` writes `output.txt` with the game title and how to play.
