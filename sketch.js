// P5.JS TEMPLATE - COMMENTS
"use strict";

// Declare Global Variables
let gameWidth, gameHeight;
let game, player;
let chr;
let debug = false;

function preload() {
    chr = loadImage('Sprites/SpriteSheet2.png');
}

// SETUP FUNCTION - Runs once at beginning of program
function setup() {
    createCanvas(800, 600);

    // Initialize Global Variables
    gameWidth = (width / 100);
    gameHeight = (height / 100);
    game = new Game();
}

// DRAW FUNCTION - Loops @ 60FPS by default
function draw() {
    // RUN LOGIC
    if (game.state == "active") {
        player.move();
    }
    // DRAW FRAME
    background(0);
    if (game.state != "start") {
        game.logic();
    }
    game.display();
    if (debug) {
        console.log("X: " + mouseX + ", Y: " + mouseY);
    }
}

function keyPressed() {
    if (keyCode == 13) {
        if (game.state == "start") {
            var name = prompt("Enter a name", "Default");
            game.state = "active";
            player = new Player(name);
            game.changeLevel("test");
        }
    }
    if (game.state == "scene" && scene.state == "input") {
        if (keyCode == 32) {
            scene.progress++;
        }
    }
    if (game.state == "active") {
        if (keyCode == 32) {
            player.attack();
        }
    }
}

function keyReleased() {
    if (game.state == "active") {
        if (player.state == "walkUL") {
            player.state = "idleUL";
        } else if (player.state == "walkUR") {
            player.state = "idleUR";
        } else if (player.state == "walkDL") {
            player.state = "idleDL";
        } else if (player.state == "walkDR") {
            player.state = "idleDR";
        } else if (player.state == "walkU") {
            player.state = "idleU";
        } else if (player.state == "walkD") {
            player.state = "idleD";
        } else if (player.state == "walkL") {
            player.state = "idleL";
        } else if (player.state == "walkR") {
            player.state = "idleR";
        }
    }
}