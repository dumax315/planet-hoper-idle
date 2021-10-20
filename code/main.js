import kaboom from "kaboom";


// stat track FPS counter?
(function() { var script = document.createElement('script'); script.onload = function() { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })()

// initialize context
kaboom();

// load sprite assets
loadSprite("bean", "sprites/bean.png");
loadPedit("ship1", "sprites/ship_1.pedit");
loadSprite("arrow", "sprites/arrow.png");
loadSprite("planet1", "sprites/planet1.png");
loadSprite("planet2", "sprites/planet 2.png");
loadSprite("stars", "sprites/stars repeting.jpg");
loadSprite("planetWhite", "sprites/planetWhite.png");

// cargo
loadPedit("passenger", "sprites/cargo.pedit");

// planets
loadPedit("planet_1", "sprites/planet_1.pedit");
loadPedit("planet_2", "sprites/planet_2.pedit");
loadPedit("planet_3", "sprites/planet_3.pedit");

// ship stages
loadPedit("ship_1", "sprites/ship_1.pedit");

// stars
loadPedit("stars1", "sprites/stars_1.pedit");


// colorPalette
const ColorPalette = {
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

const ColorPaletteAlias = {
  "black": [0, 18, 25],
  "blue": [0, 95, 115],
  "green": [10, 147, 150],
  "foam": [148, 210, 189],
  "zest": [233, 216, 166],
  "orange": [238, 155, 0],
  "rust":[202, 103, 2],
  "sunset": [187, 62, 3],
  "red": [174, 32, 18],
  "maroon": [155, 34, 38]
};

let angleOfMovement = 0;
// scale by screen size
const mapScale = 1.5;
const blockSize = 64 * mapScale;
const backgroundSize = 64 * mapScale * 6;
const numberOfBackTiles = 48;

let planets = [
  "white",
  "red",
  "blue",
  "green",];

const planetNames = [
];
  
let planetsVars = [];


layers([
  "bg",
  "game",
  "ui",
], "game");

// generate map
const map = addLevel([
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
  "        ",
], {
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
    // where does this number come from
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
});

// what level of randomizatoin can we add to the planet?
// consider using kaboom funcitons like every or get

/**
 * Generate a random planet path from planet_ 1 to 3
 * @returns {string}
 */
function getRandomPlanet() {
  return "planet_" + (1 + Math.floor(Math.random() * 3));
}

/**
 * Pick a random color from the ColorPalette
 * @returns {number[]} 
 */
function getRandomPaletteColor() {
  return ColorPalette[
    Object.keys(ColorPalette)[
      (Math.floor(Math.random() * ColorPaletteKeys.length))]];
}

// planets
const planetHome = add([
  sprite(getRandomPlanet()),
  // hit box? (should be build into kaboom)
  area(),
  // impermeable
  solid(),
  pos(0, 0),
  scale(mapScale),
  layer("game"),
	//yo, we can't do 2 brances on the same replit
	//can you see this yes weird okay well just work in experimental for now then
	//let me connect to github ok ill j  chill
	//you can keep working now (on experimental) swag
  origin("center"),
  // tags
  "planet",
  {
    realPos: [0, 0],
    startingPos: [0, 0],
    name: "home",
    passengers: [],
  },
]);

// const planet2 = add([
// 	sprite("planet2"),
// 	area(),
// 	solid(),
// 	pos(9*blockSize,3*blockSize),
// 	scale(2*mapScale),
// 	origin("center"),
// 	"planet",
// 	{
//   	realPos: [9*blockSize,3*blockSize],
//   },
// ]);

planetsVars.push(add([
  sprite("planetWhite"),
  area(),
  solid(),
  // color(255,0,0),
  pos(
    30 * blockSize,
    15 * blockSize),
  color(),
  scale(mapScale),
  layer("game"),
  origin("center"),
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
  },
]));

planetsVars.push(add([
  sprite("planetWhite"),
  area(),
  solid(),
  color(255, 0, 0),
  pos(12 * blockSize, 6 * blockSize),
  scale(mapScale),
  layer("game"),
  origin("center"),
  "planet",
  {
    realPos: [12 * blockSize, 6 * blockSize],
    startingPos: [12 * blockSize, 6 * blockSize],
    name: "red",
    passengers: [],
  },
]));

planetsVars.push(add([
  sprite("planetWhite"),
  area(),
  solid(),
  color(0, 0, 255),
  rotate(90),
  pos(15 * blockSize, 40 * blockSize),
  scale(mapScale),
  layer("game"),
  origin("center"),
  "planet",
  {
    realPos: [
      15 * blockSize,
      20 * blockSize],
    startingPos: [15 * blockSize, 20 * blockSize],
    name: "blue",
    passengers: [],
    size: 1,
  },
]));

planetsVars.push(add([
  sprite("planetWhite"),
  area(),
  solid(),
  color(0, 255, 0),
  rotate(90),
  pos(
    15 * blockSize,
    40 * blockSize),
  scale(mapScale),
  layer("game"),
  origin("center"),
  "planet",
  {
    realPos: [
      7 * blockSize,
      12 * blockSize],
    startingPos: [
      7 * blockSize,
      12 * blockSize],
    name: "green",
    passengers: [],
    size: 1,
  },
]));

// player
const player = add([
  sprite("ship_1"),
  pos(width() / 2, height() / 2),
  rotate(0),
  scale(2),
  area(),
  layer("game"),
  origin("center"),
  "player",
  {
    speed: 0,
    max_thrust: 8,
    acceleration: .05,
    deceleration: 4,
    animation_frame: 0,
		money: 100,
    capacityMax: 6,
    capacity: 30,
    passengers: [],
    realPos: [0, 0],
    onPlanet: false,
    startingPos: [width() / 2, height() / 2],
    passengersSprite: [],
    planetAt: "home",
		anim: "thrust",
  }
]);
player.play("thrust");
// The arrow
const movementArrow = add([
  sprite("arrow"),
  pos(40, 80),
  rotate(0),
  // scale(2),
  layer("game"),
  origin("center"),
  "arrow",
  {
    animation_frame: 0,
  }
]);

//ui
//planet indicator
add([
  text("Planet: ", 8),
  scale(.3),
  pos(5, 50),
  origin("topleft"),
  layer("ui"),
]);

const planetText = add([
  text(player.planetAt, 8),
  scale(.3),
  pos(100, 50),
  origin("topleft"),
  layer("ui"),
]);

//planet indicator
add([
  text("Money:", 8),
  scale(.3),
  pos(5, 90),
  origin("topleft"),
  layer("ui"),
]);

const moneyText = add([
  text(player.money, 8),
  scale(.3),
  pos(100, 90),
  origin("topleft"),
  layer("ui"),
]);

//speed
add([
  text("Speed: ", 8),
  scale(.3),
  pos(5, 70),
  origin("topleft"),
  layer("ui"),
]);

const speedText = add([
  text(player.speed, 8),
  scale(.3),
  pos(100, 70),
  origin("topleft"),
  layer("ui"),
]);

//capacity

add([
  text("Capacity:", 8),
  scale(.3),
  pos(5, 110),
  origin("topleft"),
  layer("ui"),
]);

const capacityText = add([
  text(player.capacity, 8),
  scale(.3),
  pos(130, 110),
  origin("topleft"),
  layer("ui"),
]);
//passengers
add([
  text("passengers:", 8),
  scale(.3),
  pos(5, 130),
  origin("topleft"),
  layer("ui"),
]);




function arrowRotateFromMouse() {
  mouseRotationToSend = (Math.atan((mousePos().y - height() / 2) / (mousePos().x - width() / 2)) * 180 / Math.PI) - 90;
  if ((mousePos().x - width() / 2) >= 0) {
    mouseRotationToSend = (Math.atan((mousePos().y - height() / 2) / (mousePos().x - width() / 2)) * 180 / Math.PI) + 90;
  }
  return mouseRotationToSend;
}



// // Movement keys
// keyDown("a", () => {
//   playerMoveToo[0] = player.speed;
// });
// keyDown("d", () => {
//   playerMoveToo[0] = -1*player.speed;
// });

// keyDown("w", () => {
//   playerMoveToo[1] = player.speed;
// });

// keyDown("s", () => {
//   playerMoveToo[1] = -1*player.speed;
// });

mouseClick(() => {
  // angleOfMovement = movementArrow.angle;
  player.speed = 1;
  player.onPlanet = false;
  player.planetAt = "none";
  planetText.text = player.planetAt;
  every("onPlanetPass", (passa) => {
    destroy(passa)
  })
});

// arrow indicator
movementArrow.action(() => {
  movementArrow.angle = arrowRotateFromMouse();
  movementArrow.pos.x = width() / 2 + (Math.sin(movementArrow.angle * (Math.PI / 180))) * 60;
  movementArrow.pos.y = height() / 2 + (-1 * Math.cos(movementArrow.angle * (Math.PI / 180))) * 60;
  // e.resolve();
});

// map.action(() => {
// 	map.pos = playerGlobalPosition;

// });

function moveToSlow(x, y, objToMove, speed, delAfter) {
  let moveAmountX = -1 * (objToMove.pos.x - x) / speed;
  // debug.log(moveAmountX)
  let moveAmountY = -1 * (objToMove.pos.y - y) / speed;
  let timerreset = 0;
  let intervalID = setInterval(function() {
    objToMove.pos.x += moveAmountX;
    objToMove.pos.y += moveAmountY;
    if (++timerreset === speed) {
      if (delAfter) {
        objToMove.destroy();
        // player.passengersSprite.splice(index,1);
        
      }
      window.clearInterval(intervalID);
    }
  }, 10);
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
      pos((i) % 6 * 30 + 15, 135 + (Math.floor(i / 6) + 1) * 20),
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

player.collides("planet", (planet) => {
  // debug.log("yo");
  if (player.onPlanet) {
    return
  }
  player.speed = 0;

  //why did -1 work
  move(-1 * planet.startingPos[0] + width() / 2, -1 * planet.startingPos[1] + height() / 2, 10);
  player.onPlanet = true;
  //update planet
  player.planetAt = planet.name;
  planetText.text = player.planetAt;

  // debug.log(player.planetAt)



  //move pass to ship


  if (planets.includes(player.planetAt)) {
    //move ship pass to planet
    let playerPassesToRemove = [];
    for (let i = 0; i < player.passengers.length; i++) {
      if (player.passengers[i].destination == player.planetAt) {
        moveToSlow(width() / 2, height() / 2, player.passengersSprite[i], 25, true);
        player.passengersSprite[i].moving = true;
        playerPassesToRemove.push(i);
				player.money +=50;
				moneyText.text = player.money;

      }
    }

    for (let i = playerPassesToRemove.length-1;  i >= 0; i--) {
			console.log(player.passengers.splice(playerPassesToRemove[i], 1));
      
      
    }
		player.passengersSprite = []
    refomatePassOnShip();
		player.capacity += playerPassesToRemove.length;

    for (let i = 0; i < planetsVars[planets.indexOf(player.planetAt)].passengers.length; i++) {
      let newPassData = planetsVars[planets.indexOf(player.planetAt)].passengers[i]
      add([
        sprite(newPassData.sprite),

        pos(width() / 2 + 50 + i * 30, height() / 2),
        color(newPassData.color[0], newPassData.color[1], newPassData.color[2]),
        origin("center"),
        area(),
				
        layer("game"),
        "passenger",
        "onPlanetPass",
      ]);
    }
  }
});

let passengerMoveSpeed = 400;
//move passengers into ship
action("onPlanetPass", (passenger) => {
  if (player.capacity > 0) {
    passenger.move(dir(180).scale(passengerMoveSpeed))
    // passenger.pos.x -= passengerMoveSpeed*dt()*100;
  }

});

player.collides("onPlanetPass", (passenger) => {
  // debug.log("asdf")
  //update player object
  player.passengers.push(planetsVars[planets.indexOf(player.planetAt)].passengers[0])
  player.capacity -= 1;
  capacityText.text = player.capacity
  //render in passengerarea

  //reneder for pass in ship
	let newPassDataShip = player.passengers[player.passengers.length-1]
	player.passengersSprite.push(add([
		sprite(newPassDataShip.sprite),

		pos((player.passengers.length-1) % 6 * 30 + 15, 135 + (Math.floor((player.passengers.length-1) / 6) + 1) * 20),
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

  //remove passenger from planet
  passenger.destroy()
  planetsVars[planets.indexOf(player.planetAt)].passengers.shift()


  //generate and render new passenger
	

  generatepassengers(planetsVars[planets.indexOf(player.planetAt)], 1)
  let newPassData = planetsVars[planets.indexOf(player.planetAt)].passengers[planetsVars[planets.indexOf(player.planetAt)].passengers.length - 1]
  add([
    sprite(newPassData.sprite),

    pos(width() / 2 + 25 + 10 * 30, height() / 2),
    color(newPassData.color[0], newPassData.color[1], newPassData.color[2]),
    origin("center"),
    area(),
    layer("game"),
    "passenger",
    "onPlanetPass"
  ]);

});

// collides("planet", "player", () => {

// });

// track distance to count fuel


//calcualte real position
let calcRealPos = obj => {
  obj.realPos[0] += (-1 * Math.sin(angleOfMovement * (Math.PI / 180)) * player.speed);
  obj.realPos[1] += (Math.cos(angleOfMovement * (Math.PI / 180)) * player.speed);
  // debug.log(obj.realPos[0])
  // debug.log(obj.realPos[1])
  if (obj.realPos[0] >= (numberOfBackTiles / 2 * blockSize)) {
    obj.realPos[0] = obj.realPos[0] - (numberOfBackTiles * blockSize)
  };

  if (obj.realPos[1] >= (numberOfBackTiles / 2 * blockSize)) {
    obj.realPos[1] = obj.realPos[1] - (numberOfBackTiles * blockSize)
  };

  if (obj.realPos[0] <= -1 * (numberOfBackTiles / 2 * blockSize)) {
    obj.realPos[0] = obj.realPos[0] + (numberOfBackTiles * blockSize)
  };

  if (obj.realPos[1] <= -1 * (numberOfBackTiles / 2 * blockSize)) {
    obj.realPos[1] = obj.realPos[1] + (numberOfBackTiles * blockSize)
  };
}

// need a move function this isnt working
let move = (x, y, slow) => {
  let moveAmountX = (x - player.realPos[0]) / slow
  player.realPos[0] = x
  let moveAmountY = (y - player.realPos[1]) / slow
  player.realPos[1] = y

  // every("background", (background) => {
  // 	// debug.log(background.startingPos[0])
  // 	background.pos.x += moveAmountX;
  // 	background.pos.y += moveAmountY;
  // 	// debug.log(background.startingPos[0])
  // })
  // every("planet", (planet) => {
  // 	// planet.pos.x = planet.startingPos[0] + x;
  // 	// planet.pos.x = planet.startingPos[1] + y;
  // 	planet.realPos[0] += moveAmountX;
  // 	planet.realPos[1] += moveAmountY;

  // })
  let timerreset = 0;
  let intervalID = setInterval(function() {
    every("background", (background) => {
      // debug.log(background.startingPos[0])
      background.pos.x += moveAmountX;
      background.pos.y += moveAmountY;
      // debug.log(background.startingPos[0])
    })
    every("planet", (planet) => {
      // planet.pos.x = planet.startingPos[0] + x;
      // planet.pos.x = planet.startingPos[1] + y;
      planet.realPos[0] += moveAmountX;
      planet.realPos[1] += moveAmountY;

    })
    if (++timerreset === slow) {
      window.clearInterval(intervalID);
    }
  }, 10);
}

action("background", (background) => {
  background.pos.x += (-1 * Math.sin(angleOfMovement * (Math.PI / 180)) * player.speed);
  background.pos.y += (Math.cos(angleOfMovement * (Math.PI / 180)) * player.speed);
  if (background.pos.x >= (numberOfBackTiles / 2 * blockSize) + width() / 2) {
    background.pos.x = background.pos.x - (numberOfBackTiles * blockSize)
  } else if (background.pos.x <= -1 * (numberOfBackTiles / 2 * blockSize) + width() / 2) {
    background.pos.x = background.pos.x + (numberOfBackTiles * blockSize)
  }
  if (background.pos.y >= (numberOfBackTiles / 2 * blockSize) + height() / 2) {
    background.pos.y = background.pos.y - (numberOfBackTiles * blockSize)
  } else if (background.pos.y <= -1 * (numberOfBackTiles / 2 * blockSize) + height() / 2) {
    background.pos.y = background.pos.y + (numberOfBackTiles * blockSize)
  }


  // background.pos.x = background.pos.x % (26 * blockSize);
  // background.pos.y = background.pos.y % (26 * blockSize);
});

action("planet", (planet) => {
  calcRealPos(planet);

  if (planet.realPos[0] <= 0) {
    planet.pos.x = 0;
  } else if (planet.realPos[0] >= width()) {
    planet.pos.x = width();
  } else {
    planet.pos.x = planet.realPos[0];
  };

  if (planet.realPos[1] <= 0) {
    planet.pos.y = 0;
  } else if (planet.realPos[1] >= height()) {
    planet.pos.y = height();
  } else {
    planet.pos.y = planet.realPos[1];
  };

  // debug.log(planet.pos.x !== planet.realPos[0] || planet.pos.y !== planet.realPos[1])

  // when you're done make sure you go to the main branch or make another branch to work in.
  // i can make my own experimental branch I just don't want to cause any conflicts with what you're doing
  if (planet.pos.x !== planet.realPos[0] || planet.pos.y !== planet.realPos[1]) {
    planet.scaleTo(mapScale / 2);
  } else {
    planet.scaleTo(mapScale);
  }


});

// we can talk about it later on discord
// trying and failing to average angles, it sucks because they wrap around
// https://rosettacode.org/wiki/Averages/Mean_angle#JavaScript idk
//i'm going to have my math teacher do it; swag, i don't know what you're trying to do exactly but if he can help then that's good

function sum(a,angle2Off) {
    var s = a[0]+a[1]*angle2Off;
    return s;
} 
 
function degToRad(a) {
    return Math.PI / 180 * a;
}
 
function averageOfAngle(a,angle2Off) {
		let rawAvj = 180 / Math.PI * Math.atan2(
        sum(a.map(degToRad).map(Math.sin),angle2Off) / (1+angle2Off),
        sum(a.map(degToRad).map(Math.cos),angle2Off) / (1+angle2Off)
    )
    return Math.round(rawAvj);
}


action("player", () => {
  if (player.speed > 0) {
    player.speed = Math.min(player.speed + player.acceleration, player.max_thrust);
  }
  speedText.text = Math.round(player.speed);
	//new movement system
	// debug.log(angleOfMovement)
	angleOfMovement = averageOfAngle([movementArrow.angle,angleOfMovement],20);
	player.angle = angleOfMovement;
  calcRealPos(player)
  // debug.log(player.realPos)
})

function generatepassengers(planet, ammount) {

  if (planets.includes(planet.name)) {
    // debug.log(planets)
    let otherPlanets = planets.slice();
    // debug.log(planet.name)
    otherPlanets.splice(planets.indexOf(planet.name), 1)
    // if(planet.name == "red"){
    // 	debug.log(otherPlanets)
    // }
    // debug.log(otherPlanets)
    for (let i = 0; i < ammount; i++) {

      let generatedPassId = Math.floor(Math.random() * otherPlanets.length);
      let genPassColor = (0, 0, 0);
      let genPassSprite = "passenger";

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
      }
      planet.passengers.push({
        destination: otherPlanets[generatedPassId],
        color: genPassColor,
        sprite: genPassSprite,
      })
			//yo, we can't do too brances on the same replit
			//can you see this
      // if(planet.name == "blue"){
      // 	debug.log(planet.name)
      // 	debug.log(planet.passengers[i].destination)
      // 	debug.log(generatedPassId)
      // 	debug.log(otherPlanets)
      // 	debug.log(otherPlanets[generatedPassId])
      // }
    }
  }

}

let onStart = () => {
  every("background", (background) => {
    background.startingPos[0] = background.pos.x;
    background.startingPos[1] = background.pos.y;
  })
  every("planet", (planet) => {
    generatepassengers(planet, 10)
  })
  move(width() / 2, height() / 2, 1)
}

onStart()