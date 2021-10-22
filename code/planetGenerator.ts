import { Character } from "kaboom";
import { Vec2N, vec2N } from "./util/kaboomUtil";
import k  from "./main.js";
import * as planetUtil from "./util/planetUtil";
import { mapScale } from "./mapGenerator";
import { PassengerData, generatePassengers } from "./passenger";


export let planetNames = [
  "white",
	"red",
	"blue",
	"green",
  ];

const blockSize = 64 * mapScale;

const planetScale = 1.5;

// let planetCount = 8;

// let planetMinBufferSpacing = 5;

let planetObjectArray = [];

// let planetScaleArray = planetUtil.getRandomPlanetScaleArray(planetCount);
// let planetPosArray = planetUtil.getRandomPlanetPositionArray(planetCount, 48, 48, planetMinBufferSpacing);

type PlanetData = {
  realPos: Vec2N;
  startingPos: Vec2N;
  name: string;
  passengers: PassengerData[];
  size: number;
};

let homeAttributes: PlanetData = {
  realPos: vec2N(0,0),
  startingPos: vec2N(0,0),
  name: "Home",
  passengers: [],
  size: 1,
};

export function addBasePlanet(): Character {
  return k.add([
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
      homeAttributes,
    },
  ]);
}

// planetObjectArray.push(
//   add([])
// )

export let planetsVars = [];

planetsVars.push(k.add([
// was in experimental
  k.sprite("planetWhite"),
  main.area(),
  main.solid(),
  // color(255,0,0),
  main.pos(
    30 * blockSize,
    15 * blockSize),
  main.color(),
  main.scale(planetScale),
  main.layer("game"),
  main.origin("center"),
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

// planetsVars.push(main.add([
//   sprite("planetWhite"),
//   area(),
//   solid(),
//   color(255, 0, 0),
//   pos(12 * blockSize, 6 * blockSize),
//   scale(planetScale),
//   layer("game"),
//   origin("center"),
//   "planet",
//   {
//     realPos: [12 * blockSize, 6 * blockSize],
//     startingPos: [12 * blockSize, 6 * blockSize],
//     name: "red",
//     passengers: [],
//     size: 1,
//   },
// ]));

// planetsVars.push(add([
//   sprite("planetWhite"),
//   area(),
//   solid(),
//   color(0, 0, 255),
//   rotate(90),
//   pos(15 * blockSize, 40 * blockSize),
//   scale(planetScale),
//   layer("game"),
//   origin("center"),
//   "planet",
//   {
//     realPos: [
//       15 * blockSize,
//       20 * blockSize],
//     startingPos: [15 * blockSize, 20 * blockSize],
//     name: "blue",
//     passengers: [],
//     size: 1,
//   },
// ]));

// planetsVars.push(add([
//   sprite("planetWhite"),
//   area(),
//   solid(),
//   color(0, 255, 0),
//   rotate(90),
//   pos(
//     15 * blockSize,
//     40 * blockSize),
//   scale(planetScale),
//   layer("game"),
//   origin("center"),
//   "planet",
//   {
//     realPos: [
//       7 * blockSize,
//       12 * blockSize],
//     startingPos: [
//       7 * blockSize,
//       12 * blockSize],
//     name: "green",
//     passengers: [],
//     size: 1,
//   },
// ]));


function buyPlanets() {
	// debug.log(planetsVars.length)
	if(planetsVars.length == 4){
		planetsVars.push(add([
		sprite("rainBowPlanet"),
		area(),
		solid(),
		// color(0, 255, 0),
		// rotate(90),
		// debug.log(main.player.realPos),
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
				2 * blockSize + main.player.realPos[0],
				2 * blockSize + main.player.realPos[1]],
			startingPos: [
				2 * blockSize,
				2 * blockSize],
			name: "rainbow",
			passengers: [],
			size: 1,
		},
	]));
	planetNames.push("rainbow");
	}else if(planetsVars.length == 5){
		planetsVars.push(add([
		sprite("planetFace"),
		area(),
		solid(),
		// color(0, 255, 0),
		// rotate(90),
		// debug.log(main.player.realPos),
		pos(
			15 * blockSize,
			8 * blockSize),
		scale(planetScale),
		layer("game"),
		origin("center"),
		"planet",
		z(0),
		{
			realPos: [
				15 * blockSize+main.player.realPos[0],
				8 * blockSize+main.player.realPos[1]],
			startingPos: [
				15 * blockSize,
				8 * blockSize],
			name: "face",
			passengers: [],
			size: 1,
		}]));
		planetNames.push("face");
	}
	else if(planetsVars.length == 6){
		planetsVars.push(add([
		sprite("planetSpikes"),
		area(),
		solid(),
		// color(0, 255, 0),
		// rotate(90),
		// debug.log(main.player.realPos),
		pos(
			1 * blockSize,
			16 * blockSize),
		scale(planetScale),
		layer("game"),
		origin("center"),
		"planet",
		z(0),
		{
			realPos: [
				1 * blockSize+main.player.realPos[0],
				16 * blockSize+main.player.realPos[1]],
			startingPos: [
				1 * blockSize,
				16 * blockSize],
			name: "spikes",
			passengers: [],
			size: 1,
		},
		]));
		planetNames.push("spikes");
	}
	generatePassengers(planetsVars[planetsVars.length-1], 10);
	main.main.player.z = 100;
	every("planet", (planet) => {
		planet.passengers = [];
		generatePassengers(planet, 10)
	});

}
