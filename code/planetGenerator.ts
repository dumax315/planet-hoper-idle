import kaboom from "kaboom";
import { k } from "./main.js";
import * as planetUtil from "./util/planetUtil";

let planetScale = 1.5;

let planetCount = 8;

let planetMinBufferSpacing = 5;

let planetObjectArray = [];

let planetScaleArray = planetUtil.getRandomPlanetScaleArray(planetCount);
let planetPosArray = planetUtil.getRandomPlanetPositionArray(planetCount, 48, 48, planetMinBufferSpacing);