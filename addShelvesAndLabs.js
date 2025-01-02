async function addShelvesAndLabs() {
    const  shelvesAndLabsReq = await fetch("http://localhost:3000/shelves-and-labs")
    const listOfShelvesAndLabs = await shelvesAndLabsReq.json()
    let shelvesSelector = document.getElementById("shelvesSelector")
    let labsSelector = document.getElementById("labsSelector")
    for (item of listOfShelvesAndLabs) {
        let newShelfOption = document.createElement("option")
        if (item.class == "shelf") {
            newShelfOption.innerText = item.name
            newShelfOption.setAttribute("value", item.id)
            shelvesSelector.appendChild(newShelfOption)
        }
        if (item.class == "lab") {
            let newLabOption = document.createElement("option")
            newLabOption.setAttribute("value", item.id)
            newLabOption.innerText = item.name
            labsSelector.appendChild(newLabOption)
        }
    }
}