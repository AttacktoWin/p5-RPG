game.state = "scene";
game.progress++;
let scene = {
    sprites: [
    ],
    state: "moving",
    progress: 0,
    wait: 0,
    disposeScene: function() {
        player.state = "idle";
        game.state = "active";
        $("#scene").empty();
        scene = undefined;
    },
    drawScene: function() {
        // Draw Game Objects
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
        
        // Logic of the Scene

        // Dispose Scene when done
        if (this.wait == 120) {
            this.disposeScene();
        }
    }
}