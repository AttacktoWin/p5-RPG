game.state = "scene";
let scene = {
    sprites: [
        loadImage('Sprites/theVoid.png'),
        loadImage('Sprites/theVoid1.png')
    ],
    wait: 0,
    disposeScene: function() {
        player.state = "idle";
        game.state = "active";
        $("#scene").empty();
    },
    drawScene: function() {
        image(game.levelData.tex, 0 - player.x + width / 2, 0 - player.y + height / 2, game.levelData.w, game.levelData.h, 0, 0);
        image(chr, width / 2, height / 2, 30, 60, player.currentFrame.x * 30, player.currentFrame.y * 60, 30, 60);
        for (var i = 0; i < game.collisionData.length; i++) {
            if (game.collisionData[i].x < player.x + width / 2 && game.collisionData[i].x + game.collisionData[i].w > player.x - width / 2) {
                if (game.collisionData[i].y < player.y + height / 2 && game.collisionData[i].y + game.collisionData[i].h > player.y - height / 2) {
                    image(game.collisionData[i].tex, game.collisionData[i].x - player.x + width / 2, game.collisionData[i].y - player.y + height / 2, game.collisionData[i].w, game.collisionData[i].h, 0, 0, game.collisionData[i].w, game.collisionData[i].h);
                }
            }
        }
        fill(0, 0, 0, (255-this.wait*2));
        rect(0, 0, width, height);
        player.state = "walkR";
        player.x += gameWidth/2;
        this.wait++;
        if (this.wait == 120) {
            this.disposeScene();
        }
    }
}