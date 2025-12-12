import {Player} from "./player.js";
import {Card} from "../card.js";

class Ninja extends Player {
    constructor(player) {
        // Health, energy, energy regen
        super(35, 6, 4, player, "Ninja");
    }

    setDeck() {
        this.deck.addCard(new Card({
            title: "Slash",
            cost: 1,
            owner: this,
            attack: 5,
        }), 3);
        this.deck.addCard(new Card({
            title: "Defend",
            cost: 1,
            owner: this,
            block: 4,
        }), 4);
        this.deck.addCard(new Card({
            title: "Double Slash",
            cost: 2,
            owner: this,
            attack: 6,
            repeats: 2
        }), 2);
        this.deck.addCard(new Card({
            title: "Triple Slash",
            cost: 3,
            owner: this,
            attack: 6,
            repeats: 3,
        }), 1);
        this.deck.addCard(new Card({
            title: "Whirlwind",
            cost: 1,
            owner: this,
            attack: 1,
            repeats: 4
        }), 1);

        let sharpen = new Sharpen();
        sharpen.setOwner(this)
        this.deck.addCard(sharpen, 1);
    }

    successfulHit() {
        this.defend(1);
    }
}

class Sharpen extends Card {
    constructor() {
        super({
            title: "Sharpen",
            cost: 1,
            description: "All attacks deal +1 damage until the end of the turn"
        });
    }

    playCard() {
        super.playCard();
        this.owner.extraDamage += 1;
    }
}

export {Ninja}