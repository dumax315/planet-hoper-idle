import {
  ColorPalette
} from "./colorUtil";

interface Planet {
  size: number;
  //speed: number;
  color: number[];
};

let test: Planet = {
  size: 10,
  color: ColorPalette["Alloy Orange"]
}

console.log(test.color)


