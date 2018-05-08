function reload() {
    location.reload();
}

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
    var speeds = [30, 55, 75, 175, 275, 425, 550];
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
    if (this.x < 707) {
      this.x += this.speed * dt;
    } else {
      this.x= -101;
    }
    if (this.x < player.x + 55 && this.x + 55 > player.x && this.y < player.y + 55 && this.y + 55 > player.y) {
      player.x = 202;
      player.y = 400;
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
    this.x = 202;
    this.y = 400;
};

Player.prototype.update = function() {
    if (this.y < 50){
        var gameWon = document.body.appendChild(document.createElement('div')),
        gameWonText = document.createTextNode('You made it! You have crossed the street safely <3 :D <3'),
        gameWonTag = gameWon.appendChild(document.createElement('p')),
        gameWonButton = gameWon.appendChild(document.createElement('div'));
        gameWonButton.innerHTML = 'Close X';
        gameWonButton.className = 'reload';
        gameWon.className ='game-won';
        gameWonTag.appendChild(gameWonText);
        gameWon.appendChild(gameWonButton);
        this.x = 202;
        this.y = 400;
        gameWonButton.addEventListener('click', reload);
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    if (keys === 'left' && this.x > 101) {
        this.x -= 100;
    } else if (keys === 'up' && this.y > 15) {
        this.y -= 82;
    } else if (keys === 'right' && this.x < 400) {
        this.x += 100;
    } else if (keys === 'down' && this.y < 400) {
        this.y += 82;
    }
};

// Now instantiate your objects.
var bugOne = new Enemy();
var bugTwo = new Enemy();
var bugThree = new Enemy();
var bugFour = new Enemy();
var bugFive = new Enemy();
var bugSix = new Enemy();

// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(bugOne, bugTwo, bugThree, bugFour, bugFive, bugSix);


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
