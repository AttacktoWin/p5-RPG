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
    // if (game.state.includes("battle") && game.battle.state == "active") {
    //     if (keyCode == 83) {
    //         if (game.battle.active == "commands") {
    //             game.battle.select[0] += 1;
    //         } else {
    //             game.battle.select[1] += 1;
    //         }
    //     }
    //     if (keyCode == 87) {
    //         if (game.battle.active == "commands") {
    //             game.battle.select[0] -= 1;
    //         } else {
    //             game.battle.select[1] -= 1;
    //         }
    //     }

    //     if (keyCode == 13) {
    //         if (game.battle.active == "items") {
    //             player.items[game.battle.select[1]].func();
    //         }
    //         if (game.battle.active == "attacks") {
    //             var user = {
    //                 str: player.stats.str,
    //                 dex: player.stats.dex,
    //                 power: player.attacks[game.battle.select[1]].power,
    //                 anim: player.attacks[game.battle.select[1]].anim,
    //                 element: player.attacks[game.battle.select[1]].element,
    //                 state: "player"
    //             }
    //             if (player.attacks[game.battle.select[1]].target == "enemy") {
    //                 var target = {
    //                     con: game.battle.enemy.con,
    //                     dex: game.battle.enemy.dex,
    //                     element: game.battle.enemy.element
    //                 }
    //             } else {
    //                 var target = {
    //                     con: player.stats.con,
    //                     dex:player.stats.dex,
    //                     element: player.stats.element
    //                 }
    //             }
                
    //             game.battle.attack(user, target);
    //         }
    //         if (game.battle.active == "commands") {
    //             if (game.battle.select[0] == 0) {
    //                 game.battle.select[1] = 0;
    //                 game.battle.active = "attacks";
    //             } else if (game.battle.select[0] == 1) {
    //                 game.battle.select[1] = 0;
    //                 game.battle.active = "magic";
    //             } else if (game.battle.select[0] == 2) {
    //                 game.battle.select[1] = 0;
    //                 game.battle.active = "items";
    //             } else if (game.battle.select[0] == 3) {
    //                 game.battle.run();
    //             }
    //         }    
    //     }

    //     if (keyCode == 8) {
    //         if (game.battle.active != "commands") {
    //             game.battle.active = "commands";
    //             game.battle.select[1] = 0;
    //         }
    //     }
    // }
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