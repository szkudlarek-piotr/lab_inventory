function createLeftMenu() {
    let leftMenu = document.getElementById("left_menu")
    const buttonsData = [{"words": "Opakowania", "href": "all-packaging.html"}, {"words": "Dodaj opakowanie", "href": "add-packaging.html"}, {"words": "Dodaj substancję", "href": "add-substance.html"}, {"words": "Znajdź substancję", "href": "find-substance.html" }]
    for (button of buttonsData) {
        const textOfButton = button["words"]
        const finalAdress = button["href"]
        let newButton = document.createElement("a")
        newButton.setAttribute("href", finalAdress)
        newButton.setAttribute("class", "menu_option")
        newButton.innerText = textOfButton
        leftMenu.appendChild(newButton)
    }
}