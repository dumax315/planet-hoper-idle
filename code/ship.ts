import kaboom, { 
  Character, 
  SpriteComp 
  } from "kaboom";

kaboom();

let Ship = {
  hasViewProjection: false,
  hasMiniMap: false,
  
  acceleration: 1,
  fuelCapacity: 10,
  cargoCapacity: 10
};

function getShipViewProjection(): boolean { return Ship.hasViewProjection; };
function setShipViewProjection(state: boolean): void { Ship.hasViewProjection = state; };

function getShipMiniMap(): boolean { return Ship.hasMiniMap; };
function setShipMiniMap(state: boolean): void { Ship.hasMiniMap = state; };

function getShipAcceleration(): number { return Ship.acceleration; };
function setShipAcceleration(value: number): void {
  if (value < 0.5) {
    Ship.acceleration = 0.5;
  } else if (value > 10) {
    Ship.acceleration = 10;
  } else {
    Ship.acceleration = value;
  };
};

function getShipFuelCapactiy(): number { return Ship.fuelCapacity; };
function setShipFuelCapacity(value: number): void {
  if (value < 10) {
    Ship.fuelCapacity = 10;
  } else if (value > 300) {
    Ship.fuelCapacity = 300;
  } else {
    Ship.fuelCapacity = value;
  };
};

function getShipCargoCapactiy(): number { return Ship.cargoCapacity; };
function setShipCargoCapacity(value: number): void {
  if (value < 10) {
    Ship.cargoCapacity = 10;
  } else if (value > 300) {
    Ship.cargoCapacity = 300;
  } else {
    Ship.cargoCapacity = value;
  };
};

/*

Visuals:  
  manage thrust animation for rocket
  manage rocket size

*/

// let shipStagePaths: string[] = [
//   "sprites/ship1.pedit",
//   "sprites/ship2.pedit",
//   "sprites/ship3.pedit"
// ];

// loadSprite
// anims: {

// change thrust speed by ship speed
//         thrust: {
//             from: 0,
//             to: 3,
//         }
//     },


// function nextRocketFrame(sprite: SpriteComp) {

// };


// function getSpireStagePath(stageNum: number, stages: string[]): string {
//   return stages[stageNum];
// };


// function setSpriteStage(stagePath: string, sprite: SpriteComp): void {
//   // sprite.spriteID = stagePath;

//   sprite.frame = 0;
// };

