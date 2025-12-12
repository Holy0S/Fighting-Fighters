import {Player} from "./player.js";
import {Card} from "../card.js";

class Soldier extends Player {
    constructor(player) {
        // Health, energy, energy regen
        super(35, 5, 4, player, "Soldier");

        this.nextTurnBlock = 0;
        this.buckleDown = false;
    }

    setDeck() {
        this.deck.addCard(new Card({
            title: "Bash",
            cost: 1,
            owner: this,
            attack: 4,
        }), 2);
        this.deck.addCard(new Card({
            title: "Block",
            cost: 1,
            owner: this,
            block: 6,
        }), 3);
        this.deck.addCard(new Card({
            title: "Defensive Stance",
            cost: 2,
            owner: this,
            block: 13,
        }), 2);

        let shieldBash = new ShieldBash();
        shieldBash.setOwner(this)
        this.deck.addCard(shieldBash, 2);
        
        let prepare = new Prepare();
        prepare.setOwner(this)
        this.deck.addCard(prepare, 2);

        let buckleDown = new BuckleDown();
        buckleDown.setOwner(this)
        this.deck.addCard(buckleDown, 1);
    }

    startTurn() {
        var newBlock = this.block;
        if (!this.buckleDown) {
            newBlock = Math.floor(newBlock / 2)
        }
        newBlock += this.nextTurnBlock;

        super.startTurn()
        
        this.block = newBlock;
        this.nextTurnBlock = 0;
        this.buckleDown = false;
    }
}

class ShieldBash extends Card {
    constructor() {
        super({
            title: "Shield Bash",
            cost: 1,
            description: "Deal damage equal to block, and lose it"
        });
    }

    playCard() {
        super.playCard();

        this.owner.enemy.takeDamage(this.owner.block);

        this.owner.block = 0;
    }
}

class Prepare extends Card {
    constructor() {
        super({
            title: "Prepare",
            cost: 1,
            description: "Defend for 5 at the start of your next turn"
        });
    }

    playCard() {
        super.playCard();

        this.owner.nextTurnBlock += 5;
    }
}

class BuckleDown extends Card {
    constructor() {
        super({
            title: "Buckle Down",
            cost: 1,
            description: "Lose no block at the start of your next turn"
        });
    }

    playCard() {
        super.playCard();

        this.owner.buckleDown = true;
    }
}

export {Soldier}