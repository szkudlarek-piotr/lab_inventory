async function addLabs() {

    const  labsReq = await fetch("http://localhost:3000/get-labs")
    const listOfLabs = await labsReq.json()
    let labsSelector = document.getElementById("labsSelector")
    for (lab of listOfLabs) {
        let newLabOption = document.createElement("option")
        newLabOption.setAttribute("value", lab.id)
        newLabOption.innerText = lab.name
        labsSelector.appendChild(newLabOption)
    }
    document.getElementById("labsSelector").value = ""
}