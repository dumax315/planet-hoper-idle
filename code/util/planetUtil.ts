import { Vec2 } from "kaboom";
import { k } from "../main";

import * as kaboomUtil from "./kaboomUtil";


//its lower case
//https://kaboomjs.com/#vec2
// yea but you need the interface import 
// the lowercase one is the obejct
import {
  ColorPalette,
  ColorPaletteAlias
} from "./colorUtil";


/*export*/ function betweenRange(a: number, b: number, range: number): boolean {
  return Math.abs(a - b) <= range;
}

export function getRandomPlanet(): string {
  return "planet_" + (1 + Math.floor(Math.random() * 3));
}


export function getRandomPaletteColorList(): number[] {
  return ColorPalette[
    Object.keys(ColorPalette)[
    (Math.floor(Math.random() * Object.keys(ColorPalette).length))]];
}

export function getRandomPaletteColor() : string {
  return Object.keys(ColorPalette)[
    (Math.floor(Math.random() * Object.keys(ColorPalette).length))];
}

export function getRandomPlanetScaleArray(planetCount: number): number[] {
  let planetScales = [];
  for (let i = 0; i < planetCount; i++) {
    planetScales.push(Math.floor(0.35 + Math.random() * 1.5));
  }
  return planetScales;
}

export function getVectorDistance(vec1: Vec2, vec2: Vec2) {
  return (
    Math.sqrt(
      Math.pow((vec1.x + vec2.x), 2) +
      Math.pow((vec1.x + vec2.x), 2)
    ));
}

function getVectorDistanceEstimate(vec1, vec2) {}

export function getVectorWithinDistance(vec1: Vec2, vec2: Vec2, dist: number): boolean {
  try {
    if (
    betweenRange(vec1.x, vec2.x, dist) && 
    betweenRange(vec1.y, vec2.x, dist)
    ) {
      return true;
  } else { return false; }
  } catch { debug.log("Received an undefined vector") }
}

export function getRandomPlanetPositionArray(
  planetCount: number, 
  xBound: number, 
  yBound: number, 
  bufferDistance: number): Vec2[] {
  let planetPositions: Vec2[] = [
    vec2( /*propagate list with one value*/
      Math.floor(0 + Math.random() * (xBound + 1)),
      Math.floor(0 + Math.random() * (yBound + 1)))
  ];

  debug.log(planetPositions[0][0] + ", " + planetPositions[0][1]);

  loopFill:
    while (planetPositions.length < planetCount) {
      let tempPlanetPos: Vec2 = k.vec2(
        Math.floor(0 + Math.random() * (xBound + 1)),
        Math.floor(0 + Math.random() * (yBound + 1)));
      loopTestFor:
        for (let j = 0; j <= planetPositions.length; j++) {
          debug.log(kaboomUtil.vec2ToString(tempPlanetPos))
          if (getVectorWithinDistance(tempPlanetPos, planetPositions[j], bufferDistance)) {
            break loopTestFor; }}
        planetPositions.push(tempPlanetPos); 
    }
  return planetPositions;
}

//planet name generation function?

export const PlanetNames = {
  "black": "Black",
  "blue": "Blue",
  "green": "Green",
  "foam": "Foam",
  "zest": "Zest",
  "orange": "Orange",
  "rust": "Rust",
  "sunset": "Sunset",
  "red": "Red",
  "maroon": "Maroon",
}

// let planetArray = getRandomPlanetPositionArray(8, 48, 48, 5);
// for (let item in planetArray) {
//   console.log(item);
// }
