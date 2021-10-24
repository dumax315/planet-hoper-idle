import kaboom, { Character } from "kaboom";

import { k, playerScale } from "./main.js";

let firstPlanet;
export function loadTutorialOne(): void {
	add([
    rect(width()*.7,width()/12),
    pos(width() / 2, height()*.8),
    rotate(0),
    area(),
		color(238, 155, 0),
    layer("ui"),
    origin("center"),
    "tutorialOne",
  ]);
	add([
    pos(width() / 2, height()*.8),
		text("Press space to launch"),
		scale(width()/400),
    rotate(0),
    area(),
    layer("ui"),
    origin("center"),
    "tutorialOne",
  ]);
  action("tutorialOne", () => {
		if (keyIsPressed("space") ){
			destroyAll("tutorialOne");
			loadTutorial2()
		}
	});
}

export function loadTutorial2(): void {
	add([
    rect(width()*.7,width()/12),
    pos(width() / 2, height()*.8),
    rotate(0),
    area(),
		color(238, 155, 0),
    layer("ui"),
    origin("center"),
    "tutorial2",
  ]);
	add([
    pos(width() / 2, height()*.8),
		text("Hold space to boost speed"),
    rotate(0),
		scale(width()/400),
    area(),
    layer("ui"),
    origin("center"),
    "tutorial2",
  ]);
  action("tutorial2", () => {
		if (keyIsPressed("space")) {
			destroyAll("tutorial2");
			loadTutorial3();
		}
	});
}

export function loadTutorial3() {
	add([
    rect(width()*.7,width()/12),
    pos(width() / 2, height()*.8),
    rotate(0),
    area(),
		color(238, 155, 0),
    layer("ui"),
    origin("center"),
    "tutorial3",
  ]);
	add([
    pos(width() / 2, height()*.8),
		text("Click to shoot while flying"),
    rotate(0),
		scale(width()/400),
    area(),
    layer("ui"),
    origin("center"),
    "tutorial3",
  ]);
  action("tutorial3", () => {
		if (mouseIsClicked()) {
			destroyAll("tutorial3");
			loadTutorial4()
		}
	});
}

export function loadTutorial4() {
	add([
    rect(width()*.7,width()/12),
    pos(width() / 2, height()*.8),
    rotate(0),
    area(),
		color(238, 155, 0),
    layer("ui"),
    origin("center"),
    "tutorial4",
  ]);
	add([
    pos(width() / 2, height()*.8),
		text("Go to a Planet \n Pick Up Passengers"),
    rotate(0),
		scale(width()/400),
    area(),
    layer("ui"),
    origin("center"),
    "tutorial4",
  ]);
  action("tutorial4", () => {
		if(player.onPlanet && "home" != player.planetAt) {
			firstPlanet = player.planetAt;
			destroyAll("tutorial4");
			loadTutorial5();
		}
	});
}

export function loadTutorial5() {
	add([
    rect(width()*.7,width()/12),
    pos(width() / 2, height()*.8),
    rotate(0),
    area(),
		color(238, 155, 0),
    layer("ui"),
    origin("center"),
    "tutorial5",
  ]);
	add([
    pos(width() / 2, height()*.8),
		text("Go to another Planet \n Drop Off Passengers"),
    rotate(0),
		scale(width()/400),
    area(),
    layer("ui"),
    origin("center"),
    "tutorial5",
  ]);
  action("tutorial5", () => {
		if(player.onPlanet && firstPlanet != player.planetAt && "home" != player.planetAt) {
			destroyAll("tutorial5");
			loadTutorial6();
		}
	});
}

export function loadTutorial6() {
	add([
    rect(width()*.7,width()/12),
    pos(width() / 2, height()*.8),
    rotate(0),
    area(),
		color(238, 155, 0),
    layer("ui"),
		lifespan(6, { fade: 0.5 }),
    origin("center"),
    "tutorial6",
  ]);
	add([
    pos(width() / 2, height()*.8),
		text("Don't forget to buy upgrades\nShop is availbe at planets"),
    rotate(0),
		scale(width()/400),
    area(),
    layer("ui"),
    origin("center"),
		lifespan(8, { fade: 0.5 }),
    "tutorial6",
  ]);
}