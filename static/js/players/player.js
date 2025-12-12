//Base player class that all players inherit from
import {Deck} from "../deck.js";

class Player {
    constructor(maxHealth, maxEnergy, energyRegen, player, name) {
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.maxEnergy = maxEnergy;
        this.energyRegen = energyRegen;
        this.player = player;
        this.name = name;
        
        this.currentEnergy = 0; 
        this.block = 0;
        this.name = name
        this.maxHandSize = 5;
        this.deck = null;
        this.enemy = null;
        this.game = null;
        this.extraDamage = 0;

        this.image = "/images/" + this.name.toLowerCase() + ".png"

        this.deck = new Deck(this);
        this.setDeck();
    }

    takeDamage(damage) {
        let oldBlock = this.block;
        this.block = Math.max(0, this.block-damage);
        damage = Math.max(0, damage-oldBlock);
        this.currentHealth = Math.max(this.currentHealth - damage, 0);
        if (damage > 0) { //Damage was done directly
            this.enemy.successfulHit()
        }
    }

    defend(block) {
        this.block += block;
    }

    heal(healing) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + healing);
    }

    gainEnergy(energy) {
        this.currentEnergy = Math.min(this.currentEnergy + energy, this.maxEnergy);
    }

    setEnemy(enemy) {
        this.enemy = enemy;
    }

    setGame(game) {
        this.game = game;
    }

    startTurn(game) {
        this.gainEnergy(this.energyRegen)
        this.block = 0;
        this.deck.drawCards(this.maxHandSize)
        // Add cards to html
    }

    endTurn(game) {
        // There is definetly stuff that should be done by player instead of game but 
        // my organization is not the best
        this.extraDamage = 0;
        return
    }

    successfulHit() {
        return
    }

    print() {
        console.log(this.name);
        console.log("Energy: " + this.currentEnergy + "/" + this.maxEnergy);
        console.log("Health: " + this.currentHealth + "/" + this.maxHealth);
        console.log("Block: " + this.block);
    }
}


export {Player};