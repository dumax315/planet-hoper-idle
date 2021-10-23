import kaboom, { Character } from "kaboom";

import { k, playerScale } from "./main.js";


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
		text("Click anywhere to launch"),
		scale(width()/400),
    rotate(0),
    area(),
    layer("ui"),
    origin("center"),
    "tutorialOne",
  ]);
  action("tutorialOne", () => {
		if (mouseIsClicked()) {
			every("tutorialOne", (t) => {t.use(lifespan(0.5, { fade: 0.5 }),)});
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
		text("Hold space to boost speed\n(buy upgrades in the Store)"),
    rotate(0),
		scale(width()/400),
    area(),
    layer("ui"),
    origin("center"),
    "tutorial2",
  ]);
  action("tutorial2", () => {
		if (keyIsPressed("space")) {
			every("tutorial2", (t) => {t.use(lifespan(2, { fade: 0.5 }),)});
			setTimeout(loadTutorial3(), 2000);
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
			every("tutorial3", (t) => {t.use(lifespan(0.5, { fade: 0.5 }),)});
		}
	});
}