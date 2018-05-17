class TestEnemy {
    constructor(homeX, homeY, trackers) {
        this.x = trackers[0].x;
        this.xSpeed = 0;
        this.w = 30;
        this.y = trackers[0].y;
        this.ySpeed = 0;
        this.h = 60;
        this.speed = 2;
        this.trackers = trackers;
        this.r = 50;
        this.current = 0;
        this.state = "idle";
        this.aFrame = 0;
        this.currentFrame = {
            x: 0,
            y: 0
        }
        this.tex = loadImage('Sprites/SpriteSheet2.png');
    }

    logic() {
        if (this.x > this.trackers[this.current + 1].x) {
            this.xSpeed -= this.speed;
        } else if (this.x < this.trackers[this.current + 1].x) {
            this.xSpeed += this.speed;
        }
        if (this.y > this.trackers[this.current + 1].y) {
            this.ySpeed -= this.speed;

        } else if (this.y < this.trackers[this.current + 1].y) {
            this.ySpeed += this.speed;
        }

        for (var i = 0; i < game.collisionData.length) {
            if (game.collisionData[i].solid) {
                if (this.x + this.xSpeed + this.w > game.collisionData[i].x && this.x + this.xSpeed < game.collisionData[i].x + game.collisionData[i].w) {
                    if (this.y + this.h > game.collisionData[i].y && this.y < game.collisionData[i].y + game.collisionData[i].h) {
                        if (this.xSpeed > 0) {
                            this.xSpeed = game.collisionData[i].x - this.x - this.w;
                        } else {
                            this.xSpeed = game.collisionData[i].x + game.collisionData[i].w - this.x;
                        }
                    }
                }
                if (this.y + this.ySpeed + this.h > game.collisionData[i].y && this.y + this.ySpeed < game.collisionData[i].y + game.collisionData[i].h) {
                    if (this.x + this.w > game.collisionData[i].x && this.x < game.collisionData[i].x + game.collisionData[i].w) {
                        if (this.ySpeed > 0) {
                            this.ySpeed = game.collisionData[i].y - this.y - this.h;
                        } else {
                            this.ySpeed = game.collisionData[i].y + game.collisionData[i].h - this.y;
                        }
                    }
                }
            }
        }

        if (this.xSpeed < 0) {
            if (this.ySpeed < 0) {
                if (this.state != "walkUL") {
                    this.state = "walkUL";
                    this.aFrame = 0;
                }
            } else if (this.ySpeed > 0) {
                if (this.state != "walkDL") {
                    this.state = "walkDL";
                    this.aFrame = 0;
                }
            } else {
                if (this.state != "walkL") {
                    this.state = "walkL";
                    this.aFrame = 0;
                }
            }
        } else if (this.xSpeed > 0) {
            if (this.ySpeed < 0) {
                if (this.state != "walkUR") {
                    this.state = "walkUR";
                    this.aFrame = 0;
                }
            } else if (this.ySpeed > 0) {
                if (this.state != "walkDR") {
                    this.state = "walkDR";
                    this.aFrame = 0;
                }
            } else {
                if (this.state != "walkR") {
                    this.state = "walkR";
                    this.aFrame = 0;
                }
            }
        } else if (this.ySpeed < 0) {
            if (this.state != "walkU") {
                this.state = "walkU";
                this.aFrame = 0;
            }
        } else if (this.ySpeed > 0) {
            if (this.state != "walkD") {
                this.state = "walkD";
                this.aFrame = 0;
            }
        } else {
            if (this.state == "walkUL") {
                this.state = "idleUL";
                this.aFrame = 0;
            }
            if (this.state == "walkUR") {
                this.state = "idleUR";
                this.aFrame = 0;
            }
            if (this.state == "walkDL") {
                this.state = "idleDL";
                this.aFrame = 0;
            }
            if (this.state == "walkDR") {
                this.state = "idleDR";
                this.aFrame = 0;
            }
            if (this.state == "walkL") {
                this.state = "idleL";
                this.aFrame = 0;
            }
            if (this.state == "walkR") {
                this.state = "idleR";
                this.aFrame = 0;
            }
            if (this.state == "walkU") {
                this.state = "idleU";
                this.aFrame = 0;
            }
            if (this.state == "walkD") {
                this.state = "idleD";
                this.aFrame = 0;
            }
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.xSpeed = 0;
        this.ySpeed = 0;
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

    show() {
        if (this.x < player.x + width / 2 && this.x + this.w > player.x - width / 2) {
            if (this.y < player.y + height / 2 && this.y + this.h > player.y - height / 2) {
                image(this.tex, this.x - player.x + width / 2, this.y - player.y + height / 2, 30, 60, this.currentFrame.x * 30, this.currentFrame.y * 60, 30, 60);
            }
        }
    }
}