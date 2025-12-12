import {Player} from "./player.js";
import {Card} from "../card.js";

class Wizard extends Player {
    constructor(player) {
        // Health, energy, energy regen
        super(35, 6, 3, player, "Wizard");
    }

    setDeck() {
        this.deck.addCard(new Card({
            title: "Fireball",
            cost: 1,
            owner: this,
            attack: 4,
        }), 2);
        this.deck.addCard(new Card({
            title: "Firestorm",
            cost: 2,
            owner: this,
            attack: 9,
        }), 2);
        this.deck.addCard(new Card({
            title: "Block",
            cost: 1,
            owner: this,
            block: 4,
        }), 2);
        this.deck.addCard(new Card({
            title: "Barrier",
            cost: 2,
            owner: this,
            block: 9,
        }), 1);
        this.deck.addCard(new Card({
            title: "Charge Up",
            cost: 0,
            owner: this,
            energy: 1,
        }), 1);


        let lightningStrike = new LightningStrike();
        lightningStrike.setOwner(this)
        this.deck.addCard(lightningStrike, 2);

        let massBlock = new MassBlock();
        massBlock.setOwner(this)
        this.deck.addCard(massBlock, 2);
    }

    startTurn() {
        if (this.currentEnergy === 0) {
            this.gainEnergy(1);
        }
        super.startTurn()
    }
}

class LightningStrike extends Card {
    constructor() {
        super({
            title: "Lightning Strike",
            cost: 3,
            description: "Deal X*4 damage, where X is your current energy"
        });

    }

    playCard() {
        var attack = this.owner.currentEnergy * 4;
        this.owner.enemy.takeDamage(attack);

        super.playCard();
    }
}

class MassBlock extends Card {
    constructor() {
        super({
            title: "Mass Block",
            cost: 3,
            description: "Gain X*3 block, where X is your current energy"
        });
    }

    playCard() {
        var block = this.owner.currentEnergy * 3;
        this.owner.defend(block);

        super.playCard();
    }
}

export {Wizard}