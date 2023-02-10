/** @type {HTMLCanvasElement} **/ // This tells VS Code to suggest canvas methods
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberEnemies = 20; // How many enemies we want
const enemies = []; // Empty array to store enemies
let gameFrame = 0; // Variable to keep track of frames

class Enemy { // New class to create enemy objects
    constructor() {
        // Get the enemy sprite sheet
        this.image = new Image();
        this.image.src = "resources/enemy2.png";
        // Randomize enemy speed
        this.speed = Math.random() * 4 + 1;
        // Randomize enemy position
        this.x = Math.random() * (canvas.width - this.width); // Math.random() generates a number between 0 and 1
        this.y = Math.random() * (canvas.height - this.height); // Make sure enemies fit on the canvas
        // Size of a single image on the sprite sheet
        this.spriteWidth = 266;
        this.spriteHeigth = 188;
        // Determine enemy size
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeigth / 2.5;
        this.frame = 0; // Keep track of frames
        // Randomize wing flapping (animation speed)
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // Get a random number from 1 to 4 and make sure it's an int
        this.angle = Math.random() * 2; // Randomize the starting position on the wave
        this.angleSpeed = Math.random() * 0.2; // Randomize the speed at which the angle increases
        this.curve = Math.random() * 7; // Randomize the amplitude
    }
    update() { // A custom class method to control enemy movement
        this.x -= this.speed;
        // Make the vertical movement wavy by using trigonometry (sine wave)
        // Math.sin() returns the sin of the number, i.e. values 0-1
        this.y += this.curve * Math.sin(this.angle); // Multiplying the value increases the amplitude of the wave
        this.angle += this.angleSpeed; // Keep increasing the random angle by random speed
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