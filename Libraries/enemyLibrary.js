class voidBoss {
    constructor() {
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
                damage: -(this.rec * (this.rec*0.7))
            },
            {
                target: "player",
                name: "Desolation",
                anim: "voidAttack",
                damage: (this.str * 5) - (player.stats.con * 2)
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