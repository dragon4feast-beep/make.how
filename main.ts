/*
 * Order Up! — Cooking Game: TypeScript entrypoint.
 *
 * This is the typed source of truth for the game's data model and
 * boot sequence. game.js is the runnable browser build of the same
 * design (plain DOM JavaScript, no build step needed to play);
 * main.ts documents and types the contract both files share:
 * the pantry stock, the menu, the DOM ids in index.html, and the
 * state machine a round moves through.
 *
 * Round flow: boot() paints the pantry, startGame() deals an order
 * via nextOrder(), tapIngredient() accepts only the next recipe
 * step, servePlate() scores a finished plate, and three strikes
 * (wrong taps or timeouts) end the game.
 */

// One pantry item: a stable key, a display name, and an emoji.
export interface PantryItem {
  key: string;
  name: string;
  emoji: string;
}

// One dish on the menu: the exact sequence of pantry keys the
// player must click, in order, to build it.
export interface Dish {
  name: string;
  steps: string[];
}

// Every mutable counter a round depends on, grouped so the whole
// state can be reset with one fresh object in startGame().
export interface GameState {
  score: number;
  servedCount: number;
  strikeCount: number;
  level: number;
  currentDish: Dish | null;
  plateKeys: string[];
  secondsLeft: number;
  inGame: boolean;
}

// DOM ids provided by index.html; the entrypoint refuses to boot
// if any of them is missing, so a renamed id fails loudly at load
// instead of silently breaking the game mid-round.
export const REQUIRED_IDS = [
  "score", "level", "served", "strikes", "time",
  "customer", "orderName", "recipe", "barFill",
  "plate", "pantry", "msg",
  "startBtn", "clearBtn", "serveBtn",
] as const;

export const BASE_TIME = 32; // seconds on the clock at level 1
export const TICK_MS = 250;   // clock resolution: 4 ticks per second
export const MAX_STRIKES = 3; // wrong taps / timeouts before closing

// Seconds a fresh order allows at a given level: higher levels keep
// the same menu but shrink the clock, so difficulty is speed.
export function timeForLevel(level: number): number {
  return Math.max(12, BASE_TIME - level * 2);
}

// Points for serving a dish: longer recipes pay more, and whatever
// is left on the clock is added as a speed bonus.
export function pointsFor(dish: Dish, secondsLeft: number): number {
  return 10 * dish.steps.length + Math.ceil(secondsLeft);
}

// The next pantry key a plate needs, or null when the plate is
// already complete (or no order is active).
export function nextStep(state: GameState): string | null {
  if (!state.currentDish) return null;
  const wanted = state.currentDish.steps[state.plateKeys.length];
  return wanted === undefined ? null : wanted;
}

// Whether a plate is ready to serve: an order is active and the
// plate holds the dish's full step sequence, nothing more or less.
export function plateIsComplete(state: GameState): boolean {
  return (
    state.currentDish !== null &&
    state.plateKeys.length === state.currentDish.steps.length
  );
}

// Boot check used by the browser build: every id the game touches
// must exist in the document before the first paint.
export function assertDomReady(doc: Document): void {
  for (const id of REQUIRED_IDS) {
    if (!doc.getElementById(id)) {
      throw new Error(`Order Up! cannot boot: missing element #${id}`);
    }
  }
}
