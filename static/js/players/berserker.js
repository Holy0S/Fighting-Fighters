import {Player} from "./player.js";
import {Card} from "../card.js";

class Berserker extends Player {
    constructor(player) {
        // Health, energy, energy regen
        super(40, 6, 4, player, "Berserker");

        this.passiveBlock = true;
        this.selfDamageImmune = false;
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
        }), 3);
        this.deck.addCard(new Card({
            title: "Reckless Attack",
            cost: 1,
            owner: this,
            attack: 8,
            selfDamage: 2,
        }), 3);
        this.deck.addCard(new Card({
            title: "No Pain, No Gain",
            cost: 1,
            owner: this,
            block: 8,
            selfDamage: 2,
        }), 2);


        let calmDown = new CalmDown();
        calmDown.setOwner(this)
        this.deck.addCard(calmDown, 1);
    }

    takeDamage(damage) {
        super.takeDamage(damage);
        if (this.passiveBlock && this.currentHealth <= 10) {
            this.block += 5;
            this.passiveBlock = false;
        }
    }

    startTurn() {
        super.startTurn()
        this.selfDamageImmune = false;
    }
}

class CalmDown extends Card {
    constructor() {
        super({
            title: "Calm Down",
            cost: 1,
            description: "Deal no self damage for the rest of this turn"
        });
    }

    playCard() {
        super.playCard();
        this.owner.selfDamageImmune = true;
    }
}

export {Berserker}