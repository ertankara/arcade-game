// Enemies our player must avoid
var Enemy = function (x, y, speedRate) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.speedRate = speedRate;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // Keep moving until hits the wall
  if (this.x < 404 + 101) {
    this.x += this.speedRate;
  }
  // After passing through the wall make it spawn back to starting point
  else {
    this.speedRate = getRandomInt();
    this.x = -101;
    this.y = possibleEnemySpawnCoordinatesY[Math.floor(Math.random() * 3)];
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function (x, y, sprite) {
  this.x = x;
  this.y = y;
  this.sprite = sprite;
  this.difficulty = 1;
}


// Player.prototype.update = function () {
//   //this.render();
// };


Player.prototype.winCondition = function () {
  // If water is reached
  if (this.y < 0) {
    gameWon();
  }
}



Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



Player.prototype.positionIsValid = function (x, y) {
  let isValid = true;
  // To keep it in the valid position on X
  if (x > 415 || x < -2) {
    isValid = false;
  }

  // To keep it on the valid position on Y
  if (y > 404 || y < -12) {
    isValid = false;
  }

  return isValid;
};



Player.prototype.handleInput = function (keyInput) {
  switch (keyInput) {
    case 'left': {
      if (this.positionIsValid(this.x - 101, this.y))
        this.x -= 101;
      break;
    }
    case 'up': {
      if (this.positionIsValid(this.x, this.y - 83))
        this.y -= 83;
      // Check if reached to water when going up
      this.winCondition();
      break;
    }
    case 'right': {
      if (this.positionIsValid(this.x + 101, this.y))
        this.x += 101;
      break;
    }
    case 'down': {
      if (this.positionIsValid(this.x, this.y + 83))
        this.y += 83;
      break;
    }
  }
};


// Collectibles for the player



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const START_X = 200;
const START_Y = 320;
const player = new Player(START_X, START_Y, 'images/char-boy.png');

const allEnemies = [];
const possibleEnemySpawnCoordinatesY = [60, 143, 226];



// Creates enemies at random positions
function createEnemies() {
  for (let i = 0; i < player.difficulty; i++) {
    const randomPosition = possibleEnemySpawnCoordinatesY[Math.floor(Math.random() * 3)];
    const speedRate = getRandomInt();
    const enemy = new Enemy(-101, randomPosition, speedRate);
    allEnemies.push(enemy);
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});



// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt() {
  const min = 2;
  const max = 7;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function checkCollisions() {
  allEnemies.forEach(bug => {
    // If player and a bug collides
    if (
      (bug.x > player.x - 85 && bug.x < player.x + 85) &&
      (bug.y > player.y - 50 && bug.y < player.y + 50)
    ) {3
      $mainModal.style.display = 'block';
      $failedModal.style.display = 'block';
      // Make the player disappear until pushes enter key
      player.x = 1000;
      player.y = 1000;
    }
  });
}



function gameWon() {
  $mainModal.style.display = 'block';
  $successModal.style.display = 'block';

  player.x = 1000;
  player.y = 1000;
}
