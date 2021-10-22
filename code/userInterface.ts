import kaboom, { Origin, TextCompConf } from "kaboom";
import { k, player } from "./main.js";

import { moneyScientificString } from "./util/moneyUtil";
import { mapScale } from "./mapGenerator";

let fontSize = 2;

let textLeftModifer = width()/1000;
let textLeftModiferHeight = width()*.025;


function addPlayerStatInfo() {
  add([
    text("Planet: ", <TextCompConf>{size:8}),
    scale(fontSize * textLeftModifer),
    pos(5, 50),
    origin(<Origin>"topleft"),
    layer("ui"),
  ]);
}

// planetText
export function addPlayerStat() {
  return add([
    text(player.planetAt, <TextCompConf>{size:8}),
    scale(fontSize * textLeftModifer),
    pos(120*textLeftModifer, 50+textLeftModiferHeight*0),
    origin(<Origin>"topleft"),
    layer("ui"),
  ]);
}
  



//money indicator
add([
	text("Money:", <TextCompConf>{size:8}),
	scale(fontSize * textLeftModifer),
	pos(5, 50+textLeftModiferHeight*1),
	origin(<Origin>"topleft"),
	layer("ui"),
]);

const moneyText = add([
	text(moneyScientificString(player.money), <TextCompConf>{size:8}),
	scale(fontSize * textLeftModifer),
	pos(100*textLeftModifer, 50+textLeftModiferHeight*1),
	origin("topleft"),
	layer("ui"),
]);

//speed
add([
	text("Speed: ", <TextCompConf>{size:8}),
	scale(fontSize*textLeftModifer),
	pos(5, 50+textLeftModiferHeight*2),
	origin("topleft"),
	layer("ui"),
]);

const speedText = add([
	text(player.speed, <TextCompConf>{size:8}),
	scale(fontSize*textLeftModifer),
	pos(100*textLeftModifer, 50+textLeftModiferHeight*2),
	origin("topleft"),
	layer("ui"),
]);

//capacity
function addCapacityStatInfo() {
  add([
	text("Capacity:", <TextCompConf>{size:8}),
	scale(fontSize*textLeftModifer),
	pos(5, 50+textLeftModiferHeight*3),
	origin("topleft"),
	layer("ui"),
]);
}


// capacityStatText
export function addCapacityStat () {
  return add([
    text(player.capacity, <TextCompConf>{size:8}),
    scale(fontSize*textLeftModifer),
    pos(150*textLeftModifer, 50+textLeftModiferHeight*3),
    origin("topleft"),
    layer("ui"),
  ]);
}


function addPassengerStatInfo() {
  add([
    text("Passengers:", <TextCompConf>{size:8}),
    scale(fontSize*textLeftModifer),
    pos(5, 50+textLeftModiferHeight*4),
    origin("topleft"),
    layer("ui"),
  ]);
}



export function initUserInterfaceInfo() {
  addPlayerStatInfo();
  addPassengerStatInfo();
  
};

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
		max:20,
		functionToRun: () => {
			player.acceleration *= 1.1
		},
	},{
		name:"Upgrade Money/Passenger",
		id:4,
		amountBought:0,
		cost: 100,
		functionToRun: () => {
			player.baseMoneyPerPass *= 1.05;
		},
	},{
		name:"Upgrade Boarding Speed",
		id:5,
		amountBought:0,
		cost: 300,
		max:20,
		functionToRun: () => {
			player.loadSpeed = Math.round(player.loadSpeed*1.2);
		},
	},{
		name:"Unlock Planets",
		id:6,
		amountBought:0,
		cost: "prog",
		costProgression: [100, 100, 100, 100],
		costProgression: [5000, 50000000, 5000000000000,5000000000000000],
		max:4,
		functionToRun: () => {
			buyPlanets()
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
				text(<string><any>storeData[i].amountBought),
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



export function showStore(){
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

export function planetUI (isOn: boolean){
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

//launch code
export function launch() {
	if(storeBg.storeOpen){
		return;
	}
	if(player.onPlanet){
		player.speed = 1;
		player.onPlanet = false;
		planetUI(false);
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