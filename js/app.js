function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Arrays set unique x and y posotions
    var initialLocX = [-101, -202, -404];
    var initialLocY = [63, 146, 230];
    // Array to set speeds
    var speeds = [27.5, 55.5, 75, 175, 275, 425, 550];
    // Randomized arrays to locate enemies in different positions
    var randomlocX = shuffle(initialLocX);
    var randomlocY = shuffle(initialLocY);
    // Randomized speeds
    var randomSpeed = shuffle(speeds);
    // Setting postions and speed based on randomized values
    this.x = randomlocX[2];
    this.y = randomlocY[0];
    this.speed = randomSpeed[0];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 707) {
      this.x += this.speed * dt;
    } else {
      this.x= -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
    // The image/sprite for our players
    this.sprite = 'images/char-boy.png';
    //Initial player's position
    this.x = 202.5;
    this.y = 380;
};

Player.prototype.update = function(dt) {

};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    if (keys === 'left' && this.x > 101) {
        this.x -= 100;
    } else if (keys === 'up' && this.y > 15) {
        this.y -= 82.5;
    } else if (keys === 'right' && this.x < 380) {
        this.x += 100;
    } else if (keys === 'down' && this.y < 380) {
        this.y += 82.5;
    }
};

// Now instantiate your objects.
var bugOne = new Enemy();
var bugTwo = new Enemy();
var bugThree = new Enemy();
var bugFour = new Enemy();

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(bugOne, bugTwo, bugThree, bugFour);


// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        // If some arrow keys are fisically broken, alternative keys are provided
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
