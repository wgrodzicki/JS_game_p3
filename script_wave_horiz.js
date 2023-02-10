/** @type {HTMLCanvasElement} **/ // This tells VS Code to suggest canvas methods
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberEnemies = 100; // How many enemies we want
const enemies = []; // Empty array to store enemies
let gameFrame = 0; // Variable to keep track of frames

class Enemy { // New class to create enemy objects
    constructor() {
        // Get the enemy sprite sheet
        this.image = new Image();
        this.image.src = "resources/enemy3.png";
        // Randomize enemy speed
        this.speed = Math.random() * 4 + 1;
        // Size of a single image on the sprite sheet
        this.spriteWidth = 218;
        this.spriteHeigth = 177;
        // Determine enemy size
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeigth / 2.5;
        // Randomize enemy position
        this.x = Math.random() * (canvas.width - this.width); // Math.random() generates a number between 0 and 1
        this.y = Math.random() * (canvas.height - this.height); // Make sure enemies fit on the canvas
        this.frame = 0; // Keep track of frames
        // Randomize wing flapping (animation speed)
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); // Get a random number from 1 to 4 and make sure it's an int
        this.angle = 40; // Starting position on the horizontal wave
        this.angleSpeed = Math.random() * 2 + 0.5; // Randomize the speed at which the angle increases and cap it between 0.5 and 2.5
    }
    update() { // A custom class method to control enemy movement
        // Make the horizontal movement wavy by using trigonometry (sine wave)
        // this.angle * Math.PI/180 converts the value to radians - expected argument for the sin() method, slowing down the movement
        // Make sure enemies occupy the entire canvas horizontally but still fit in the borders
        this.x = canvas.width / 2 * Math.sin(this.angle * Math.PI/90) + (canvas.width / 2 - this.width / 2);
        // Together with cosine on the y axis it creates more complex movement patterns
        // The movement pattern can be controlled by changing 180 above and below to different values!
        // Make sure enemies occupy the entire canvas vertically but still fit in the borders
        this.y = canvas.height / 2 * Math.cos(this.angle * Math.PI/180) + (canvas.height / 2 - this.height / 2);
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