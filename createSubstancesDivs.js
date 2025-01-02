function createSubstancesDivs(substancesJson) {
            
    for (substance of substancesJson) {
        let placeForSubstancesDivs = document.getElementById("chemicalsResultsField")
        let createdSubstanceDiv = document.createElement("div")
        createdSubstanceDiv.setAttribute("class", "substanceDiv")
        createdSubstanceDiv.setAttribute("onclick", `showSubstanceDiv(${substance.id})`)
        placeForSubstancesDivs.appendChild(createdSubstanceDiv)

        
        let substancePhoto = document.createElement("img")
        substancePhoto.setAttribute("src", substance.image)
        substancePhoto.setAttribute("class", "substancePhoto")
        createdSubstanceDiv.appendChild(substancePhoto)

        let nameOfSubstanceDiv = document.createElement("div")
        nameOfSubstanceDiv.innerText = substance.name
        nameOfSubstanceDiv.setAttribute("class", "nameOfSubstanceDiv")
        createdSubstanceDiv.appendChild(nameOfSubstanceDiv)

        if (substance.cas != "" && substance.cas != null && substance.cas != "?") {
            let casNumberDiv = document.createElement("div")
            casNumberDiv.setAttribute("class", "casOfSubstanceDiv")
            casNumberDiv.innerText = `CAS : ${substance.cas}`
            createdSubstanceDiv.appendChild(casNumberDiv)
        }
    }
}