game.levelData = {
    w: 1000,
    h: 1000,
    name: "The Void",
    tex: loadImage('Sprites/tempBackground.png')
}
game.collisionData = [];
game.collisionData.push({
    x: 100,
    y: 200,
    w: 50,
    h: 200,
    tex: loadImage('Sprites/tempWall.png'),
    solid: true,
    func: function() {
        if (game.flags[1].state) {
            game.flags[2].state = true;
            game.collisionData.splice(0,1);
        }
    }
});
game.collisionData.push({
    x: 500,
    y: 300,
    w: 50,
    h: 200,
    tex: loadImage('Sprites/tempWall.png'),
    solid: true,
    func: function() {
        if (game.flags[0].state) {
            game.flags[1].state = true;
            game.collisionData[0].solid = false;
            game.collisionData.splice(1,1);
        }
    }
});
game.collisionData.push({
    x: 700,
    y: 200,
    w: 50,
    h: 200,
    tex: loadImage('Sprites/tempWall.png'),
    solid: false,
    func: function() {
        game.flags[0].state = true;
        game.collisionData[1].solid = false;
        game.collisionData.splice(2,1);
    }
});