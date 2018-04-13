drawScene() {
    noStroke();
            fill(0,0, 0, 150);
            rect(0, gameHeight*80, width, gameHeight*20);
            var sprite = loadImage("Sprites/" + sceneobj.data[game.progress].sprite + ".png");
            image(sprite, 0, gameHeight*80 - 200, 200, 200);
            var txt = sceneobj.data[game.progress].txt;
            fill(255);
            textSize(gameWidth*2);
            text(txt, 10, gameHeight*81 + 200);
            var name = sceneobj.data[game.progress].name;
            textSize(gameWidth);
            text(name, 5, gameHeight*80 + 200);
            if (game.progress == sceneobj.data.length - 1) {
                game.progress = 0;
                game.state = "active";
                sceneobj = {};
            }
}