import { Vec2 } from "kaboom";

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

export function getVectorWithinDistance(vec1: Vec2, vec2: Vec2, dist: number) {
  if (
    betweenRange(vec1.x, vec2.x, dist) && 
    betweenRange(vec1.y, vec2.x, dist)
    ) {
      return true;
  } else { return false; }
}

export function getRandomPlanetPositionArray(planetCount: number, xBound: number, yBound: number) {
  let planetPositions: Vec2[] = [];

  for (let i = 0; i < planetCount; i++) {
    let planetPos: Vec2 = vec2(
      Math.floor(0 + Math.random() * (xBound + 1)),
      Math.floor(0 + Math.random() * (yBound + 1)));

    for (let pos in planetPositions) {
      pos
    }

  }
  return planetPositions
}

