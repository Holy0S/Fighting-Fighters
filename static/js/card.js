class Card {
    constructor({title, description = "", cost, owner=undefined, attack=0, selfDamage = 0, block = 0, healing = 0, draw = 0, repeats = 1, energy = 0}) {
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.owner = owner;
        this.attack = attack;
        this.selfDamage = selfDamage;
        this.block = block;
        this.healing = healing;
        this.draw = draw;
        this.repeats = repeats;
        this.energy = energy;

        // Default image
        var imagePath = "images\\card-images\\"
        imagePath += this.title.replace(/\s+/g, "-").toLowerCase() + ".png"
        this.image = imagePath
        
        
        // Leave description empty for basic cards
        if (description === "") {
            this.setDefaultDescription();
        }
    }

    setOwner(owner) {
        this.owner = owner;
    }

    setDefaultDescription() {
        if (this.attack > 0) {
            this.description += "Deal " + this.attack + " damage.\n"
        }
        if (this.selfDamage > 0) {
            this.description += "Take " + this.selfDamage + " self damage.\n"
        }
        if (this.block > 0) {
            this.description += "Gain " + this.block + " block.\n"
        }
        if (this.healing > 0) {
            this.description += "Heal for " + this.healing + ".\n"
        }
        if (this.draw > 0) {
            this.description += "Draw " + this.draw + " cards.\n"
        }
        if (this.energy > 0) {
            this.description += "Gain " + this.energy + " energy.\n"
        }
        // Removes excess \n's
        this.description = this.description.replace(/^\s+|\s+$/g, '');
        switch (this.repeats) { // This solution is lacking in flexibiltiy, but works for my case
            case 2: 
                this.description = this.description.replace(/\.+$/, '');
                this.description += " twice."
                break
            case 3: 
                this.description = this.description.replace(/\.+$/, '');
                this.description += " three times."
                break
            case 4: 
                this.description = this.description.replace(/\.+$/, '');
                this.description += " four times."
                break
        }
    }

    playCard() {
        if (this.owner.currentEnergy < this.cost) {
            console.error("CARD PLAYED WITH INSUFFICENT ENERGY");
            return;
        }

        this.owner.currentEnergy -= this.cost;
        
        for (var i = 0; i < this.repeats; i++) {
            if (this.attack > 0) {
                this.owner.enemy.takeDamage(this.attack + this.owner.extraDamage);
            }
            if (this.selfDamage > 0 && !this.owner.selfDamageImmune) {
                this.owner.takeDamage(this.selfDamage);
            }
            if (this.block > 0) {
                this.owner.defend(this.block)
            }
            if (this.healing > 0) {
                this.owner.heal(this.healing);
            }
            if (this.draw > 0) {
                for (let i = 0; i < this.draw; i++) {
                    this.owner.deck.drawCard()
                }
            }
            if (this.energy > 0) {
                this.owner.gainEnergy(this.energy);
            }
        }
    }

    print() {
        console.log(
            this.title + "\n" +
            this.description + "\n" +
            "Is owned by a " + this.owner.name
        );
    }
}

export {Card};