
function componentToHex(c: number): string {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

function RGBToHex(r: number, g: number, b: number): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRGB(hex: string): object {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

//https://coolors.co/001219-005f73-0a9396-94d2bd-e9d8a6-ee9b00-ca6702-bb3e03-ae2012-9b2226
export let ColorPalette = {
  "Rich Black": [0, 18, 25],
  "Blue Sapphire": [0, 95, 115],
  "Viridian Green": [10, 147, 150],
  "Middle Blue Green": [148, 210, 189],
  "Medium Champaigne": [233, 216, 166],
  "Gamboge": [238, 155, 0],
  "Alloy Orange":[202, 103, 2],
  "Mahogany": [187, 62, 3],
  "Rufous": [174, 32, 18],
  "Ruby Red": [155, 34, 38]
};





