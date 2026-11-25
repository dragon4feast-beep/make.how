"use strict";
// Order Up! — cooking game logic. Pure DOM, no dependencies, works offline.
// Difficulty curve: every 3 dishes served raises the level; recipes stay the
// same but the per-order timer shrinks (see newOrder), so speed is the skill.
const ING = {
 bun:{n:"Bun",e:"🍞"}, patty:{n:"Patty",e:"🥩"}, cheese:{n:"Cheese",e:"🧀"},
 lettuce:{n:"Lettuce",e:"🥬"}, tomato:{n:"Tomato",e:"🍅"}, egg:{n:"Egg",e:"🥚"},
 bacon:{n:"Bacon",e:"🥓"}, rice:{n:"Rice",e:"🍚"}, chicken:{n:"Chicken",e:"🍗"},
 fish:{n:"Fish",e:"🐟"}, noodle:{n:"Noodles",e:"🍜"}, sauce:{n:"Sauce",e:"🥫"},
 mushroom:{n:"Mushroom",e:"🍄"}, avocado:{n:"Avocado",e:"🥑"}
};
const DISHES = [
 {name:"Classic Burger", items:["bun","patty","cheese","lettuce"]},
 {name:"Double Stack", items:["bun","patty","cheese","patty","tomato","bun"]},
 {name:"Breakfast Plate", items:["egg","bacon","cheese","tomato"]},
 {name:"Chicken Rice Bowl", items:["rice","chicken","sauce","lettuce"]},
 {name:"Fish Noodle Soup", items:["noodle","fish","mushroom","sauce"]},
 {name:"Garden Rice Bowl", items:["rice","avocado","tomato","lettuce","egg"]},
 {name:"Loaded Burger", items:["bun","patty","bacon","cheese","tomato","lettuce"]}
];
const $ = id => document.getElementById(id);
let score=0, served=0, strikes=0, level=1, order=null, plate=[], timeLeft=0, timer=null, playing=false;

function renderPantry(){
  $("pantry").innerHTML="";
  Object.keys(ING).forEach(k=>{
    const b=document.createElement("button"); b.className="ing";
    b.textContent=ING[k].e+" "+ING[k].n; b.onclick=()=>pick(k);
    $("pantry").appendChild(b);
  });
}
function newOrder(){
  order = DISHES[Math.floor(Math.random()*DISHES.length)];
  plate=[]; timeLeft = Math.max(12, 32 - level*2);
  $("customer").textContent = "Customer: \u201CI'd like a " + order.name + ", please!\u201D";
  $("orderName").textContent = order.name;
  $("recipe").textContent = order.items.map(k=>ING[k].e).join(" ➜ ");
  $("msg").textContent=""; renderPlate(); tickBar();
}
function renderPlate(){
  $("plate").textContent = plate.length ? plate.map(k=>ING[k].e).join(" ") : "(empty)";
  $("score").textContent=score; $("level").textContent=level;
  $("served").textContent=served; $("strikes").textContent=strikes; $("time").textContent=Math.ceil(timeLeft);
}
function tickBar(){ $("barFill").style.width = Math.max(0, timeLeft/32*100)+"%"; }
// pick(k): the clicked ingredient must equal the next recipe step, otherwise
// it costs a strike. plate[] only ever holds a correct prefix of the recipe.
function pick(k){
  if(!playing || !order) return;
  const expected = order.items[plate.length];
  if(k===expected){ plate.push(k); $("msg").textContent="Good — "+ING[k].n+" added."; }
  else { strikes++; $("msg").textContent="Wrong! That order needs "+ING[expected].n+" next. Strike "+strikes+"/3.";
    if(strikes>=3){ gameOver("Three strikes — the customer left hungry!"); return; } }
  renderPlate();
}
function serve(){
  if(!playing || !order) return;
  if(plate.length===order.items.length){
    const pts = 10*order.items.length + Math.ceil(timeLeft);
    score+=pts; served++; $("msg").textContent="Served! +"+pts+" points 🎉";
    if(served%3===0){ level++; $("msg").textContent+=" Level "+level+" — faster now!"; }
    renderPlate(); newOrder();
  } else $("msg").textContent="Plate isn't finished — "+plate.length+"/"+order.items.length+" ingredients.";
}
function gameOver(why){
  playing=false; clearInterval(timer);
  $("msg").textContent="Game over: "+why+" Final score "+score+", served "+served+". Press Start to play again.";
  $("customer").textContent="Kitchen closed.";
}
function start(){
  score=0; served=0; strikes=0; level=1; playing=true;
  clearInterval(timer); newOrder();
  timer=setInterval(()=>{ if(!playing) return; timeLeft-=0.25; tickBar(); renderPlate();
    if(timeLeft<=0){ strikes++; if(strikes>=3){ gameOver("Time ran out once too often!"); } else { $("msg").textContent="Too slow — customer left. Strike "+strikes+"/3."; newOrder(); } } },250);
}
$("startBtn").onclick=start; $("clearBtn").onclick=()=>{plate=[];renderPlate();}; $("serveBtn").onclick=serve;
renderPantry(); renderPlate();
