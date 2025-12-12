class Deck {
    constructor(owner) {
        this.draw = [];
        this.discard = [];
        this.hand = [];

        this.owner = owner;
    }

    addCard(card, copies=1) { // This may not work the way I want but we'll find out
        for (let i = 0; i < copies; i++) {
            this.draw.push(card);
        }
    }

    playCard(index) {
        this.hand[index].playCard();
        this.discardCard(index);
    }

    discardCard(index) {
        this.discard.push(this.hand[index]);
        this.hand.splice(index, 1);
    }

    shuffle() {
        this.draw.sort(() => Math.random() - 0.5);
    }

    shuffleInDiscard() {
        while (this.discard.length > 0) {
            this.draw.push(this.discard.pop(0));
        }
        this.shuffle();
    }

    drawCards(handSize) {
        let cardDraw = handSize-this.hand.length
        for (let i = 0; i < cardDraw; i++) {
            this.drawCard();
        }
    }

    drawCard() {
        if (this.draw.length <= 0) {
            this.shuffleInDiscard();
        }
        if (this.draw.length <= 0) {
            console.error("TRIED TO DRAW CARD WITH NO CARDS IN DECK OR DISCARD");
            return
        }
        var newCard = this.draw.pop(0);
        this.hand.push(newCard);
        this.owner.game.addCardToDeck(newCard, this.hand.length-1, this.owner.player);
    }

    printCards() {
        console.log("In the Deck:");
        for (let i = 0; i < this.draw.length; i++) {
            this.draw[i].print()
        }
        console.log("In the Discard:");
        for (let i = 0; i < this.discard.length; i++) {
            this.discard[i].print()
        }
        console.log("In the Hand:");
        for (let i = 0; i < this.hand.length; i++) {
            this.hand[i].print()
        }
    }
}

export {Deck};