import kaboom, { Character } from "kaboom";

export type PassengerData = {
  destination: string;
  color: number[];
  sprite: string;
  fare: number;
};

import { planetNames } from "./planetGenerator";

export function generatePassengers(planet: Character, count: number): PassengerData {

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
				//add in rainbow
			}
      return <PassengerData> { // planet.passengers.push({})
        destination: otherPlanets[generatedPassId],
				color: genPassColor,
				sprite: genPassSprite,
				fare: genPassFare,
      }
		}
	}
}

//reformats the passengers on the ship after people go home
function refomatePassOnShip() {
	every("onShipPass", (todestroy) => {
		if (!todestroy.moving) {
			todestroy.destroy();
		}
	});
	// debug.log(player.passengers.length)
	for (let i = 0; i < player.passengers.length; i++) {
		let newPassDataShip = player.passengers[i]
		player.passengersSprite.push(add([
			sprite(newPassDataShip.sprite),
			// debug.log((i+1) % 6 * 30 + 15),
			pos((i) % 6 * 30 + 15, 50+textLeftModiferHeight*5 + (Math.floor(i / 6) + 1) * 20),
			color(newPassDataShip.color[0], newPassDataShip.color[1], newPassDataShip.color[2]),
			origin("center"),
			area(),
			layer("game"),
			"passenger",
			"onShipPass",
			{
				moving: false,
			}
		]));
	}
}
//Todo: make it only show the amount from each