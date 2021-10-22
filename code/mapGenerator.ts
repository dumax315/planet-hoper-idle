import kaboom from "kaboom";

import { LevelConf } from "kaboom";

import { k } from "./main.js";
import { vec2N } from "./util/kaboomUtil";



export const mapScale = 1.5;

const backgroundSize = 64 * mapScale * 6;

const numberOfBackTiles = 48;

export function generateLayers(): void {
  k.layers([
	"bg",
	"game",
	"ui",
	"uiText",
	"store",]
  , "game");
}


const mapASCII =
  ["        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",];

// this is a bug in kaboom, it works fine
export function generateMap () {
  k.addLevel(
    mapASCII, {
      width: backgroundSize,
      height: backgroundSize,
      pos: vec2(width() / 2 - 10 * backgroundSize, height() / 2 - 10 * backgroundSize),
      "=": () => [
        rect(backgroundSize, backgroundSize),
        color(255, 0, 0),
        area(),
        origin("center"),
        // "planet",
        layer("bg"),
        "background",
        {
          startingPos: [0, 0],
        }
      ],
      " ": () => [
        rect(backgroundSize, backgroundSize),
        sprite("stars"),
        // scale(400 * mapScale),
        scale(0.5484 * mapScale),
        // color(0,0,0),
        area(),
        origin("center"),
        layer("bg"),
        "background",
        {
          startingPos: [0, 0],
        }
      ],
    }
  );
} 