import {Game} from "./game.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/server_data/charactersPicked.json');
        const charData = await response.json();

        let game = new Game(charData["player1"], charData["player2"], false);
        
        //ELLIE: Pick Rate Info HERE

        game.setup()

        var one_deck = document.getElementById("one-deck");
        one_deck.addEventListener('click', game.cardClicked)

        var two_deck = document.getElementById("two-deck");
        two_deck.addEventListener('click', game.cardClicked)

        var end_turn_button = document.getElementById("end-turn-button");
        end_turn_button.addEventListener("click", game.endTurn)

        const closePopupBtn = document.getElementById("close-popup-btn");
        closePopupBtn.addEventListener("click", function() {
            window.location = "/"
        });
        
    } catch (error) {
        console.error("Error loading character data:", error);
    }

});

/*
game.player1.deck.drawCards(5);
game.player1.deck.printCards();
console.log("");
game.player1.deck.playCard(0);
game.player1.deck.printCards();
*/