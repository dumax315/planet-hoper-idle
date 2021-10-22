import kaboom from "kaboom";

import * as planetUtil from "./util/planetUtil";


let planetCount = 8;
let planetMinBufferSpacing = 5;
let planetObjectArray = [];
let planetScaleArray = planetUtil.getRandomPlanetScaleArray(planetCount);
let planetPosArray = planetUtil.getRandomPlanetPositionArray(planetCount, );