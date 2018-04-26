class Game {
    constructor() {
        this.paused = false;
        this.state = "start";
        this.location = 0;
        this.flags = [{
                name: "test0",
                state: false
            },
            {
                name: "test1",
                state: false
            },
            {
                name: "test2",
                state: false
            }
        ];
        this.collisionData = [];
        this.levelData = {};
        this.nameFrame = 0;
        this.battle = {};
    }

    pause() {
        this.state = "paused";
    }

    changeLevel(level) {
        this.location = level;
        $("#level").remove();
        $("head").append("<script src='Level Data/" + level + ".js' id='level'></script>");
        this.nameFrame = 1;
    }

    loadBattle(enemy, bg, type) {
        this.state = "battleStart";
        this.battle = new Battle(enemy, bg);
    }

    loadScene(scene) {
        $("#scene").append("<script src='Scenes/" + scene + ".js'></script>");
    }

    dialogue(arr) {
        noStroke();
        fill(0, 0, 0, 200);
        rect(0, gameHeight * 80, width, gameHeight * 20);
        rect(0, gameHeight * 78, gameWidth * 20, gameHeight * 2);
        fill(255);
        textAlign(LEFT);
        textSize(gameWidth * 3);
        text(arr[scene.dProgress].txt, gameWidth, gameHeight * 85);
        image(arr[scene.dProgress].img, 0, gameHeight * 61.5);
        textSize(gameWidth * 2);
        text(arr[scene.dProgress].name, gameWidth, gameHeight * 80.5);
    }

    display() {
        if (this.state != "start" && this.state != "scene" && !this.state.includes("battle")) {
            noStroke();
            image(this.levelData.tex, 0 - player.x + width / 2, 0 - player.y + height / 2, this.levelData.w, this.levelData.h, 0, 0);
            player.animate();
            image(chr, width / 2, height / 2, 30, 60, player.currentFrame.x * 30, player.currentFrame.y * 60, 30, 60);
            for (var i = 0; i < this.collisionData.length; i++) {
                if (this.collisionData[i].x < player.x + width / 2 && this.collisionData[i].x + this.collisionData[i].w > player.x - width / 2) {
                    if (this.collisionData[i].y < player.y + height / 2 && this.collisionData[i].y + this.collisionData[i].h > player.y - height / 2) {
                        image(this.collisionData[i].tex, this.collisionData[i].x - player.x + width / 2, this.collisionData[i].y - player.y + height / 2, this.collisionData[i].w, this.collisionData[i].h, 0, 0, this.collisionData[i].w, this.collisionData[i].h);
                    }
                }
            }
            if (this.nameFrame > 0) {
                textSize(gameWidth * 4);
                if (this.nameFrame > 81) {
                    fill(255, 255, 255, 415 - (this.nameFrame * 2));
                } else {
                    fill(255);
                }
                noStroke();
                text(this.levelData.name, gameWidth * 2, gameHeight * 80);
                this.nameFrame++;
                if (this.nameFrame == 201) {
                    this.nameFrame = 0;
                }
            }
        }
        if (this.state == "scene") {
            scene.drawScene();
            player.animate();
        }
        if (this.state.includes("battle")) {
            this.battle.display();
            this.battle.logic();
        }
    }
}

class Player {
    constructor(name) {
        this.name = name;
        if (this.name == null || this.name == "") {
            this.name = "Default";
        }
        this.sprite = loadImage('Sprites/Player.png');
        this.x = gameWidth * 20;
        this.y = gameHeight * 80;
        this.stats = {
            hp: 10,
            maxHp: 10,
            str: 2,
            dex: 2,
            con: 2,
            rec: 2
        };
        this.attacks = [{
            target: "enemy",
            name: "Slash",
            anim: "slash",
            damage: function (enemy) {
                return ((this.stats.str * 3) - (enemy.con));
            }
        }];
        this.magic = [{
            target: "self",
            name: "Cure",
            anim: "heal",
            damage: function () {
                this.hp -= (-(this.stats.rec * 2) - (this.stats.rec * 0.75));
            }
        }];
        this.items = ["null1", "null2", "null3", "null4", "null5", "null6"];
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.aFrame = 0;
        this.state = "idleR";
        this.currentFrame = {
            x: 0,
            y: 0
        };
        this.hurt = false;
        this.hurtFrame = 0;
        this.inv = [];
        this.health = 10;
        this.level = 1;
        this.xp = 0;
    }

