class voidBoss {
    constructor() {
        this.icon = loadImage('Sprites/VoidBossico.png');
        this.name = "The Void";
        this.boss = true;
        this.level = 99;
        this.str = 1;
        this.dex = 1;
        this.hp = 3;
        this.maxHp = 3;
        this.con = 99999;
        this.rec = 5;
        this.element = "void";
        this.attacks = [
            {
                name: "Heal",
                anim: "heal",
                power: -3,
                target: "self"
            },
            {
                name: "Desolation",
                anim: "void",
                power: 3,
                target: "enemy"
            }
        ]
    }

    logic() {
        if (this.hp < 3) {
            return this.attacks[0]
        } else {
            return this.attacks[1]
        }
    }
}