import kaboom from "kaboom";

import { k } from "../main.js";

export function loadAssets() {
  loadSprite("bean", "sprites/bean.png");
  loadPedit("ship1", "sprites/ship_1.pedit");
  loadSprite("arrow", "sprites/arrow.png");
  loadSprite("planet1", "sprites/planet1.png");
  loadSprite("planet2", "sprites/planet 2.png");
  loadSprite("stars", "sprites/stars repeting.jpg");
  loadSprite("planetWhite", "sprites/planetWhite.png");

  loadPedit("arrow_1", "sprites/arrow_1.pedit");

  loadPedit("passenger", "sprites/cargo.pedit");
  loadPedit("passRainbow", "sprites/cargoRainbow.pedit");

  loadPedit("planet_1", "sprites/planet_1.pedit");
  loadPedit("planet_2", "sprites/planet_2.pedit");
  loadPedit("planet_3", "sprites/planet_3.pedit");

  loadPedit("ship_1", "sprites/ship_1.pedit");

  loadPedit("stars_1", "sprites/stars_1.pedit");
  loadPedit("stars_2", "sprites/stars_2.pedit");
  loadPedit("stars_3", "sprites/stars_3.pedit");

  loadPedit("void_1", "sprites/void_1.pedit")
  loadSprite("rainBowPlanet", "sprites/rainBowPlanet.png");
	
  loadSprite("planetSpikes", "sprites/planetSpikes.png");
  loadSprite("planetFace", "sprites/planetFace.png");
	
  loadPedit("cargoSpikes", "sprites/cargoSpikes.pedit");
  loadPedit("cargoFace", "sprites/cargoFace.pedit");
}

//export { loadAssets }