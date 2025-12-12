import {Player} from "./player.js";
import {Card} from "../card.js";

class Human extends Player {
    constructor(player) {
        // Health, energy, energy regen
        super(35, 7, 3, player, "Human");
    }

    setDeck() {
        this.deck.addCard(new Card({
            title: "Slash",
            cost: 1,
            owner: this,
            attack: 6,
        }), 4);
        this.deck.addCard(new Card({
            title: "Defend",
            cost: 1,
            owner: this,
            block: 5,
        }), 4);
        this.deck.addCard(new Card({
            title: "Double Slash",
            cost: 2,
            owner: this,
            attack: 6,
            repeats: 2
        }), 2);
        this.deck.addCard(new Card({
            title: "Heal",
            cost: 1,
            owner: this,
            healing: 3,
        }), 2);   
    }

    startTurn() {
        this.heal(1);
        super.startTurn();
    }
}

export {Human}