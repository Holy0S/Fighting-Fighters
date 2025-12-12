var entryContainers = document.querySelectorAll(".entry");

entryContainers.forEach((container) => {

    let entryText = container.querySelector(".entry-hover-text");

    container.addEventListener("mousemove", (event) => {
        entryText.style.visibility = "visible";

        entryText.style.left = event.pageX + 10 + "px";
        entryText.style.top = event.pageY + 10 + "px";
    });

    container.addEventListener("mouseleave", () => {
        entryText.style.visibility = "hidden";
    })

})

