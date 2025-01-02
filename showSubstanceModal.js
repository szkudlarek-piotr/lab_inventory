async function showSubstanceDiv(substanceId) {
    let substanceModal = document.getElementById("substanceModal")
    let modalStyle = getComputedStyle(substanceModal)
    if (modalStyle.display == "none") {
        substanceModal.style.display = "inline-block"
        
        console.log(`http://localhost:3000/substance-for-modal?substanceId=${substanceId}`)

        const substanceRequest = await fetch(`http://localhost:3000/substance-for-modal?substanceId=${substanceId}`)
        const substanceJson = await substanceRequest.json()

        let substancePhotoInModal = document.createElement("img")
        substancePhotoInModal.setAttribute("src", substanceJson["photo"])
        substanceModal.appendChild(substancePhotoInModal)

        let substanceNameInModal = document.createElement("h2")
        substanceNameInModal.innerText = substanceJson["name"]
        substanceModal.appendChild(substanceNameInModal)
        

        if (substanceJson["packages"].length > 0) {

            let tableWoContent = `
            <tr>
                <th>Lab</th>
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
                
                let labCell = packageRow.insertCell()
                labCell.innerText = package["lab"]

                let shelfCell = packageRow.insertCell()
                shelfCell.innerText = package["shelf"]

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
        else {
            substanceModal.innerHTML += `<h1>Tej susbtancji nie mamy!</h1>`
        }
    }
}