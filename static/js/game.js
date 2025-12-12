import {Soldier} from "./players/soldier.js";
import {Berserker} from "./players/berserker.js";
import {Ninja} from "./players/ninja.js";
import {Wizard} from "./players/wizard.js";
import {Human} from "./players/human.js";


class Game {
    constructor(player1, player2, cpu) {
        //I don't know how to not repeat this code
        switch (player1) {
            case "Human":
                this.player1 = new Human(1);
                break;
            case "Soldier":
                this.player1 = new Soldier(1);
                break;
            case "Berserker":
                this.player1 = new Berserker(1);
                break;
            case "Ninja":
                this.player1 = new Ninja(1);
                break;
            case "Wizard":
                this.player1 = new Wizard(1);
                break;
            default:
                console.error("INVALID CHARACTER GIVEN");
                return;
        }

        switch (player2) {
            case "Human":
                this.player2 = new Human(2);
                break;
            case "Soldier":
                this.player2 = new Soldier(2);
                break;
            case "Berserker":
                this.player2 = new Berserker(2);
                break;
            case "Ninja":
                this.player2 = new Ninja(2);
                break;
            case "Wizard":
                this.player2 = new Wizard(2);
                break;
            default:
                console.error("INVALID CHARACTER GIVEN");
                return;
        }

        this.player1.setEnemy(this.player2);
        this.player2.setEnemy(this.player1);

        this.player1.setGame(this);
        this.player2.setGame(this);

        this.player1.gainEnergy(Math.ceil(this.player1.energyRegen/2))
        this.player2.defend(4)

        this.turn = 1;

        // Bind functions that run on events to the game object
        // so that this refers to the game object and not the event
        this.endTurn = this.endTurn.bind(this)
        this.cardClicked = this.cardClicked.bind(this)

        this.cpu = cpu; // unused

        this.busy = false;
    }

    setup() {
        
        //Set up names:
        document.getElementById("one-name").textContent = this.player1.name;
        document.getElementById("two-name").textContent = this.player2.name;

        this.player1.deck.shuffle()
        this.player2.deck.shuffle()

        this.player1.deck.drawCards(this.player1.maxHandSize)
        this.player2.deck.drawCards(this.player2.maxHandSize)

        document.getElementById("one-picture").src = this.player1.image;
        document.getElementById("two-picture").src = this.player2.image;

        this.update()

        /*Add cards in (1)
        var one_deck_element = document.getElementById("one-deck")
        var one_deck = this.player1.deck.hand
        for (var i = 0; i < one_deck.length; i++) {
            one_deck_element.insertAdjacentHTML('beforeend', this.createHTMLCard(this.player1.deck.hand[i], i, 1))
        }
        
        //Add cards in (2)
        var two_deck_element = document.getElementById("two-deck")
        var two_deck = this.player2.deck.hand
        for (var i = 0; i < two_deck.length; i++) {
            two_deck_element.insertAdjacentHTML('beforeend', this.createHTMLCard(this.player2.deck.hand[i], i, 2, "flipped", "invisible"))
        }*/
    }

    endTurn() {
        if (this.busy) {
            return
        }

        this.busy = true;

        if (this.turn === 1) {
            this.player1.endTurn(this)
            this.player2.startTurn(this)
        } else {
            this.player2.endTurn(this)
            this.player1.startTurn(this)
        }

        this.turn = 3-this.turn
        this.update()
        

        var oneDeck = document.getElementById("one-deck")
        var twoDeck = document.getElementById("two-deck")
        // Update and THEN flip cards, turn is already updated
        // It is NOW player 1's turn, flip their cards faceup
        // Adding delay ensures that the flip works
        setTimeout(function() {
            if (this.turn === 1) {
                this.flipCardsFaceup(oneDeck)
                this.flipCardsFacedown(twoDeck)
            } else {
                this.flipCardsFaceup(twoDeck)
                this.flipCardsFacedown(oneDeck)
            }
        }.bind(this), 1)
        
        setTimeout(function() {
            this.busy = false
        }.bind(this), 600)
    }

    addCardToDeck(card, index, player) {
        var deck;
        if (player === 1) {
            deck = document.getElementById("one-deck")
        } else {
            deck = document.getElementById("two-deck")
        }
        var cardHTML;
        if (this.turn == player) {
            cardHTML = this.createHTMLCard(card, index, player)
        } else {
            cardHTML = this.createHTMLCard(card, index, player, "flipped", "invisible")
        }

        deck.insertAdjacentHTML('beforeend', cardHTML);   
    }

    createHTMLCard(jsCard, arrayIndex, player, cardClasses = "", cardContentClasses = "") {
        var card = Handlebars.templates.card({
            cardClasses: cardClasses,
            arrayIndex: arrayIndex,
            player: player,
            cardContentClasses: cardContentClasses,
            title: jsCard.title,
            image: jsCard.image,
            description: jsCard.description,
            cost: jsCard.cost
        })

        return card;
    }

