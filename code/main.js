import kaboom from "kaboom";

import { moneyConcatenateString, moneyScientificString } from "./util/moneyUtil";

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

let planetsVars = [];

let angleOfMovement = 0;
// scale by screen size
const mapScale = 1.5;
const planetScale = 1.5;
const blockSize = 64 * mapScale;
const numberOfBackTiles = 48;

let planets = [
  "white",
	"red",
	"blue",
	"green",]


import { generateMap, generateLayers } from "./mapGenerator";

generateLayers();
generateMap();

import { addBasePlanet } from "./planetGenerator";

const planetHome = addBasePlanet();


import { loadPlayer, loadMovementArrow } from "./player";

let movementArrow = loadMovementArrow();
export let player = loadPlayer();

movementArrow.play("spin");
player.play("thrust");



function arrowRotateFromMouse() {
	mouseRotationToSend = (Math.atan((mousePos().y - height() / 2) / (mousePos().x - width() / 2)) * 180 / Math.PI) - 90;
	if ((mousePos().x - width() / 2) >= 0) {
		mouseRotationToSend = (Math.atan((mousePos().y - height() / 2) / (mousePos().x - width() / 2)) * 180 / Math.PI) + 90;
	}
	return mouseRotationToSend;
}


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