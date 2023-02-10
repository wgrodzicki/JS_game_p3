/** @type {HTMLCanvasElement} **/ // This tells VS Code to suggest canvas methods
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberEnemies = 40; // How many enemies we want
const enemies = []; // Empty array to store enemies
let gameFrame = 0; // Variable to keep track of frames

class Enemy { // New class to create enemy objects
    constructor() {
        // Get the enemy sprite sheet
        this.image = new Image();
        this.image.src = "resources/enemy4.png";
        // Randomize enemy speed
        this.speed = Math.random() * 4 + 1;
        // Size of a single image on the sprite sheet
        this.spriteWidth = 213;
        this.spriteHeigth = 213;
        // Determine enemy size
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeigth / 2.5;
        // Initial randomized enemy position
        this.x = Math.random() * (canvas.width - this.width); // Math.random() generates a number between 0 and 1
        this.y = Math.random() * (canvas.height - this.height); // Make sure enemies fit on the canvas
        // New randomized enemy position
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.frame = 0; // Keep track of frames
        // Randomize animation speed
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // Get a random number from 1 to 4 and make sure it's an int
        this.interval = Math.floor(Math.random() * 200 + 50); // Randomize the interval between position changes
    }
    update() { // A custom class method to control enemy movement
        // Every time gameFrame is divisible by 0 (every xth animation loop) assign new random values to positions
        // The divisor determines the interval between position changes
        if (gameFrame % this.interval == 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }
        // Calculate distance between positions
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        // Change position by a fraction of the distance
        this.x -= dx / 50;
        this.y -= dy /  50;
        // The following check creates an endless flow of enemies right -> left
        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }
        // Run the animation depending on flapSpeed
        if (gameFrame % this.flapSpeed == 0) { // Works fine when flapSpeed is an int (modulus doesn't work with floats as divisors!)
            // Ternary operator equivalent to:
            // If value > 4, then set value to 0
            // Else value++
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() { // Method to draw the enemy
        context.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeigth, this.x, this.y, this.width, this.height);
    }
}

// Populate the array with enemies using the class above
for (let i = 0; i < numberEnemies; i++) {
    enemies[i] = new Enemy();
}

// The following can be used to print things to the console and make sure they're OK:
// console.log(enemies);

function animate() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // Make sure no artifacts from the last frame remain
    // For each element of the array call the function with "enemy" as a placeholder for each element
    enemies.forEach(function(enemy) {
        enemy.update();
        enemy.draw();
    })
    gameFrame++; // Keep track of frames
    requestAnimationFrame(animate); // Create an endless animation loop
}
animate();