    move() {
        if (game.state == "active") {
            if (keyIsDown(87) && keyIsDown(65)) {
                this.ySpeed -= gameHeight / 2;
                this.xSpeed -= gameHeight / 2;
                if (this.state != "walkUL") {
                    this.state = "walkUL";
                    this.aFrame = 0;
                }
            } else if (keyIsDown(87) && keyIsDown(68)) {
                this.ySpeed -= gameHeight / 2;
                this.xSpeed += gameHeight / 2;
                if (this.state != "walkUR") {
                    this.state = "walkUR";
                    this.aFrame = 0;
                }
            } else if (keyIsDown(83) && keyIsDown(65)) {
                this.ySpeed += gameHeight / 2;
                this.xSpeed -= gameHeight / 2;
                if (this.state != "walkDL") {
                    this.state = "walkDL";
                    this.aFrame = 0;
                }
            } else if (keyIsDown(83) && keyIsDown(68)) {
                this.ySpeed += gameHeight / 2;
                this.xSpeed += gameHeight / 2;
                if (this.state != "walkDR") {
                    this.state = "walkDR";
                    this.aFrame = 0;
                }
            } else if (keyIsDown(87)) {
                this.ySpeed -= gameHeight / 2;
                if (this.state != "walkU") {
                    this.state = "walkU";
                    this.aFrame = 0;
                }
            } else if (keyIsDown(83)) {
                this.ySpeed += gameHeight / 2;
                if (this.state != "walkD") {
                    this.state = "walkD";
                    this.aFrame = 0;
                }
            } else if (keyIsDown(65)) {
                this.xSpeed -= gameWidth / 2;
                if (this.state != "walkL") {
                    this.state = "walkL";
                    this.aFrame = 0;
                }
            } else if (keyIsDown(68)) {
                this.xSpeed += gameWidth / 2;
                if (this.state != "walkR") {
                    this.state = "walkR";
                    this.aFrame = 0;
                }
            }
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.y < 0) {
                this.y = 0;
            }
            if (this.x + 30 > game.levelData.w) {
                this.x = game.levelData.w - 30;
            }
            if (this.y + 60 > game.levelData.h) {
                this.y = game.levelData.h - 60;
            }

            for (var i = 0; i < game.collisionData.length; i++) {
                if (game.collisionData[i].solid) {
                    if (this.x + this.xSpeed + 30 > game.collisionData[i].x && this.x + this.xSpeed < game.collisionData[i].x + game.collisionData[i].w) {
                        if (this.y + 60 > game.collisionData[i].y && this.y < game.collisionData[i].y + game.collisionData[i].h) {
                            if (this.xSpeed > 0) {
                                this.xSpeed = game.collisionData[i].x - this.x - 30;
                            } else {
                                this.xSpeed = game.collisionData[i].x + game.collisionData[i].w - this.x;
                            }
                        }
                    }
                    if (this.y + this.ySpeed + 60 > game.collisionData[i].y && this.y + this.ySpeed < game.collisionData[i].y + game.collisionData[i].h) {
                        if (this.x + 30 > game.collisionData[i].x && this.x < game.collisionData[i].x + game.collisionData[i].w) {
                            if (this.ySpeed > 0) {
                                this.ySpeed = game.collisionData[i].y - this.y - 60;
                            } else {
                                this.ySpeed = game.collisionData[i].y + game.collisionData[i].h - this.y;
                            }
                        }
                    }
                } else {
                    if (this.x + 30 > game.collisionData[i].x && this.x < game.collisionData[i].x + game.collisionData[i].w) {
                        if (this.y + 60 > game.collisionData[i].y && this.y < game.collisionData[i].y + game.collisionData[i].h) {
                            game.collisionData[i].func();
                        }
                    }
                }

            }

            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.xSpeed = 0;
            this.ySpeed = 0;
        }
    }

    animate() {
        if (this.state == "walkU") {
            this.currentFrame.y = 1;
            if (this.aFrame < 6) {
                this.currentFrame.x = 0;
            } else if (this.aFrame < 11) {
                this.currentFrame.x = 1;
            } else if (this.aFrame < 16) {
                this.currentFrame.x = 2;
            } else if (this.aFrame < 21) {
                this.currentFrame.x = 3;
            } else if (this.aFrame < 26) {
                this.currentFrame.x = 4;
            } else if (this.aFrame < 31) {
                this.currentFrame.x = 5;
            } else if (this.aFrame < 36) {
                this.currentFrame.x = 6;
            } else if (this.aFrame < 41) {
                this.currentFrame.x = 7;
            }
        }
        if (this.state == "walkD") {
            this.currentFrame.y = 0;
            if (this.aFrame < 6) {
                this.currentFrame.x = 8;
            } else if (this.aFrame < 11) {
                this.currentFrame.x = 9;
            } else if (this.aFrame < 16) {
                this.currentFrame.x = 10;
            } else if (this.aFrame < 21) {
                this.currentFrame.x = 11;
            } else if (this.aFrame < 26) {
                this.currentFrame.x = 12;
            } else if (this.aFrame < 31) {
                this.currentFrame.x = 13;
            } else if (this.aFrame < 36) {
                this.currentFrame.x = 14
            } else if (this.aFrame < 41) {
                this.currentFrame.x = 15
            }
        }
        if (this.state == "walkL") {
            this.currentFrame.y = 1;
            if (this.aFrame < 6) {
                this.currentFrame.x = 8;
            } else if (this.aFrame < 11) {
                this.currentFrame.x = 9;
            } else if (this.aFrame < 16) {
                this.currentFrame.x = 10;
            } else if (this.aFrame < 21) {
                this.currentFrame.x = 11;
            } else if (this.aFrame < 26) {
                this.currentFrame.x = 12;
            } else if (this.aFrame < 31) {
                this.currentFrame.x = 13;
            } else if (this.aFrame < 36) {
                this.currentFrame.x = 14
            } else if (this.aFrame < 41) {
                this.currentFrame.x = 15
            }
        }
        if (this.state == "walkR") {
            this.currentFrame.y = 2;
            if (this.aFrame < 6) {
                this.currentFrame.x = 0;
            } else if (this.aFrame < 11) {
                this.currentFrame.x = 1;
            } else if (this.aFrame < 16) {
                this.currentFrame.x = 2;
            } else if (this.aFrame < 21) {
                this.currentFrame.x = 3;
            } else if (this.aFrame < 26) {
                this.currentFrame.x = 4;
            } else if (this.aFrame < 31) {
                this.currentFrame.x = 5;
            } else if (this.aFrame < 36) {
                this.currentFrame.x = 6;
            } else if (this.aFrame < 41) {
                this.currentFrame.x = 7;
            }
        }
        if (this.state == "walkUL" || this.state == "walkUR") {
            this.currentFrame.y = 3;
            if (this.state == "walkUL") {
                if (this.aFrame < 6) {
                    this.currentFrame.x = 0;
                } else if (this.aFrame < 11) {
                    this.currentFrame.x = 1;
                } else if (this.aFrame < 16) {
                    this.currentFrame.x = 2;
                } else if (this.aFrame < 21) {
                    this.currentFrame.x = 3;
                } else if (this.aFrame < 26) {
                    this.currentFrame.x = 4;
                } else if (this.aFrame < 31) {
                    this.currentFrame.x = 5;
                } else if (this.aFrame < 36) {
                    this.currentFrame.x = 6;
                } else if (this.aFrame < 41) {
                    this.currentFrame.x = 7;
                }
            } else if (this.state == "walkUR") {
                if (this.aFrame < 6) {
                    this.currentFrame.x = 8;
                } else if (this.aFrame < 11) {
                    this.currentFrame.x = 9;
                } else if (this.aFrame < 16) {
                    this.currentFrame.x = 10;
                } else if (this.aFrame < 21) {
                    this.currentFrame.x = 11;
                } else if (this.aFrame < 26) {
                    this.currentFrame.x = 12;
                } else if (this.aFrame < 31) {
                    this.currentFrame.x = 13;
                } else if (this.aFrame < 36) {
                    this.currentFrame.x = 14
                } else if (this.aFrame < 41) {
                    this.currentFrame.x = 15
                }
            }
        }
        if (this.state == "walkDL" || this.state == "walkDR") {
            this.currentFrame.y = 4;
            if (this.state == "walkDL") {
                if (this.aFrame < 6) {
                    this.currentFrame.x = 0;
                } else if (this.aFrame < 11) {
                    this.currentFrame.x = 1;
                } else if (this.aFrame < 16) {
                    this.currentFrame.x = 2;
                } else if (this.aFrame < 21) {
                    this.currentFrame.x = 3;
                } else if (this.aFrame < 26) {
                    this.currentFrame.x = 4;
                } else if (this.aFrame < 31) {
                    this.currentFrame.x = 5;
                } else if (this.aFrame < 36) {
                    this.currentFrame.x = 6;
                } else if (this.aFrame < 41) {
                    this.currentFrame.x = 7;
                }
            } else if (this.state == "walkDR") {
                if (this.aFrame < 6) {
                    this.currentFrame.x = 8;
                } else if (this.aFrame < 11) {
                    this.currentFrame.x = 9;
                } else if (this.aFrame < 16) {
                    this.currentFrame.x = 10;
                } else if (this.aFrame < 21) {
                    this.currentFrame.x = 11;
                } else if (this.aFrame < 26) {
                    this.currentFrame.x = 12;
                } else if (this.aFrame < 31) {
                    this.currentFrame.x = 13;
                } else if (this.aFrame < 36) {
                    this.currentFrame.x = 14
                } else if (this.aFrame < 41) {
                    this.currentFrame.x = 15
                }
            }
        }
        if (this.state == "idleD") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 0;
        }
        if (this.state == "idleU") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 1;
        }
        if (this.state == "idleL") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 2;
        }
        if (this.state == "idleR") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 3;
        }
        if (this.state == "idleDL") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 4;
        }
        if (this.state == "idleDR") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 5;
        }
        if (this.state == "idleUL") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 6;
        }
        if (this.state == "idleUR") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 7;
        }
        if (this.aFrame > 40) {
            this.aFrame = 0;
        }
        this.aFrame++;
    }
}

