/** @type {HTMLCanvasElement} **/ // This tells VS Code to suggest canvas methods
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberEnemies = 50; // How many enemies we want
const enemies = []; // Empty array to store enemies
let gameFrame = 0; // Variable to keep track of frames

class Enemy { // New class to create enemy objects
    constructor() {
        // Get the enemy sprite sheet
        this.image = new Image();
        this.image.src = "resources/enemy1.png";
        // Size of a single image on the sprite sheet
        this.spriteWidth = 293;
        this.spriteHeigth = 155;
        // Determine enemy size
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeigth / 2.5;
        // Randomize enemy position
        this.x = Math.random() * (canvas.width - this.width); // Math.random() generates a number between 0 and 1
        this.y = Math.random() * (canvas.height - this.height); // Make sure enemies fit on the canvas
        this.frame = 0; // Keep track of frames
        // Randomize wing flapping (animation speed)
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // Get a random number from 1 to 4 and make sure it's an int
    }
    update() { // A custom class method to control enemy movement
        // Make enemies wiggle in place
        this.x += Math.random() * 8 - 4;
        this.y += Math.random() * 8 - 4;
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

// This can be used to print things to the console and make sure they're OK:
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