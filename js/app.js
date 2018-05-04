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
    var initialLocX = [-100, -120, -140];
    var initialLocY = [63, 146, 230];
    // Array to set speeds
    var speeds = [100, 200, 300, 400];
    // Randomized arrays to locate enemies in different positions
    var randomlocX = shuffle(initialLocX);
    var randomlocY = shuffle(initialLocY);
    // Randomized speeds
    var randomSpeed = shuffle(speeds);
    // Setting postions and speed based on randomized values
    this.x = randomlocX[2];
    this.y = randomlocY[0];
    this.speed = randomSpeed[3];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    ctx.save();
    this.x += this.speed * dt;
    ctx.restore();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  // The image/sprite for our players
  this.sprite = 'images/char-boy.png';
  //Initial player's position
  this.x = 200;
  this.y = 380;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
