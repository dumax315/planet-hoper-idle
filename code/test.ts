function getRandomPlanet() {
  // generate a random planet path from planet_ 1 to 3
  return "planet_" + (1 + Math.floor(Math.random() * 3));
}

console.log(getRandomPlanet());