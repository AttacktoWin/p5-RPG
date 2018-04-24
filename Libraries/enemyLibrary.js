class voidBoss {
    constructor() {
        this.icon = loadImage('Sprites/VoidBossico.png');
        this.name = "The Void";
        this.level = 99;
        this.str = 1;
        this.dex = 1;
        this.hp = 3;
        this.maxHp = 3;
        this.con = 99999;
        this.rec = 5;
        this.attacks = [
            {
                target: "self",
                name: "Heal",
                anim: "heal",
                damage: function () {
                    this.hp -= (-(this.rec * (this.rec*0.7)));
                }
            },
            {
                target: "player",
                name: "Desolation",
                anim: "voidAttack",
                damage: function () {
                    return((this.str * 5) - (player.stats.con * 2));
                }
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