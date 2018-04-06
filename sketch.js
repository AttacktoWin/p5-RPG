// P5.JS TEMPLATE - COMMENTS
"use strict";

// Declare Global Variables
let gameWidth, gameHeight;
let game, player;
let chr;

function preload() {
    chr = loadImage('Sprites/tempSpritesheet.png');
}

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(800, 600);

    // Initialize Global Variables
    gameWidth = (width/100);
    gameHeight = (height/100);
    game = new Game();
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    // RUN LOGIC
    if (game.state == "active") {
        player.move();
    }
    if (game.state != "start") {
        player.animate();
    }
    // DRAW FRAME
    background(0);
    game.display();
}

function keyPressed() {
    if (keyCode == 32) {
        game.state = "active";
        player = new Player("Default");
        game.changeLevel("test");
    }
    console.log(player.state);
}

function keyReleased() {
    if (game.state == "active") {
        player.state = "idle";
    }
}