import {Player} from "./player.js";
import {Deck} from "../deck.js";
import {Card} from "../card.js";

class Template extends Player {
    constructor(player) {
        // Health, energy, energy regen
        super(30, 5, 3, player);

        this.name = "Template";
        this.deck = new Deck(this);
        this.setDeck();
    }

    setDeck() {
        this.deck.addCard(new Card({
            title: "Strike",
            cost: 2,
            owner: this,
            attack: 2,
        }), 2);
        this.deck.addCard(new Card({
            title: "Defend",
            cost: 2,
            owner: this,
            block: 2,
        }), 2);

        let newCard = new NewCard();
        newCard.setOwner(this)
        this.deck.addCard(newCard, 2);
    }
}

class NewCard extends Card {
    constructor() {
        super({
            title: "Explode everything",
            cost: 2,
        });
    }

    playCard() {
        // Overwrite stuff here
    }
}

export {Template}