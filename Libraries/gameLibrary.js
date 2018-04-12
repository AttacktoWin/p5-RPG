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
        this.progress = 0;
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

    scene() {
        game.state = "scene";
    }

    display() {
        if (this.state != "start" && this.state != "scene") {
            image(this.levelData.tex, 0 - player.x + width / 2, 0 - player.y + height / 2, this.levelData.w, this.levelData.h, 0, 0);
            image(chr, width / 2, height / 2, 20, 50, player.currentFrame.x * 20, player.currentFrame.y * 50, 20, 50);
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
            noStroke();
            fill(0);
            rect(0, gameHeight*80, width, gameHeight*20);
            var sprite = loadImage(sceneobj.data[this.progress].sprite);
            image(sprite, 0, gameHeight*80 - 200, 200, 200);
            var txt = sceneobj.data[this.progress].txt;
            fill(255);
            textSize(gameWidth*2);
            text(txt, 10, gameHeight*81 + 200);
            var name = sceneobj.data[this.progress].name;
            textSize(gameWidth);
            text(name, 5, gameHeight*80 + 200);
            if (this.progress == sceneobj[0] - 1) {
                this.progress = 0;
                this.state = "active";
                sceneobj = {};
            }
        }
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.x = gameWidth * 20;
        this.y = gameHeight * 80;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.aFrame = 0;
        this.state = "walkR";
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
            if (this.x + 20 > game.levelData.w) {
                this.x = game.levelData.w - 20;
            }
            if (this.y + 50 > game.levelData.h) {
                this.y = game.levelData.h - 50;
            }

            for (var i = 0; i < game.collisionData.length; i++) {
                if (game.collisionData[i].solid) {
                    if (this.x + this.xSpeed + 20 > game.collisionData[i].x && this.x + this.xSpeed < game.collisionData[i].x + game.collisionData[i].w) {
                        if (this.y + 50 > game.collisionData[i].y && this.y < game.collisionData[i].y + game.collisionData[i].h) {
                            if (this.xSpeed > 0) {
                                this.xSpeed = game.collisionData[i].x - this.x - 20;
                            } else {
                                this.xSpeed = game.collisionData[i].x + game.collisionData[i].w - this.x;
                            }
                        }
                    }
                    if (this.y + this.ySpeed + 50 > game.collisionData[i].y && this.y + this.ySpeed < game.collisionData[i].y + game.collisionData[i].h) {
                        if (this.x + 20 > game.collisionData[i].x && this.x < game.collisionData[i].x + game.collisionData[i].w) {
                            if (this.ySpeed > 0) {
                                this.ySpeed = game.collisionData[i].y - this.y - 50;
                            } else {
                                this.ySpeed = game.collisionData[i].y + game.collisionData[i].h - this.y;
                            }
                        }
                    }
                } else {
                    if (this.x + 20 > game.collisionData[i].x && this.x < game.collisionData[i].x + game.collisionData[i].w) {
                        if (this.y + 50 > game.collisionData[i].y && this.y < game.collisionData[i].y + game.collisionData[i].h) {
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
            if (this.aFrame < 11) {
                this.currentFrame.x = 0;
            } else if (this.aFrame < 21) {
                this.currentFrame.x = 1;
            } else if (this.aFrame < 31) {
                this.currentFrame.x = 2;
            } else if (this.aFrame < 41) {
                this.currentFrame.x = 3;
            } else if (this.aFrame < 51) {
                this.currentFrame.x = 4;
            } else if (this.aFrame < 61) {
                this.currentFrame.x = 5;
            }
        }
        if (this.state == "walkD") {
            this.currentFrame.y = 1;
            if (this.aFrame < 11) {
                this.currentFrame.x = 6;
            } else if (this.aFrame < 21) {
                this.currentFrame.x = 7;
            } else if (this.aFrame < 31) {
                this.currentFrame.x = 8;
            } else if (this.aFrame < 41) {
                this.currentFrame.x = 9;
            } else if (this.aFrame < 51) {
                this.currentFrame.x = 10;
            } else if (this.aFrame < 61) {
                this.currentFrame.x = 11;
            }
        }
        if (this.state == "walkL") {
            this.currentFrame.y = 0;
            if (this.aFrame < 11) {
                this.currentFrame.x = 1;
            } else if (this.aFrame < 21) {
                this.currentFrame.x = 2;
            } else if (this.aFrame < 31) {
                this.currentFrame.x = 3;
            } else if (this.aFrame < 41) {
                this.currentFrame.x = 4;
            } else if (this.aFrame < 51) {
                this.currentFrame.x = 5;
            } else if (this.aFrame < 61) {
                this.currentFrame.x = 6;
            }
        }
        if (this.state == "walkR") {
            this.currentFrame.y = 0;
            if (this.aFrame < 11) {
                this.currentFrame.x = 7;
            } else if (this.aFrame < 21) {
                this.currentFrame.x = 8;
            } else if (this.aFrame < 31) {
                this.currentFrame.x = 9;
            } else if (this.aFrame < 41) {
                this.currentFrame.x = 10;
            } else if (this.aFrame < 51) {
                this.currentFrame.x = 11;
            } else if (this.aFrame < 61) {
                this.currentFrame.x = 12;
            }
        }
        if (this.state == "walkUL" || this.state == "walkUR") {
            this.currentFrame.y = 2;
            if (this.state == "walkUL") {
                if (this.aFrame < 11) {
                    this.currentFrame.x = 0;
                } else if (this.aFrame < 21) {
                    this.currentFrame.x = 1;
                } else if (this.aFrame < 31) {
                    this.currentFrame.x = 2;
                } else if (this.aFrame < 41) {
                    this.currentFrame.x = 3;
                } else if (this.aFrame < 51) {
                    this.currentFrame.x = 4;
                } else if (this.aFrame < 61) {
                    this.currentFrame.x = 5;
                }
            } else if (this.state == "walkUR") {
                if (this.aFrame < 11) {
                    this.currentFrame.x = 6;
                } else if (this.aFrame < 21) {
                    this.currentFrame.x = 7;
                } else if (this.aFrame < 31) {
                    this.currentFrame.x = 8;
                } else if (this.aFrame < 41) {
                    this.currentFrame.x = 9;
                } else if (this.aFrame < 51) {
                    this.currentFrame.x = 10;
                } else if (this.aFrame < 61) {
                    this.currentFrame.x = 11;
                }
            }
        }
        if (this.state == "walkDL" || this.state == "walkDR") {
            this.currentFrame.y = 3;
            if (this.state == "walkDL") {
                if (this.aFrame < 11) {
                    this.currentFrame.x = 0;
                } else if (this.aFrame < 21) {
                    this.currentFrame.x = 1;
                } else if (this.aFrame < 31) {
                    this.currentFrame.x = 2;
                } else if (this.aFrame < 41) {
                    this.currentFrame.x = 3;
                } else if (this.aFrame < 51) {
                    this.currentFrame.x = 4;
                } else if (this.aFrame < 61) {
                    this.currentFrame.x = 5;
                }
            } else if (this.state == "walkDR") {
                if (this.aFrame < 11) {
                    this.currentFrame.x = 6;
                } else if (this.aFrame < 21) {
                    this.currentFrame.x = 7;
                } else if (this.aFrame < 31) {
                    this.currentFrame.x = 8;
                } else if (this.aFrame < 41) {
                    this.currentFrame.x = 9;
                } else if (this.aFrame < 51) {
                    this.currentFrame.x = 10;
                } else if (this.aFrame < 61) {
                    this.currentFrame.x = 11;
                }
            }
        }
        if (this.state == "idle") {
            this.currentFrame.y = 0;
            this.currentFrame.x = 0;
        }
        if (this.aFrame > 60) {
            this.aFrame = 0;
        }
        this.aFrame++;
    }
}