    update() {
        //Update Health
        document.getElementById("one-health").textContent = String(this.player1.currentHealth) + "/" + String(this.player1.maxHealth);
        document.getElementById("two-health").textContent = String(this.player2.currentHealth) + "/" + String(this.player2.maxHealth);

        //Update Health Bars
        let height = 15;
        let player1_ratio = this.player1.currentHealth/this.player1.maxHealth
        let player2_ratio = this.player2.currentHealth/this.player2.maxHealth
        document.getElementById("one-health-bar").style.width = String((Math.max(player1_ratio*height, 0)) + "vh")
        document.getElementById("two-health-bar").style.width = String((Math.max(player2_ratio*height, 0)) + "vh")

        //Update Energy
        document.getElementById("one-energy").textContent = "Energy: " + String(this.player1.currentEnergy) + "/" + String(this.player1.maxEnergy);
        document.getElementById("two-energy").textContent = "Energy: " + String(this.player2.currentEnergy) + "/" + String(this.player2.maxEnergy);

        //Update Block
        document.getElementById("one-block").textContent = String(this.player1.block);
        document.getElementById("two-block").textContent = String(this.player2.block);

        /*
        //Remove all current cards to read them (like other assignment)
        var cards_array = Array.from(document.getElementsByClassName("card"));
        for (var i = 0; i < cards_array.length; i++) {
            cards_array[i].remove();
        }

        //Add cards in (1)
        var one_deck_element = document.getElementById("one-deck")
        var one_deck = this.player1.deck.hand
        for (var i = 0; i < one_deck.length; i++) {
            one_deck_element.insertAdjacentHTML('beforeend', this.createHTMLCard(this.player1.deck.hand[i], i, 1))
        }
        
        //Add cards in (2)
        var two_deck_element = document.getElementById("two-deck")
        var two_deck = this.player2.deck.hand
        for (var i = 0; i < two_deck.length; i++) {
            two_deck_element.insertAdjacentHTML('beforeend', this.createHTMLCard(this.player2.deck.hand[i], i, 2, "flipped", "invisible"))
        }
        */

        //Update card DATA instead of removing and adding all cards

        var deckContainer = document.getElementById("one-deck")
        var children = deckContainer.children;
        for (var i = 0; i < children.length; i++) {
            children[i].dataset.arrayIndex = i;
        }

        var deckContainer = document.getElementById("two-deck")
        var children = deckContainer.children;
        for (var i = 0; i < children.length; i++) {
            children[i].dataset.arrayIndex = i;
        }


        // Set draw pile counts
        document.getElementById("one-draw-pile-count").textContent = this.player1.deck.draw.length
        document.getElementById("one-discard-pile-count").textContent = this.player1.deck.discard.length

        document.getElementById("two-draw-pile-count").textContent = this.player2.deck.draw.length
        document.getElementById("two-discard-pile-count").textContent = this.player2.deck.discard.length
        
        // Check win conditions
        if (this.player1.currentHealth === 0 || this.player2.currentHealth === 0) {
            var winLossContainer = document.getElementById("popup-container");
            winLossContainer.style.display = "flex"; 

            var textContainer = document.getElementById("winning-player");
            var winner, loser;

            if (this.player1.currentHealth === 0) {
                textContainer.textContent = "2"
                winner = this.player2.name;
                loser = this.player1.name;
            } else {
                textContainer.textContent = "1"
                winner = this.player1.name;
                loser = this.player2.name;
            }

            this.busy = true;

            //ELLIE: 
            // Character name of the winner is in "winner"
            // Character name of the loser is in "loser"
            console.log("Saving data...")
            fetch('/data/characterDataUpdate', {
                method: 'POST',
                body: JSON.stringify({
                    winner: winner,
                    loser: loser
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (res) {
                if (res.status === 200) {
                    console.log("Data saving successful!!");
                } else {
                    console.log("Data saving unsuccessful :(")
                }
            })

        }
    }

    cardClicked(event) {
        if (this.busy) {
            return
        }

        //Get proper element:
        var card = event.target
        while (!card.classList.contains("card")) {
            if (card.classList.contains("game-display")) {
                //The deck was clicked but no card in the deck was clicked
                return
            }
            card = card.parentNode
        }

        var player_number = Number(card.dataset.player)
        if (player_number == this.turn) {
            var index = Number(card.dataset.arrayIndex)
            var player
            if (player_number == 1) {
                player = this.player1
            } else {
                player = this.player2
            }

            if (player.deck.hand[index].cost > player.currentEnergy) {
                return
            }
            player.deck.playCard(index)
            card.remove()
            this.update()
        }
    }

    flipCardsFacedown(deckContainer) {
        var children = deckContainer.children;
        for (var i = 0; i < children.length; i++) {
            children[i].classList.add("flipped")
            setTimeout(function() {
                var children = deckContainer.children;
                for (var i = 0; i < children.length; i++) {
                    children[i].firstElementChild.classList.add("invisible")
                }
            }, 249)
        }
    }

    flipCardsFaceup(deckContainer) {
        var children = deckContainer.children;
        for (var i = 0; i < children.length; i++) {
            children[i].classList.remove("flipped")
            setTimeout(function() {
                var children = deckContainer.children;
                for (var i = 0; i < children.length; i++) {
                    children[i].firstElementChild.classList.remove("invisible")
                }
            }, 249)
        }
    }

}

export {Game};