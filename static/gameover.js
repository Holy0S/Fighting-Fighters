document.addEventListener("DOMContentLoaded", () => {
    const popupContainer = document.getElementById("popup-container");
    const closePopupBtn = document.getElementById("close-popup-btn");


    function showPopup(winningPlayer) {
        document.getElementById("winning-player").textContent = winningPlayer;
        popupContainer.style.display = "flex"; 
    }


    function hidePopup() {
        popupContainer.style.display = "none"; 
    }


    closePopupBtn.addEventListener("click", hidePopup);

    //IF YOU WANT TO SEE THE POPUP, PLEASE UNCOMMENT BELOW
    // setTimeout(() => showPopup("1"), 2000); // Shows after 2 seconds
});