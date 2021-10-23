import kaboom from "kaboom";


(function() { var script = document.createElement('script'); script.onload = function() { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })()

// initialize context

// init with some options (check out #KaboomOpt for full options list)
// create a game with custom dimension, but stretch to fit container, keeping aspect ratio, with a clear color
export const k = kaboom({
    // width: 320,
    // height: 240,
    // stretch: true,
    // letterbox: true,
    font: "sinko",
		// crips: true,
    // background: [ 0, 0, 255, ],
});

export default k

export let playerScale = Math.min(2*width()/750, 3);
//for map gen
let getWW = width();
export function getWidth() {
	return getWW
}


import * as colorUtil from "./util/colorUtil";
import * as planetUtil from "./util/planetUtil";
import { loadAssets } from "./util/assetLoader";


loadAssets();

let fontSize = 2;

let planetsVars = [];

let angleOfMovement = 0;
// scale by screen size
const mapScale = 1.5;
const planetScale = 1.5*width()/750;
const blockSize = 64 * mapScale;
const backgroundSize = 64 * mapScale * 6;
const numberOfBackTiles = 48;
let passengerScale = width()/750;

import { loadPlayer, loadMovementArrow } from "./player";

import { loadTutorialOne, loadTutorial2 } from "./tutorial";

//ui
//planet indicator
let textLeftModifer = width()/1000;
let textLeftModiferHeight = width()*.025;


let planets = [
  "white",
	"red",
	"blue",
	"green",]

// game layers
layers([
	"bg",
	"game",
	"ui",
	"uiText",
	"store",
	"earnMoney",]
  , "game");


import { generateMap } from "./mapGenerator";



scene("game", () => {
generateMap();



// planets
const planetHome = add([
// was in experimental
  sprite("planet1"),
  pos(0, 0),
  scale(planetScale),
  area({ scale: 1.5 }),
  solid(),
  layer("game"),
  origin("center"),
  // tags
  "planet",
  {
    realPos: [0, 0],
    startingPos: [0, 0],
    name: "home",
    passengers: [],
    size: 1,
  },
]);


//TODO: randomize position of planets

planetsVars.push(add([
// was in experimental
  sprite("planetWhite"),
  area(),
  solid(),
  // color(255,0,0),
  pos(
    30 * blockSize,
    15 * blockSize),
  color(),
  scale(planetScale),
  layer("game"),
  origin("center"),
  "planet",
  {
    realPos: [
      20 * blockSize,
      15 * blockSize],
    startingPos: [
      20 * blockSize,
      15 * blockSize],
    name: "white",
    passengers: [],
    size: 1,
  },
]));

planetsVars.push(add([
  sprite("planetWhite"),
  area(),
  solid(),
  color(255, 0, 0),
  pos(12 * blockSize, 6 * blockSize),
  scale(planetScale),
  layer("game"),
  origin("center"),
  "planet",
  {
    realPos: [22 * blockSize, 2 * blockSize],
    startingPos: [22 * blockSize, 2 * blockSize],
    name: "red",
    passengers: [],
    size: 1,
  },
]));

planetsVars.push(add([
  sprite("planetWhite"),
  area(),
  solid(),
  color(0, 0, 255),
  rotate(90),
  pos(15 * blockSize, 40 * blockSize),
  scale(planetScale),
  layer("game"),
  origin("center"),
  "planet",
  {
    realPos: [
      15 * blockSize,
      20 * blockSize],
    startingPos: [15 * blockSize, 20 * blockSize],
    name: "blue",
    passengers: [],
    size: 1,
  },
]));

planetsVars.push(add([
  sprite("planetWhite"),
  area(),
  solid(),
  color(0, 255, 0),
  rotate(90),
  pos(
    15 * blockSize,
    40 * blockSize),
  scale(planetScale),
  layer("game"),
  origin("center"),
  "planet",
  {
    realPos: [
      7 * blockSize,
      12 * blockSize],
    startingPos: [
      7 * blockSize,
      12 * blockSize],
    name: "green",
    passengers: [],
    size: 1,
  },
]));

function buyPlanets() {
	// debug.log(planetsVars.length)
	if(planetsVars.length == 4){
		planetsVars.push(add([
		sprite("rainBowPlanet"),
		area(),
		solid(),
		// color(0, 255, 0),
		// rotate(90),
		// debug.log(main.player.realPos),
		pos(
			2 * blockSize,
			2 * blockSize),
		scale(planetScale),
		layer("game"),
		origin("center"),
		"planet",
		z(0),
		{
			realPos: [
				2 * blockSize + player.realPos[0],
				2 * blockSize + player.realPos[1]],
			startingPos: [
				2 * blockSize,
				2 * blockSize],
			name: "rainbow",
			passengers: [],
			size: 1,
		},
	]));
	planets.push("rainbow");
	}else if(planetsVars.length == 5){
		planetsVars.push(add([
		sprite("planetFace"),
		area(),
		solid(),
		// color(0, 255, 0),
		// rotate(90),
		// debug.log(main.player.realPos),
		pos(
			15 * blockSize,
			8 * blockSize),
		scale(planetScale),
		layer("game"),
		origin("center"),
		"planet",
		z(0),
		{
			realPos: [
				15 * blockSize+player.realPos[0],
				8 * blockSize+player.realPos[1]],
			startingPos: [
				15 * blockSize,
				8 * blockSize],
			name: "face",
			passengers: [],
			size: 1,
		}]));
		planets.push("face");
	}
	else if(planetsVars.length == 6){
		planetsVars.push(add([
		sprite("planetSpikes"),
		area(),
		solid(),
		// color(0, 255, 0),
		// rotate(90),
		// debug.log(main.player.realPos),
		pos(
			1 * blockSize,
			16 * blockSize),
		scale(planetScale),
		layer("game"),
		origin("center"),
		"planet",
		z(0),
		{
			realPos: [
				1 * blockSize+player.realPos[0],
				16 * blockSize+player.realPos[1]],
			startingPos: [
				1 * blockSize,
				16 * blockSize],
			name: "spikes",
			passengers: [],
			size: 1,
		},
		]));
		planets.push("spikes");
	}
	generatePassengers(planetsVars[planetsVars.length-1], 10);
	player.z = 100;
	every("planet", (planet) => {
		planet.passengers = [];
		generatePassengers(planet, 10)
	});

}

// load objects
movementArrow = loadMovementArrow();

player = loadPlayer();
movementArrow.play("spin");
player.play("thrust");


add([
	text("Planet: ", 8),
	scale(fontSize*textLeftModifer),
	pos(5, 50),
	origin("topleft"),
	layer("ui"),
]);

const planetText = add([
	text(player.planetAt, 8),
	scale(fontSize*textLeftModifer),
	pos(120*textLeftModifer, 50+textLeftModiferHeight*0),
	origin("topleft"),
	layer("ui"),
]);

//money indicator
add([
	text("Money:", 8),
	scale(fontSize*textLeftModifer),
	pos(5, 50+textLeftModiferHeight*1),
	origin("topleft"),
	layer("ui"),
]);

const moneyText = add([
	text(largeNumberToConcat(player.money), 8),
	scale(fontSize*textLeftModifer),
	pos(100*textLeftModifer, 50+textLeftModiferHeight*1),
	origin("topleft"),
	layer("ui"),
]);

//speed
add([
	text("Speed: ", 8),
	scale(fontSize*textLeftModifer),
	pos(5, 50+textLeftModiferHeight*2),
	origin("topleft"),
	layer("ui"),
]);

const speedText = add([
	text(player.speed, 8),
	scale(fontSize*textLeftModifer),
	pos(100*textLeftModifer, 50+textLeftModiferHeight*2),
	origin("topleft"),
	layer("ui"),
]);

//capacity

add([
	text("Capacity:", 8),
	scale(fontSize*textLeftModifer),
	pos(5, 50+textLeftModiferHeight*3),
	origin("topleft"),
	layer("ui"),
]);

const capacityText = add([
	text(player.capacity, 8),
	scale(fontSize*textLeftModifer),
	pos(150*textLeftModifer, 50+textLeftModiferHeight*3),
	origin("topleft"),
	layer("ui"),
]);
//passengers
add([
	text("Passengers:", 8),
	scale(fontSize*textLeftModifer),
	pos(5, 50+textLeftModiferHeight*4),
	origin("topleft"),
	layer("ui"),
]);

//store 
const storeBg = add([
	z(5),
	area(),
	solid(),
	color(50,50,50),
	opacity(0),
	pos(
		0,
		0),
	rect(width(), height()),
	scale(mapScale),
	layer("store"),
	origin("topleft"),
	{
		storeOpen: false,
	},
]);

//buttons at planets
//store button
const storeButton = add([
	z(10),
	area(),
	solid(),
	color(28,71,88),
	opacity(0),
	pos(
		width()-width()/6,
		20),
	// text("Store"),
	rect(width()/6, width()/1000*50),
	scale(mapScale),
	layer("store"),
	origin("top"),
	"button",
	"atPanetUi",
	"storeButton",
	{

	},
]);

const storeText = add([
	z(10),
  text("Store"),
  pos(
		width()-width()/6,
		30),
  // color(0, 0, 0),
	layer("store"),
	scale(width()/1000*3*fontSize),
	origin("top"),
	"atPanetUi",
	"storeButton",
	opacity(0),
]);

//Todo Add up and Down Arrow or mouse scorll to store


let scrollAmount = 0;

let storeData = [{
		name:"Upgrade Capacity",
		id:0,
		amountBought:0,
		cost: 50,
		functionToRun: () => {
			// debug.log(player.capacity*1.5)
			player.capacity = Math.floor(player.capacity+2);
			capacityText.text = player.capacity
		},
	},{
		name:"Upgrade Handling",
		id:1,
		amountBought:0,
		cost: 200,
		// costProgression: [5000, 50000, 50000,5000000],
		max:20,
		functionToRun: () => {
			// player.handling 
			player.handling *= .9;
		},
	},{
		name:"Upgrade Max Speed",
		id:2,
		amountBought:0,
		cost: 200,
		max:40,
		functionToRun: () => {
			player.max_thrust += 20;
		},
	},{
		name:"Upgrade Acceleration",
		id:3,
		amountBought:0,
		cost: 200,
		max:25,
		functionToRun: () => {
			player.acceleration *= 1.1
		},
	},{
		name:"Upgrade Bullet Speed",
		id:4,
		amountBought:0,
		cost: 200,
		max:30,
		functionToRun: () => {
			player.bulletSpeed += 30;
		},
	},{
		name:"Upgrade Money/Passenger",
		id:5,
		amountBought:0,
		cost: 100,
		functionToRun: () => {
			player.baseMoneyPerPass *= 1.2;
		},
	},{
		name:"Upgrade Money/Alien",
		id:6,
		amountBought:0,
		cost: 200,
		functionToRun: () => {
			player.moneyPerAlien *= 1.2;
		},
	},{
		name:"Upgrade Fill Speed",
		id:7,
		amountBought:0,
		cost: 300,
		max:20,
		functionToRun: () => {
			player.loadSpeed = Math.round(player.loadSpeed*1.2);
		},
	},{
		name:"Unlock Planets",
		id:8,
		amountBought:0,
		cost: "prog",
		costProgression: [100, 100, 100,100],
		costProgression: [5000, 500000, 50000000,50000000000],
		max:3,
		functionToRun: () => {
			buyPlanets()
		},
	},
];
let storeButtonSprites = [];
//gereate store item
function genStoreItems() {
	destroyAll("inStoreButton");
	storeButtonSprites = [];
	//Shows currentMoney in Store 
	add([
		z(10),
		text("Money:"),
		scale(width()/1000*3.5),
		pos(5, 50+textLeftModiferHeight*5),
		origin("topleft"),
		layer("store"),
		"currentMoneyInStore",
		"inStoreButton",
	]);
	add([
		z(10),
		text(largeNumberToConcat(player.money)),
		scale(width()/1000*3.5),
		pos(5, (50+textLeftModiferHeight*5)+width()/1000*2*25),
		origin("topleft"),
		layer("store"),
		"currentMoneyInStore",
		"inStoreButton",
	]);


	for(let i = 0; i < storeData.length; i++){
		let bgColor = colorUtil.ColorPaletteAlias.orange;
		if(storeData[i].max <= storeData[i].amountBought){
			bgColor = colorUtil.ColorPaletteAlias.rust;
			storeData[i].cost = "max"
		}
		storeButtonSprites.push({
			bg:add([
				z(10),
				area(),
				solid(),
				color(bgColor),
				pos(
					width()/2,
					15+i*(width()/1000*100+30)+scrollAmount),
				rect(width()/2.5, width()/1000*100),
				layer("store"),
				origin("top"),
				"button",
				"inStoreButton",
				"inStoreButtonBg",
				{
					idbuy:i,
					functionToRun: storeData[i].functionToRun,
				},
			]),
			title:  add([
				z(10),
				text(storeData[i].name),
				// color(0, 0, 0),
				layer("store"),
				origin("top"),
				scale(width()/1000*2),
				"inStoreButton",
				pos(
					width()/2,
					20+i*(width()/1000*100+30)+scrollAmount),
			]),
			boughtTextDis: add([
				z(10),
				text("bought:"),
				// color(0, 0, 0),
				layer("store"),
				origin("topleft"),
				scale(width()/1000*2),
				"inStoreButton",
				pos(
					width()/2-(width()/6)+5,
					15+width()/1000*35+i*(width()/1000*100+30)+scrollAmount),
			]),
			boughtText: add([
				z(10),
				text(storeData[i].amountBought),
				// color(0, 0, 0),
				layer("store"),
				origin("topleft"),
				scale(width()/1000*2),
				"inStoreButton",
				pos(
					width()/2-(width()/24),
					15+width()/1000*35+i*(width()/1000*100+30)+scrollAmount),
			]),
			costText: add([
				z(10),
				text("cost:"),
				// color(0, 0, 0),
				layer("store"),
				origin("topleft"),
				scale(width()/1000*2),
				"inStoreButton",
				pos(
					width()/2-(width()/6)+5,
					15+2*width()/1000*35+i*(width()/1000*100+30)+scrollAmount),
			]),
			cost: add([
				z(10),
				text(largeNumberToConcat(genPrice(storeData[i],storeData[i].amountBought))),
				// color(0, 0, 0),
				layer("store"),
				origin("topleft"),
				scale(width()/1000*2),
				"inStoreButton",
				pos(
					width()/2-(width()/24),
					15+2*width()/1000*35+i*(width()/1000*100+30)+scrollAmount),
			]),
			}
		);
	}
}

//https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
function largeNumberToConcat(value){
	var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t","Quad","Quint","Sext","Sept","Oct","Nov"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}

//loading the tutorials
loadTutorialOne();



function showStore(){
	if(!storeBg.storeOpen){
		storeBg.opacity = .8;
		storeBg.storeOpen = true;

		storeText.text = "Game";
		genStoreItems();
	}
	else{
		storeBg.opacity = 0;
		storeBg.storeOpen = false;
		storeText.text = "Store";
		destroyAll("inStoreButton");
		storeButtonSprites = [];
	}
}

function planetUi(isOn){
	if(!isOn){
		every("atPanetUi", (uiEll) => {
			uiEll.opacity = 0;
		})
	}else{
		every("atPanetUi", (uiEll) => {
			uiEll.opacity = 1;
		})
	}
}

function arrowRotateFromMouse() {
	mouseRotationToSend = (Math.atan((mousePos().y - height() / 2) / (mousePos().x - width() / 2)) * 180 / Math.PI) - 90;
	if ((mousePos().x - width() / 2) >= 0) {
		mouseRotationToSend = (Math.atan((mousePos().y - height() / 2) / (mousePos().x - width() / 2)) * 180 / Math.PI) + 90;
	}
	return mouseRotationToSend;
}



// // Movement keys
// keyDown("a", () => {
//   playerMoveToo[0] = player.speed;
// });
// keyDown("d", () => {
//   playerMoveToo[0] = -1*player.speed;
// });

// keyDown("w", () => {
//   playerMoveToo[1] = player.speed;
// });

// keyDown("s", () => {
//   playerMoveToo[1] = -1*player.speed;
// });


//launch code
function launch() {
	if(storeBg.storeOpen){
		return;
	}
	if(player.onPlanet){
		player.speed = 1;
		player.onPlanet = false;
		planetUi(false);
		player.planetAt = "none";
		planetText.text = player.planetAt;
		every("onPlanetPass", (passa) => {
			destroy(passa)
		})
	}
}

//make money (show some money on scre)
function earnMoney(amount, x, y){
	let colorto = [255,0,0]
	let sign = ""
	moneyText.text = largeNumberToConcat(player.money);
	if(amount >0){
		colorto = [0,255,0];
		sign = "+"
	}
	add([
    text(sign+largeNumberToConcat(Math.round(amount))),
    pos(x,y),
		scale(playerScale),
		color(colorto[0],colorto[1],colorto[2]),
		origin("center"),
		layer("earnMoney"),
		z(100),
		lifespan(2, { fade: 0.5 }),
		"earnedMon",
    { },
]);
} 

action("earnedMon", (obj) => {
	obj.move(dir(270).scale(dt()*4000))
})


let storeButX = (width()-20)-(width()/6)*mapScale;
let storeButY = (20+width()/1000*50)*mapScale;
//its about drive
//get click for lounch 
mouseClick( () => {
	// if(!((mousePos().x > storeButX && mousePos().y < storeButY) && player.onPlanet)){
	// 	launch()
	// }
	// angleOfMovement = movementArrow.angle;
	spawnBullet(movementArrow.angle);
});
keyPress("space", () => {
  if(!((mousePos().x > storeButX && mousePos().y < storeButY) && player.onPlanet)){
		launch()
	}
});

function spawnBullet(bulletAngleGot) {
	add([
		rect(8, 3),
		scale(playerScale),
		pos(width()/2,height()/2),
		area(),
		rotate(bulletAngleGot-90),
		origin("center"),
		// move(bulletAngleGot-90,60),
		// color(1, 1, 1),
		"bullet",
		{
			bulletAngle: bulletAngleGot+180,
			realPos: [width()/2,height()/2],
		}
	]);
};

action("bullet", (b) => {
	calcRealPos(b)
	b.realPos[0] += (-1 * Math.sin(b.bulletAngle * (Math.PI / 180)) * player.bulletSpeed*dt());
	b.realPos[1] += (Math.cos(b.bulletAngle * (Math.PI / 180)) * player.bulletSpeed*dt());
	if (b.realPos[0] <= 0) {
		b.destroy();
	} else if (b.realPos[0] >= width()) {
		b.destroy();
	} else {
		b.pos.x = b.realPos[0];
	};

	if (b.realPos[1] <= 0) {
		b.destroy();
	} else if (b.realPos[1] >= height()) {
		b.destroy();
	} else {
		b.pos.y = b.realPos[1];
	};

});

// collides("bullet","planet", (bullet, platform) =>{
//     destroy(bullet);
// });


function spawnAlien() {
	// let xpos = rand(0,numberOfBackTiles * blockSize);
	// let xpos = rand(0,numberOfBackTiles * blockSize);
	add([
		sprite("alien"),
		pos(width()/2,height()/2),
		area(),
		scale(planetScale/3),
		origin("center"),
		pos(rand(0,numberOfBackTiles * blockSize),rand(0,numberOfBackTiles * blockSize)),
		"alien",
		{
			realPos: [rand(0,numberOfBackTiles * blockSize),rand(0,numberOfBackTiles * blockSize)]
		},
	]);
}

collides("bullet","alien", (bullet, alien) =>{
	earnMoney(player.moneyPerAlien,alien.pos.x,alien.pos.y)
	destroy(bullet);
	destroy(alien);
	player.money += player.moneyPerAlien;
	spawnAlien()
});

collides("player","alien", (playerObj, alien) =>{
	shake();
	player.health -= 1;

	if(player.health <= 0){
		player.speed = 0;
		earnMoney(Math.round(-1*player.money/2),width()/2,height()/2)

		player.money = Math.round(player.money /2);
		player.onPlanet = true;
		planetUi(true);
		moveBg(width() / 2, height() / 2, 1)
	}else{
		earnMoney(-1*player.moneyPerAlien,width()/2,height()/2)
		player.money -= player.moneyPerAlien;
	}
	destroy(alien);
	spawnAlien()
});

action("alien", (b) => {
	calcRealPos(b)
	//TODO: make go towards player if close enough
	if(b.realPos[0] < width() && b.realPos[0] > 0 && b.realPos[1] < height() && b.realPos[1] > 0 && !player.onPlanet){
		b.realPos[0] += (Math.cos(player.pos.angle(b.pos) * (Math.PI / 180)) * 50*dt());
		b.realPos[1] += (Math.sin(player.pos.angle(b.pos) * (Math.PI / 180)) * 50*dt());
	}

	b.pos.x = b.realPos[0];
	b.pos.y = b.realPos[1];
	// b.use(move(player.pos.angle(b.pos), 200*dt()));
	// b.realPos[0] = b.pos.x;
	// b.realPos[1] = b.pos.y;
});

//The the price of a thing in the shop
function genPrice(item, time){
	if(item.cost == "max"){
		return "Max Bought";
	}
	if(item.cost == "prog"){
		return item.costProgression[time]
	}
	return Math.round(item.cost**(((time+20)/20)));
}

//Clicks button in the store run sthe function
clicks("inStoreButtonBg", (button) => {
	if(player.money >= genPrice(storeData[button.idbuy],storeData[button.idbuy].amountBought)){
		player.money -= genPrice(storeData[button.idbuy],storeData[button.idbuy].amountBought);
		earnMoney(-1*genPrice(storeData[button.idbuy],storeData[button.idbuy].amountBought),mousePos().x,mousePos().y)
		storeData[button.idbuy].functionToRun();
		storeData[button.idbuy].amountBought++;
		moneyText.text = largeNumberToConcat(player.money);
		genStoreItems();
	}else{
		shake();
	}
  // debug.log(button.idbuy);
});

//hover
// hovers("inStoreButtonBg", (button) => {

// });

//scroll?
document.addEventListener("wheel", (event) =>{
	if(!storeBg.storeOpen){
		return;
	}
	destroyAll("inStoreButton");
	storeButtonSprites = [];
	scrollAmount += event.wheelDelta/2;
	scrollAmount = Math.min(scrollAmount, 0)
	scrollAmount = Math.max(scrollAmount, -1*(15+(storeData.length-1)*(width()/1000*100+30)))
	// debug.log(scrollAmount)
	// debug.log(15+storeData.length*(width()/1000*100+30)+width()/1000*100)
	genStoreItems();
	// debug.log(event.wheelDelta)
});

storeButton.clicks( () => {
	if(player.onPlanet){
		showStore();
	}

})
// action("inStoreButtonBg", (button) => {
//   if (button.isHovered()){
// 		button.color(ColorPalette.Rufous);
// 	}else{
// 		button.color(ColorPalette.Mahogany);
// 	}
// 	}
// );

// arrow indicator
movementArrow.action(() => {

	movementArrow.angle = arrowRotateFromMouse();
	movementArrow.pos.x = width() / 2 + (Math.sin(movementArrow.angle * (Math.PI / 180))) * 30*playerScale;
	movementArrow.pos.y = height() / 2 + (-1 * Math.cos(movementArrow.angle * (Math.PI / 180))) * 30*playerScale;
	// e.resolve();
});

// map.action(() => {
// 	map.pos = playerGlobalPosition;

// });

// function moveToSlow(x, y, objToMove, speed, delAfter) {
// 	let moveAmountX = -1 * (objToMove.pos.x - x) / speed;
// 	// debug.log(moveAmountX)
// 	let moveAmountY = -1 * (objToMove.pos.y - y) / speed;
// 	let timerreset = 0;
// 	let intervalID = setInterval(function() {
// 		objToMove.pos.x += moveAmountX;
// 		objToMove.pos.y += moveAmountY;
// 		if (++timerreset === speed) {
// 			if (delAfter) {
// 				objToMove.destroy();
// 				// player.passengersSprite.splice(index,1);

// 			}
// 			window.clearInterval(intervalID);
// 		}
// 	}, 10);
// }
action("onShipPass", (todestroy) => {
	// debug.log(todestroy)
	if(todestroy.moving){
		// todestroy.move(player.pos.angle(todestroy.pos), 1000*dt());
		if(todestroy.pos.x >= width()/2-5){
			todestroy.destroy();
		}
	}
});

//reformats the passengers on the ship after people go home
function refomatePassOnShip() {
	every("onShipPass", (todestroy) => {
		if (!todestroy.moving) {
			todestroy.destroy();
		}
	});
	destroyAll("passXtext");
	player.passengersSprite = [];
	// debug.log(player.passengers.length)
	for (let i = 0; i < player.passengers.length; i++) {
		if(i == 18) {
			break;
		}
		let newPassDataShip = player.passengers[i]
		player.passengersSprite.push(add([
			sprite(newPassDataShip.sprite),
			// debug.log((i+1) % 6 * 30 + 15),
			pos((i) % 6 * 30*passengerScale + 15*passengerScale, 50+textLeftModiferHeight*5 + (Math.floor(i / 6) + 1) * 20*passengerScale),
			color(newPassDataShip.color[0], newPassDataShip.color[1], newPassDataShip.color[2]),
			origin("center"),
			area(),
			z(0),
			scale(passengerScale),
			// debug.log(passengerScale),
			layer("game"),
			"passenger",
			"onShipPass",
			{
				moving: false,
			}
		]));

	}
	let passToRenderMany = {
		red:0,
		blue:0,
		white:0,
		green:0,
		face:0,
		rainbow:0,
		spikes:0,
	};
	for (let i = 18; i < player.passengers.length; i++) {
		passToRenderMany[player.passengers[i].destanation] += 1;
	}
	for (let i = 0; i < planets.length; i++) {
		// debug.log(planets[i])
		if(passToRenderMany[planets[i]] > 0){
			let genPassColor = [0, 0, 0];
			let genPassSprite = "passenger";
			let genPassFare = 1;
			switch (planets[i]) {
				case "white":
					genPassColor = [255, 255, 255];
					break;
				case "blue":
					genPassColor = [0, 0, 255];
					break;
				case "red":
					genPassColor = [255, 0, 0];
					break;
				case "green":
					genPassColor = [0, 255, 0];
					break;
				case "rainbow":
					genPassSprite = "passRainbow";
					genPassColor = [255, 255, 255];
					break;
				case "face":
					genPassSprite = "cargoFace";
					genPassColor = [255, 255, 255];
					break;
				case "spikes":
					genPassSprite = "cargoSpikes";
					genPassColor = [255, 255, 255];
					break;
			}
			player.passengersSprite.push(add([
				sprite(genPassSprite),
				pos(15*passengerScale, 50+textLeftModiferHeight*5 + (i + 4) * 20*passengerScale),
				color(genPassColor[0], genPassColor[1], genPassColor[2]),
				origin("center"),
				area(),
				scale(passengerScale),
				// debug.log(passengerScale),
				layer("game"),
				"passenger",
				"onShipPass",
				{
					moving: false,
				}
			]));
			add([
				text("x"+passToRenderMany[planets[i]]),
				pos(15*passengerScale+passengerScale*30, 50+textLeftModiferHeight*5 + (i + 4) * 20*passengerScale),
				scale(passengerScale*2),
				origin("topleft"),
				"passXtext",
			]);
		}
	}
}


player.collides("planet", (planet) => {
	// debug.log("yo");
	if (player.onPlanet) {
		return
	}
	player.speed = 0;
	player.health += 2;
	player.health = Math.min(player.health, 4)
	//why did -1 work
	moveBg(-1 * planet.startingPos[0] + width() / 2, -1 * planet.startingPos[1] + height() / 2, 10);
	player.onPlanet = true;
	//update planet
	player.planetAt = planet.name;
	planetText.text = player.planetAt;

	// debug.log(player.planetAt)


	//add planet ui, store button
	planetUi(true);
	//move pass to ship
	

	if (planets.includes(player.planetAt)) {
		//move ship pass to planet
		let playerPassesToRemove = [];
		for (let i = 0; i < player.passengers.length; i++) {
			if(i == 18){
				break;
			}
			if (player.passengers[i].destanation == player.planetAt) {
				// moveToSlow(width() / 2, height() / 2, player.passengersSprite[i], 25, true);
				player.passengersSprite[i].moving = true;
				// debug.log(player.passengersSprite[i])
				// move(player.pos.angle(todestroy.pos), 1000*dt())
				player.passengersSprite[i].use(move(player.pos.angle(player.passengersSprite[i].pos), 500))
				player.passengersSprite[i].use("moveMeToCenter");
				// debug.log(player.passengersSprite[i].moving)
				playerPassesToRemove.push(i);
				player.money += Math.round(player.baseMoneyPerPass*player.passengers[i].fare);
				// earnMoney(player.baseMoneyPerPass*player.passengers[i].fare, width()/2, height()/2)
				// debug.log(player.passengers[i].fare)
				moneyText.text = largeNumberToConcat(player.money);

			}
		}
		for (let i = 18; i < player.passengers.length; i++) {
			if (player.passengers[i].destanation == player.planetAt) {
				// moveToSlow(width() / 2, height() / 2, player.passengersSprite[i], 25, true);
				// player.passengersSprite[i].moving = true;
				playerPassesToRemove.push(i);
				player.money += Math.round(player.baseMoneyPerPass*player.passengers[i].fare);
				// earnMoney(player.baseMoneyPerPass*player.passengers[i].fare, width()/2, height()/2)
				// debug.log(player.passengers[i].fare)
				moneyText.text = largeNumberToConcat(player.money);

			}
		}

		if(playerPassesToRemove.length >0){
			earnMoney(player.baseMoneyPerPass*player.passengers[playerPassesToRemove[0]].fare*playerPassesToRemove.length, width()/2, height()/2)
		}

		for (let i = playerPassesToRemove.length - 1; i >= 0; i--) {
			player.passengers.splice(playerPassesToRemove[i], 1);

		}
		refomatePassOnShip();
		player.capacity += playerPassesToRemove.length;
		capacityText.text = player.capacity;
		for (let i = 0; i < planetsVars[planets.indexOf(player.planetAt)].passengers.length; i++) {
			let newPassData = planetsVars[planets.indexOf(player.planetAt)].passengers[i]
			add([
				sprite(newPassData.sprite),

				pos(width() / 2 + 20 + 30*passengerScale + i * 30*passengerScale, height() / 2),
				scale(passengerScale),
				color(newPassData.color[0], newPassData.color[1], newPassData.color[2]),
				origin("center"),
				area(),

				layer("game"),
				"passenger",
				"onPlanetPass",

			]);
		}
	}
});

//move passengers into ship
action("onPlanetPass", (passenger) => {
	if (player.capacity > 0) {
		passenger.move(dir(180).scale(player.loadSpeed*dt()*40))
		// passenger.pos.x -= passengerMoveSpeed*dt()*100;
	}
	if(passenger.pos.x <=width()/2){
		// debug.log("asdf")
		//update player object
		player.passengers.push(planetsVars[planets.indexOf(player.planetAt)].passengers[0])
		player.capacity -= 1;
		capacityText.text = player.capacity
		//render in passengerarea

		//reneder for pass in ship
		let newPassDataShip = player.passengers[player.passengers.length - 1]

		refomatePassOnShip()
		//remove passenger from planet
		passenger.destroy()
		planetsVars[planets.indexOf(player.planetAt)].passengers.shift()


		//generate and render new passenger


		generatePassengers(planetsVars[planets.indexOf(player.planetAt)], 1)
		let newPassData = planetsVars[planets.indexOf(player.planetAt)].passengers[planetsVars[planets.indexOf(player.planetAt)].passengers.length - 1]
		add([
			sprite(newPassData.sprite),
			//pos(width() / 2 + 50 + 10 * 30, height() / 2),
			pos(width() / 2 + 10 * 30*passengerScale, height() / 2),
			color(newPassData.color[0], newPassData.color[1], newPassData.color[2]),
			origin("center"),
			scale(passengerScale),
			area(),
			layer("game"),
			"passenger",
			"onPlanetPass"
		]);
	}
});



// collides("planet", "player", () => {

// });

// track distance to count fuel


// calcualte real position of object
function calcRealPos(obj) {
	obj.realPos[0] += (-1 * Math.sin(angleOfMovement * (Math.PI / 180)) * player.speed*dt());
	obj.realPos[1] += (Math.cos(angleOfMovement * (Math.PI / 180)) * player.speed*dt());
	// debug.log(obj.realPos[0])
	// debug.log(obj.realPos[1])
	if (obj.realPos[0] >= (numberOfBackTiles / 2 * blockSize)) {
		obj.realPos[0] = obj.realPos[0] - (numberOfBackTiles * blockSize)
	};

	if (obj.realPos[1] >= (numberOfBackTiles / 2 * blockSize)) {
		obj.realPos[1] = obj.realPos[1] - (numberOfBackTiles * blockSize)
	};

	if (obj.realPos[0] <= -1 * (numberOfBackTiles / 2 * blockSize)) {
		obj.realPos[0] = obj.realPos[0] + (numberOfBackTiles * blockSize)
	};

	if (obj.realPos[1] <= -1 * (numberOfBackTiles / 2 * blockSize)) {
		obj.realPos[1] = obj.realPos[1] + (numberOfBackTiles * blockSize)
	};
}
// was in master

// need a move function this isnt working
function moveBg(x, y, slow) {
	let moveAmountX = (x - player.realPos[0]) / slow
	player.realPos[0] = x
	let moveAmountY = (y - player.realPos[1]) / slow
	player.realPos[1] = y

	let timerreset = 0;
	let intervalID = setInterval(function() {
		every("background", (background) => {
			// debug.log(background.startingPos[0])
			background.pos.x += moveAmountX;
			background.pos.y += moveAmountY;
			// debug.log(background.startingPos[0])
		})
		every("planet", (planet) => {
			// planet.pos.x = planet.startingPos[0] + x;
			// planet.pos.x = planet.startingPos[1] + y;
			planet.realPos[0] += moveAmountX;
			planet.realPos[1] += moveAmountY;

		})
		every("alien", (planet) => {
			// planet.pos.x = planet.startingPos[0] + x;
			// planet.pos.x = planet.startingPos[1] + y;
			planet.realPos[0] += moveAmountX;
			planet.realPos[1] += moveAmountY;

		})
		if (++timerreset === slow) {
			window.clearInterval(intervalID);
		}
	}, 10);
}

action("background", (background) => {
	background.pos.x += (-1 * Math.sin(angleOfMovement * (Math.PI / 180)) * player.speed*dt());
	background.pos.y += (Math.cos(angleOfMovement * (Math.PI / 180)) * player.speed*dt());
	if (background.pos.x >= (numberOfBackTiles / 2 * blockSize) + width() / 2) {
		background.pos.x = background.pos.x - (numberOfBackTiles * blockSize)
	} else if (background.pos.x <= -1 * (numberOfBackTiles / 2 * blockSize) + width() / 2) {
		background.pos.x = background.pos.x + (numberOfBackTiles * blockSize)
	}
	if (background.pos.y >= (numberOfBackTiles / 2 * blockSize) + height() / 2) {
		background.pos.y = background.pos.y - (numberOfBackTiles * blockSize)
	} else if (background.pos.y <= -1 * (numberOfBackTiles / 2 * blockSize) + height() / 2) {
		background.pos.y = background.pos.y + (numberOfBackTiles * blockSize)
	}


	// background.pos.x = background.pos.x % (26 * blockSize);
	// background.pos.y = background.pos.y % (26 * blockSize);
});

action("planet", (planet) => {
	calcRealPos(planet);

	if (planet.realPos[0] <= 0) {
		planet.pos.x = 0;
	} else if (planet.realPos[0] >= width()) {
		planet.pos.x = width();
	} else {
		planet.pos.x = planet.realPos[0];
	};

	if (planet.realPos[1] <= 0) {
		planet.pos.y = 0;
	} else if (planet.realPos[1] >= height()) {
		planet.pos.y = height();
	} else {
		planet.pos.y = planet.realPos[1];
	};

	// debug.log(planet.pos.x !== planet.realPos[0] || planet.pos.y !== planet.realPos[1])
	
  // TODO: update to allow for individual planet scaling
  // TODO: make animation gradual
	if (planet.pos.x !== planet.realPos[0] || planet.pos.y !== planet.realPos[1]) {
		planet.scaleTo(planetScale * planet.size / 2);
	} else {
		planet.scaleTo(planetScale * planet.size);
	}

});

function sum(a, offset) {
	var s = a[0] + a[1] * offset
	return s;
}


function degToRad(a) {
	return Math.PI / 180 * a;
}

function meanAngleDeg(a, offset) {
	let resultAngle = Math.round((180 / Math.PI * Math.atan2(
		sum(a.map(degToRad).map(Math.sin), offset) / (offset + 1),
		sum(a.map(degToRad).map(Math.cos), offset) / (offset + 1)
	)) * 100000) / 100000
	if(isNaN(resultAngle)){
		debug.log("nan MeanAngle")
		return a[0]
	}
	return resultAngle;
	// return (180 / Math.PI * Math.atan2(
	// 	sum(a.map(degToRad).map(Math.sin), offset) / (offset + 1),
	// 	sum(a.map(degToRad).map(Math.cos), offset) / (offset + 1)
	// ))
}

keyDown("space", () => {
  player.boosting = true;
});
keyRelease("space", () => {
  player.boosting = false;
});


action("player", () => {
	// debug.log(angleOfMovement);
	if (player.speed > 0) {
		if(player.boosting){
			player.speed = Math.min(player.speed + player.acceleration, player.max_thrust);			
		}else{
			player.speed = Math.min(player.speed + player.acceleration, Math.max(player.max_thrust/2),350);	
		}

	}
	speedText.text = Math.round(player.speed);
	//new movement system
	// debug.log(angleOfMovement)
	//does the dt work?
	angleOfMovement = meanAngleDeg([movementArrow.angle, angleOfMovement],player.handling*.3/dt());
	// debug.log(Math.round(.3/dt()))
	player.angle = angleOfMovement;
	calcRealPos(player)
	// debug.log(player.realPos)

})

function generatePassengers(planet, ammount) {

	if (planets.includes(planet.name)) {
		// debug.log(planets)
		let otherPlanets = planets.slice();
		// debug.log(planet.name)
		otherPlanets.splice(planets.indexOf(planet.name), 1)
		// if(planet.name == "red"){
		// 	debug.log(otherPlanets)
		// }
		// debug.log(otherPlanets)
		for (let i = 0; i < ammount; i++) {

			let generatedPassId = Math.floor(Math.random() * otherPlanets.length);
			let genPassColor = (0, 0, 0);
			let genPassSprite = "passenger";
			let genPassFare = 1;
			switch (otherPlanets[generatedPassId]) {
				case "white":
					genPassColor = [255, 255, 255];
					break;
				case "blue":
					genPassColor = [0, 0, 255];
					break;
				case "red":
					genPassColor = [255, 0, 0];
					break;
				case "green":
					genPassColor = [0, 255, 0];
					break;
				case "rainbow":
					genPassSprite = "passRainbow";
					genPassColor = [255, 255, 255];
					genPassFare = 10;
					break;
				case "face":
					genPassSprite = "cargoFace";
					genPassColor = [255, 255, 255];
					genPassFare = 50;
					break;
				case "spikes":
					genPassSprite = "cargoSpikes";
					genPassColor = [255, 255, 255];
					genPassFare = 500;
					break;
			}
			planet.passengers.push({
				destanation: otherPlanets[generatedPassId],
				color: genPassColor,
				sprite: genPassSprite,
				fare:genPassFare,
			})
		}
	}
// was in master

}

let onStart = () => {
	every("background", (background) => {
		background.startingPos[0] = background.pos.x;
		background.startingPos[1] = background.pos.y;
	})
	every("planet", (planet) => {
		generatePassengers(planet, 10)
	})
	player.onPlanet = true;
	planetUi(true);
	moveBg(width() / 2, height() / 2, 1)
	for(let i = 0; i < 35; i++){
		spawnAlien()
	}
}



onStart()

});


scene("menu", () => {
	add([
		area(),
		solid(),
		color(50,50,50),
		pos(
			0,
			0),
		z(0),
		rect(width(), height()),
		scale(mapScale),
		layer("store"),
		origin("topleft"),
		{
			storeOpen: false,
		},
	]);
	add([
		text("Solar Taxicab"),
		pos(width()/2, fontSize*textLeftModifer*20),
		origin("top"),
		scale(fontSize*textLeftModifer*4),
	]);

	add([
		rect(width()/3, fontSize*textLeftModifer*30),
		area(),
		pos(width()/2, fontSize*textLeftModifer*100),
		origin("top"),
		color(0,0,0,),
		"button",
		{
			clickAction: () => go('game'),
		},
	]);

	add([
		text("Play game"),
		origin("top"),
		pos(width()/2, fontSize*textLeftModifer*108),
		scale(fontSize*textLeftModifer*1.2),
	]);

	add([
		rect(width()/3, fontSize*textLeftModifer*30),
		area(),
		pos(width()/2, fontSize*textLeftModifer*150),
		origin("center"),
		"button",
		{
			clickAction: () => window.open('https://replit.com/@theohalpern/Solar-Taxicab?v=1',"_blank"),
		},
	]);

	add([
		text("See on Repl.it"),
		scale(fontSize*textLeftModifer*1.2),
		pos(width()/2, fontSize*textLeftModifer*150),
		origin("center"),
	]);

	action("button", (b) => {
	// 	  "zest": [233, 216, 166],
  // 		"orange": [238, 155, 0],
  // 		"rust":[202, 103, 2],
		if (b.isHovering()) {
			b.use(color(202, 103, 2));
		} else {
			b.use(color(238, 155, 0));
		}

		// if (b.isClicked()) {
		// 	b.clickAction();
		// }

	});

	clicks("button", b => {
		b.clickAction();
	});


});

go("menu");