class Slash {
    constructor(user) {
        this.power = 3;
        this.name = "Slash";
        this.element = "null";
        this.anim = "slash";
        this.target = "enemy";
        this.user = user;
    }
}

class Template {
    constructor() {
        this.name = "Test Attack";
        this.anim = "placeholder";
        this.power = 100;
        this.element = "null";
        this.target = "enemy";
    }

    effect() {
        var chance = floor(random(1, 5));
        if (chance == 4) {
            return ("poison");
        }
    }
}