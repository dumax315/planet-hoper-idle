import kaboom, { Character } from "kaboom";

import { k, playerScale } from "./main.js";



export function loadPlayer(): void {
  return add([
    sprite("ship_1"),
    pos(width() / 2, height() / 2),
    rotate(0),
    scale(playerScale),
    area(),
    layer("game"),
    origin("center"),
    "player",
		z(2),
    {
      speed: 0,
      max_thrust: 340,
      acceleration: 1.5,
      deceleration: 4,
      animation_frame: 0,
      money: 100,
      capacityMax: 14,
      capacity: 14,
      passengers: [],
      realPos: [0, 0],
      onPlanet: false,
      startingPos: [width() / 2, height() / 2],
      passengersSprite: [],
      planetAt: "home",
      anim: "thrust",
      loadSpeed: 400,
      baseMoneyPerPass: 50,
			handling: 2,
			bulletSpeed:450,
			moneyPerAlien:50,
			health: 3,
    }
  ]);
}

export function loadMovementArrow(): void {
  return add([
    sprite("arrow_1"),
    pos(40, 80),
    rotate(0),
    scale(playerScale*1.3),
    layer("game"),
    origin("center"),
    "arrow",
    {
      animation_frame: 0,
      anim: "spin",
    },
  ]);
}
