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

import * as colorUtil from "./util/colorUtil";
import * as planetUtil from "./util/planetUtil";
import { loadAssets } from "./util/assetLoader";

loadAssets();

let fontSize = 2;

let planetsVars = [];

let angleOfMovement = 0;
// scale by screen size
const mapScale = 1.5;
const planetScale = 1.5;
const blockSize = 64 * mapScale;
const backgroundSize = 64 * mapScale * 6;
const numberOfBackTiles = 48;

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
	"store",]
  , "game");


import { generateMap } from "./mapGenerator";

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
    realPos: [12 * blockSize, 6 * blockSize],
    startingPos: [12 * blockSize, 6 * blockSize],
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
		// debug.log(player.realPos),
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
				2 * blockSize+player.realPos[0],
				2 * blockSize+player.realPos[1]],
			startingPos: [
				2 * blockSize,
				2 * blockSize],
			name: "rainbow",
			passengers: [],
			size: 1,
		},
	]));
	planets.push("rainbow");
	}
	generatePassengers(planetsVars[planetsVars.length-1], 10);
	player.z = 100;
	every("planet", (planet) => {
		planet.passengers = [];
		generatePassengers(planet, 10)
	})
	// move(width() / -2, height() / -2, 1)
}

import { loadPlayer, loadMovementArrow } from "./player";
// load objects
movementArrow = loadMovementArrow();
player = loadPlayer();

movementArrow.play("spin");
player.play("thrust");

//ui
//planet indicator
let textLeftModifer = width()/1000;
let textLeftModiferHeight = width()*.025;
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
	text(player.money, 8),
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
	area(),
	solid(),
	color(28,71,88),
	opacity(0),
	pos(
		width()-20,
		20),
	// text("Store"),
	rect(width()/6, width()/1000*50),
	scale(mapScale),
	layer("store"),
	origin("topright"),
	"button",
	"atPanetUi",
	"storeButton",
	{

	},
]);

