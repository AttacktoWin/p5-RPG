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
    solid: true
});
game.collisionData.push({
    x: 500,
    y: 300,
    w: 50,
    h: 200,
    tex: loadImage('Sprites/tempWall.png'),
    solid: true
});
game.collisionData.push({
    x: 700,
    y: 200,
    w: 50,
    h: 200,
    tex: loadImage('Sprites/tempWall.png'),
    solid: false
});