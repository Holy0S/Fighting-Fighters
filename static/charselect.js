function addDefaultButton(buttonsArray, player) {
    if (buttonsArray.length == 0) {
        console.error("NO BUTTONS FOUND")
        return
    }
    buttonsArray[0].classList.toggle('pressed'); 

    const playerName = "player" + String(player)
    sendToJSON(playerName, buttonsArray[0].dataset.name)
}

function sendToJSON(playerName, characterName) {
    fetch('/data/charactersPicked', {
        method: 'POST',
        body: JSON.stringify({
            playerName: playerName,
            characterName: characterName
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function turnOffOtherButtons(buttonsArray) {
    for (var i = 0; i < buttonsArray.length; i++) {
        if (buttonsArray[i].classList.contains("pressed")) {
            buttonsArray[i].classList.remove("pressed")
        }
    }

}

document.addEventListener("DOMContentLoaded", () => {

    // Add Default Selections:
    const oneButtons = document.getElementsByClassName('p-1-selected');
    const twoButtons = document.getElementsByClassName('p-2-selected');

    addDefaultButton(oneButtons, 1)
    addDefaultButton(twoButtons, 2)

    const characterBox = document.getElementById('c-select-box');
    
    characterBox.addEventListener('click', (event) => {
   
        if (event.target.classList.contains('p-1-selected')) {
            const button = event.target;
            
            turnOffOtherButtons(oneButtons)

            button.classList.toggle('pressed');
            sendToJSON("player1", button.dataset.name)
        } else if (event.target.classList.contains('p-2-selected')) {
            const button = event.target;
            
            turnOffOtherButtons(twoButtons)

            button.classList.toggle('pressed');
            sendToJSON("player2", button.dataset.name)
        }
    });
});

