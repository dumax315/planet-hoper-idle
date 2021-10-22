import kaboom, { Character } from "kaboom";

export type PassengerData = {
  destination: string;
  color: number[];
  sprite: string;
  fare: number;
};

import { planetNames } from "./planetGenerator";

export function generatePassengers(planet: Character, count: number) {

	if (planetNames.includes(planet.name)) {

		let otherPlanets = planetNames.slice();

		otherPlanets.splice(planetNames.indexOf(planet.name), 1)

		for (let i = 0; i < count; i++) {

			let generatedPassId = Math.floor(Math.random() * otherPlanets.length);
			let genPassColor = [0, 0, 0];
			let genPassSprite = "passenger";
			let genPassFare = 1;
			switch (otherPlanets[generatedPassId]) {
				case "white":
					genPassColor = [255, 255, 255];
					break;
				case "blue":
					genPassColor = [0, 0, 255];
					break;
				case "red":
					genPassColor = [255, 0, 0];
					break;
				case "green":
					genPassColor = [0, 255, 0];
					break;
				case "rainbow":
					genPassSprite = "passRainbow";
					genPassColor = [255, 255, 255];
					genPassFare = 10;
					break;
				case "face":
					genPassSprite = "cargoFace";
					genPassColor = [255, 255, 255];
					genPassFare = 50;
					break;
				case "spikes":
					genPassSprite = "cargoSpikes";
					genPassColor = [255, 255, 255];
					genPassFare = 500;
					break;
				//add in ranbow
			}
			planet.passengers.push({
				destanation: otherPlanets[generatedPassId],
				color: genPassColor,
				sprite: genPassSprite,
				fare: genPassFare,
			})
		}
	}
// was in master

}