class Battle {
    constructor(enemy, bg) {
        this.state = "active";
        this.enemy = enemy;
        this.active = "commands";
        this.select = [0, 0];
        this.bg = bg;
    }

    logic() {
        if (this.state == "active") {
            if (this.select[0] < 0) {
                this.select[0] = 3;
            } else if (this.select[0] > 3) {
                this.select[0] = 0;
            }
            fill("#FF6A00");
            rect(640, 138, 160, 195);
            noFill();
            stroke(255);
            strokeWeight(4);
            rect(642, 140 + (this.select[0] * 48), 156, 48);
            fill(255);
            noStroke();
            textSize(20);
            textAlign(CENTER);
            text("Attacks", 720, 170);
            text("Magic", 720, 220);
            text("Items", 720, 270);
            text("Run", 720, 320);
            if (this.active != "commands") {
                fill("#FF6A00");
                noStroke();
                rect(480, 138, 160, 195);
                if (this.active == "attacks") {
                    if (this.select[1] > player.attacks.length - 1) {
                        this.select[1] = 0;
                    }
                    if (this.select[1] < 0) {
                        this.select[1] = player.attacks.length - 1;
                    }
                    fill(255);
                    noStroke();
                    textSize(20);
                    textAlign(LEFT);
                    for (var i = 0; i < player.attacks.length; i++) {
                        text(player.attacks[i].name, 490, 170 + (i * 50));
                    }
                } else if (this.active == "magic") {
                    if (this.select[1] > player.magic.length - 1) {
                        this.select[1] = 0;
                    }
                    if (this.select[1] < 0) {
                        this.select[1] = player.magic.length - 1;
                    }
                    fill(255);
                    noStroke();
                    textSize(20);
                    textAlign(LEFT);
                    for (var i = 0; i < player.magic.length; i++) {
                        text(player.magic[i].name, 490, 170 + (i * 50));
                    }
                } else if (this.active == "items") {
                    if (this.select[1] > player.magic.length - 1) {
                        this.select[1] = 0;
                    }
                    if (this.select[1] < 0) {
                        this.select[1] = player.items.length - 1;
                    }
                }
            }
        }
        textAlign(LEFT);
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(85, 50, 150, 20);
        if (this.enemy.hp < this.enemy.maxHp / 2) {
            if (this.enemy.hp < this.enemy.maxHp / 10) {
                fill("red");
            } else {
                fill("blue");
            }
        } else {
            fill("green");
        }
        noStroke();
        rect(85, 51, map(this.enemy.hp, -1, this.enemy.maxHp, 0, 149), 18);
        stroke(0);
        strokeWeight(2);
        noFill();
        rect(525, 50, 150, 20);
        fill(0);
        noStroke();
        textSize(12);
        text(this.enemy.hp + "/" + this.enemy.maxHp, 220, 85);
        if (player.stats.hp < player.stats.maxHp / 2) {
            if (player.hp < player.maxHp / 10) {
                fill("red");
            } else {
                fill("blue");
            }
        } else {
            fill("green");
        }
        noStroke();
        rect(525, 51, map(player.stats.hp, -1, player.stats.maxHp, 0, 149), 18);
        fill(0);
        noStroke();
        textSize(12);
        text(player.stats.hp + "/" + player.stats.maxHp, 645, 85);
        if (this.enemy.hp == 0) {
            this.victory();
        }
        if (player.stats.hp == 0) {
            this.defeat();
        }

        if (this.active != "commands") {
            noFill();
            stroke(255);
            strokeWeight(4);
            rect(482, 140 + (this.select[1] * 48), 156, 48);
        }
    }

    display() {
        noStroke();
        image(this.bg, 0, 0);
        player.state = "idleL";
        image(chr, 580, 480, 30, 60, player.currentFrame.x * 30, player.currentFrame.y * 60, 30, 60);
        fill(255);
        rect(0, 0, 300, 90);
        rect(500, 0, 300, 90);
        image(this.enemy.icon, 0, 0, 70, 90);
        image(player.sprite, width - 70, 0, 70, 90);
        textSize(20);
        fill(0);
        text(this.enemy.name, 85, 22);
        textSize(15);
        text("Lv. " + this.enemy.level, 250, 17);
        fill(0);
        textSize(20);
        text(player.name, 525, 22);
    }

    defeat() {

    }

    victory() {

    }

    run() {

    }
}