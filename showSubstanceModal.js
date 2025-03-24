async function showSubstanceDiv(substanceId) {
    let substanceModal = document.getElementById("substanceModal")
    let modalStyle = getComputedStyle(substanceModal)
    if (modalStyle.display == "none") {
        substanceModal.style.display = "inline-block"

        
        console.log(`http://localhost:3000/substance-for-modal?substanceId=${substanceId}`)

        const substanceRequest = await fetch(`http://localhost:3000/substance-for-modal?substanceId=${substanceId}`)
        const substanceJson = await substanceRequest.json()
        console.log(substanceJson)

        let substancePhotoInModal = document.createElement("img")
        substancePhotoInModal.setAttribute("src", substanceJson["photo"])
        substancePhotoInModal.setAttribute("class", "substancePhotoInModal")
        substanceModal.appendChild(substancePhotoInModal)

        let substanceNameInModal = document.createElement("h2")
        substanceNameInModal.innerText = substanceJson["name"]
        substanceModal.appendChild(substanceNameInModal)
        

        if (substanceJson["packages"].length > 0) {
            console.log("Nie ma tej substancji.")

            let tableWoContent = `
            <tr>
                <th>Shelf</th>
                <th>Adnotations</th>
                <th>Mass</th>
                <th>Purity</th>
                <th>Amount</th>
            </tr>
        `
        let substancePackagesTable = document.createElement("table")
        substancePackagesTable.setAttribute("id", "packagesTable")
        substancePackagesTable.innerHTML = tableWoContent
        substanceModal.appendChild(substancePackagesTable)
            for (package of substanceJson["packages"]) {
                let packageRow = substancePackagesTable.insertRow()
                

                let shelfCell = packageRow.insertCell()
                shelfCell.innerText = package["shelf_name"]

                let adnotationsCell = packageRow.insertCell()
                adnotationsCell.innerText = package["adnotations"]

                let massCell = packageRow.insertCell()
                massCell.innerText = package["mass"]

                let purityCell = packageRow.insertCell()
                purityCell.innerText = package["purity"]

                let amountCell = packageRow.insertCell()
                amountCell.innerText = package["amount"]
            }
        }
    }
}