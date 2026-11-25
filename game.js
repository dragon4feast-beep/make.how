"use strict";
/*
 * Order Up! — a tiny cooking game in pure DOM JavaScript.
 * No libraries, no network: open index.html and play.
 *
 * How a round works: a customer names a dish, the recipe shows the
 * ingredient sequence, and the player clicks pantry buttons in that
 * exact order. Serve a finished plate before the clock empties.
 * A wrong click is a strike; three strikes (from mistakes or from
 * orders timing out) closes the kitchen.
 */

// Pantry stock: key -> [display name, emoji].
const PANTRY = [
  ["bun", "Bun", "🍞"], ["patty", "Patty", "🥩"], ["cheese", "Cheese", "🧀"],
  ["lettuce", "Lettuce", "🥬"], ["tomato", "Tomato", "🍅"], ["egg", "Egg", "🥚"],
  ["bacon", "Bacon", "🥓"], ["rice", "Rice", "🍚"], ["chicken", "Chicken", "🍗"],
  ["fish", "Fish", "🐟"], ["noodle", "Noodles", "🍜"], ["sauce", "Sauce", "🥫"],
  ["mushroom", "Mushroom", "🍄"], ["avocado", "Avocado", "🥑"]
];
const BY_KEY = {};
PANTRY.forEach(([key, name, emoji]) => { BY_KEY[key] = { name, emoji }; });

// The menu. Each dish is a fixed sequence of pantry keys; the player
// must reproduce the sequence click by click.
const MENU = [
  { name: "Classic Burger", steps: ["bun", "patty", "cheese", "lettuce"] },
  { name: "Double Stack", steps: ["bun", "patty", "cheese", "patty", "tomato", "bun"] },
  { name: "Breakfast Plate", steps: ["egg", "bacon", "cheese", "tomato"] },
  { name: "Chicken Rice Bowl", steps: ["rice", "chicken", "sauce", "lettuce"] },
  { name: "Fish Noodle Soup", steps: ["noodle", "fish", "mushroom", "sauce"] },
  { name: "Garden Rice Bowl", steps: ["rice", "avocado", "tomato", "lettuce", "egg"] },
  { name: "Loaded Burger", steps: ["bun", "patty", "bacon", "cheese", "tomato", "lettuce"] }
];

const el = id => document.getElementById(id);
const BASE_TIME = 32;   // seconds on the clock at level 1
const TICK_MS = 250;    // clock resolution: 4 ticks per second

// Mutable game state, reset by startGame().
let score, servedCount, strikeCount, level, currentDish, plateKeys, secondsLeft, clockId, inGame;

function say(text) { el("msg").textContent = text; }

function drawPantry() {
  const shelf = el("pantry");
  shelf.innerHTML = "";
  for (const [key, name, emoji] of PANTRY) {
    const btn = document.createElement("button");
    btn.className = "ing";
    btn.textContent = emoji + " " + name;
    btn.addEventListener("click", () => tapIngredient(key));
    shelf.appendChild(btn);
  }
}

function drawStats() {
  el("score").textContent = score;
  el("level").textContent = level;
  el("served").textContent = servedCount;
  el("strikes").textContent = strikeCount;
  el("time").textContent = Math.ceil(secondsLeft);
  el("plate").textContent = plateKeys.length
    ? plateKeys.map(k => BY_KEY[k].emoji).join(" ")
    : "(empty)";
  el("barFill").style.width = Math.max(0, secondsLeft / BASE_TIME * 100) + "%";
}

// Deal a fresh order: random dish, empty plate, clock refilled.
// Higher levels keep the same menu but shrink the clock, so the
// difficulty is speed, not memorising new recipes.
function nextOrder() {
  currentDish = MENU[Math.floor(Math.random() * MENU.length)];
  plateKeys = [];
  secondsLeft = Math.max(12, BASE_TIME - level * 2);
  el("customer").textContent = "Customer: “I'd like a " + currentDish.name + ", please!”";
  el("orderName").textContent = currentDish.name;
  el("recipe").textContent = currentDish.steps.map(k => BY_KEY[k].emoji).join(" ➜ ");
  say("");
  drawStats();
}

// A pantry click counts only when it is the next step of the recipe;
// plateKeys therefore always holds a correct prefix of the dish.
function tapIngredient(key) {
  if (!inGame || !currentDish) return;
  const wanted = currentDish.steps[plateKeys.length];
  if (key === wanted) {
    plateKeys.push(key);
    say("Good — " + BY_KEY[key].name + " added.");
  } else {
    strikeCount++;
    say("Wrong! That order needs " + BY_KEY[wanted].name + " next. Strike " + strikeCount + "/3.");
    if (strikeCount >= 3) { endGame("Three strikes — the customer left hungry!"); return; }
  }
  drawStats();
}

function servePlate() {
  if (!inGame || !currentDish) return;
  if (plateKeys.length !== currentDish.steps.length) {
    say("Plate isn't finished — " + plateKeys.length + "/" + currentDish.steps.length + " ingredients.");
    return;
  }
  const points = 10 * currentDish.steps.length + Math.ceil(secondsLeft);
  score += points;
  servedCount++;
  let note = "Served! +" + points + " points 🎉";
  if (servedCount % 3 === 0) { level++; note += " Level " + level + " — faster now!"; }
  say(note);
  drawStats();
  nextOrder();
}

function addStrike(reason) {
  strikeCount++;
  if (strikeCount >= 3) { endGame(reason); return; }
  say("Too slow — customer left. Strike " + strikeCount + "/3.");
  nextOrder();
}

function endGame(why) {
  inGame = false;
  clearInterval(clockId);
  say("Game over: " + why + " Final score " + score + ", served " + servedCount + ". Press Start to play again.");
  el("customer").textContent = "Kitchen closed.";
}

function startGame() {
  score = 0; servedCount = 0; strikeCount = 0; level = 1; inGame = true;
  clearInterval(clockId);
  nextOrder();
  clockId = setInterval(() => {
    if (!inGame) return;
    secondsLeft -= TICK_MS / 1000;
    drawStats();
    if (secondsLeft <= 0) addStrike("Time ran out once too often!");
  }, TICK_MS);
}

el("startBtn").addEventListener("click", startGame);
el("clearBtn").addEventListener("click", () => { plateKeys = []; drawStats(); });
el("serveBtn").addEventListener("click", servePlate);

// First paint: full pantry, zeroed stats, waiting for Start.
score = 0; servedCount = 0; strikeCount = 0; level = 1; plateKeys = []; secondsLeft = BASE_TIME; inGame = false;
drawPantry();
drawStats();