const storeText = add([
  text("Store"),
  pos(240, 180),
  // color(0, 0, 0),
	layer("store"),
	scale(width()/1000*3*fontSize),
	origin("topright"),
	"atPanetUi",
	"storeButton",
	pos(
		width()-20,
		20),
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
		name:"Upgrade Max Speed",
		id:1,
		amountBought:0,
		cost: 200,
		max:40,
		functionToRun: () => {
			player.max_thrust += 20;
		},
	},{
		name:"Upgrade Acceleration",
		id:2,
		amountBought:0,
		cost: 200,
		max:20,
		functionToRun: () => {
			player.acceleration *= 1.1
		},
	},{
		name:"Upgrade Money/Passenger",
		id:3,
		amountBought:0,
		cost: 100,
		functionToRun: () => {
			player.baseMoneyPerPass *= 1.2;
		},
	},{
		name:"Upgrade Fill Speed",
		id:4,
		amountBought:0,
		cost: 300,
		max:20,
		functionToRun: () => {
			player.loadSpeed = Math.round(player.loadSpeed*1.2);
		},
	},{
		name:"Unlock Planets",
		id:5,
		amountBought:0,
		cost: "prog",
		costProgression: [100, 100, 100,100],
		costProgression: [5000, 50000, 50000,5000000],
		max:4,
		functionToRun: () => {
			buyPlanets()
		},
	},{
		name:"Upgrade Handling",
		id:6,
		amountBought:0,
		cost: 200,
		// costProgression: [5000, 50000, 50000,5000000],
		max:20,
		functionToRun: () => {
			// player.handling 
			player.handling *= .9;
		},
	},
];
let storeButtonSprites = [];
//gereate store item
function genStoreItems() {
	
	//Shows currentMoney in Store 
	add([
		text("Money:"),
		scale(width()/1000*3.5),
		pos(5, 50+textLeftModiferHeight*5),
		origin("topleft"),
		layer("store"),
		"currentMoneyInStore",
		"inStoreButton",
	]);
	add([
		text(player.money),
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
				text(genPrice(storeData[i],storeData[i].amountBought)),
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


let storeButX = (width()-20)-(width()/6)*mapScale;
let storeButY = (20+width()/1000*50)*mapScale;
//its about drive
//get click for lounch 
mouseClick( () => {
	// debug.log(mousePos().x +"+"+storeButX)
	if(!((mousePos().x > storeButX && mousePos().y < storeButY) && player.onPlanet)){
		launch()
	}
	// angleOfMovement = movementArrow.angle;

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
		storeData[button.idbuy].functionToRun();
		storeData[button.idbuy].amountBought++;
		moneyText.text = player.money;
		destroyAll("inStoreButton");
		storeButtonSprites = [];
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
	movementArrow.pos.x = width() / 2 + (Math.sin(movementArrow.angle * (Math.PI / 180))) * 60;
	movementArrow.pos.y = height() / 2 + (-1 * Math.cos(movementArrow.angle * (Math.PI / 180))) * 60;
	// e.resolve();
});

// map.action(() => {
// 	map.pos = playerGlobalPosition;

// });

function moveToSlow(x, y, objToMove, speed, delAfter) {
	let moveAmountX = -1 * (objToMove.pos.x - x) / speed;
	// debug.log(moveAmountX)
	let moveAmountY = -1 * (objToMove.pos.y - y) / speed;
	let timerreset = 0;
	let intervalID = setInterval(function() {
		objToMove.pos.x += moveAmountX;
		objToMove.pos.y += moveAmountY;
		if (++timerreset === speed) {
			if (delAfter) {
				objToMove.destroy();
				// player.passengersSprite.splice(index,1);

			}
			window.clearInterval(intervalID);
		}
	}, 10);
}

//reformats the passengers on the ship after people go home
function refomatePassOnShip() {
	every("onShipPass", (todestroy) => {
		if (!todestroy.moving) {
			todestroy.destroy();
		}
	});
	// debug.log(player.passengers.length)
	for (let i = 0; i < player.passengers.length; i++) {
		let newPassDataShip = player.passengers[i]
		player.passengersSprite.push(add([
			sprite(newPassDataShip.sprite),
			// debug.log((i+1) % 6 * 30 + 15),
			pos((i) % 6 * 30 + 15, 50+textLeftModiferHeight*5 + (Math.floor(i / 6) + 1) * 20),
			color(newPassDataShip.color[0], newPassDataShip.color[1], newPassDataShip.color[2]),
			origin("center"),
			area(),
			layer("game"),
			"passenger",
			"onShipPass",
			{
				moving: false,
			}
		]));
	}
}
//Todo: make it only show the amount from each


player.collides("planet", (planet) => {
	// debug.log("yo");
	if (player.onPlanet) {
		return
	}
	player.speed = 0;

	//why did -1 work
	move(-1 * planet.startingPos[0] + width() / 2, -1 * planet.startingPos[1] + height() / 2, 10);
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
			if (player.passengers[i].destanation == player.planetAt) {
				moveToSlow(width() / 2, height() / 2, player.passengersSprite[i], 25, true);
				player.passengersSprite[i].moving = true;
				playerPassesToRemove.push(i);
				player.money += Math.round(player.baseMoneyPerPass*player.passengers[i].fare);
				// debug.log(player.passengers[i].fare)
				moneyText.text = player.money;

			}
		}

		for (let i = playerPassesToRemove.length - 1; i >= 0; i--) {
			player.passengers.splice(playerPassesToRemove[i], 1);

		}
		player.passengersSprite = []
		refomatePassOnShip();
		player.capacity += playerPassesToRemove.length;
		capacityText.text = player.capacity;
		for (let i = 0; i < planetsVars[planets.indexOf(player.planetAt)].passengers.length; i++) {
			let newPassData = planetsVars[planets.indexOf(player.planetAt)].passengers[i]
			add([
				sprite(newPassData.sprite),

				pos(width() / 2 + 50 + i * 30, height() / 2),
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
		player.passengersSprite.push(add([
			sprite(newPassDataShip.sprite),

			pos((player.passengers.length - 1) % 6 * 30 + 15, 50+textLeftModiferHeight*5 + (Math.floor((player.passengers.length - 1) / 6) + 1) * 20),
			color(newPassDataShip.color[0], newPassDataShip.color[1], newPassDataShip.color[2]),
			origin("center"),
			area(),
			layer("game"),
			"passenger",
			"onShipPass",
			{
				moving: false,
			}
		]));

		//remove passenger from planet
		passenger.destroy()
		planetsVars[planets.indexOf(player.planetAt)].passengers.shift()


		//generate and render new passenger


		generatePassengers(planetsVars[planets.indexOf(player.planetAt)], 1)
		let newPassData = planetsVars[planets.indexOf(player.planetAt)].passengers[planetsVars[planets.indexOf(player.planetAt)].passengers.length - 1]
		add([
			sprite(newPassData.sprite),
			//pos(width() / 2 + 50 + 10 * 30, height() / 2),
			pos(width() / 2 + 10 * 30, height() / 2),
			color(newPassData.color[0], newPassData.color[1], newPassData.color[2]),
			origin("center"),
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
let move = (x, y, slow) => {
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
	return 180 / Math.PI * Math.atan2(
		sum(a.map(degToRad).map(Math.sin), offset) / (offset + 1),
		sum(a.map(degToRad).map(Math.cos), offset) / (offset + 1)
	);
}


action("player", () => {
	if (player.speed > 0) {
		player.speed = Math.min(player.speed + player.acceleration, player.max_thrust);
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
				//add in ranbow
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

export let onStart = () => {
	every("background", (background) => {
		background.startingPos[0] = background.pos.x;
		background.startingPos[1] = background.pos.y;
	})
	every("planet", (planet) => {
		generatePassengers(planet, 10)
	})
	move(width() / 2, height() / 2, 1)
}



onStart()