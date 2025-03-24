async function addShelves() {
    const allShelvesOptions = document.getElementsByClassName("shelfOption")
    const numberOfShelvesOptions = allShelvesOptions.length

    if (numberOfShelvesOptions > 0) {
        for (i=0; i<numberOfShelvesOptions; i++) {
            let elementToRemove = allShelvesOptions[0]
            elementToRemove.remove()
        }
    }

    const lockerId = document.getElementById("lockersSelector").value
    console.log(lockerId)
    const shelvesReq = await fetch(`http://localhost:3000/get-shelves?lockerId=${lockerId}`)
    const listOfShelves = await shelvesReq.json()
    console.log(listOfShelves)
    let shelvesSelector = document.getElementById("shelvesSelector")
    for (shelf of listOfShelves) {
        let newShelfOption = document.createElement("option")
        newShelfOption.setAttribute("value", shelf.id)
        newShelfOption.setAttribute("class", "shelfOption")
        newShelfOption.innerText = shelf.name
        shelvesSelector.appendChild(newShelfOption)
    }
}