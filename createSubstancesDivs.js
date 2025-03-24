function createSubstancesDivs(substancesJson) {

    function addSubscriptToChemicalFormula(chemicalFormulaString) {
        let alreadyNumeric = false
            let printedFormula = ""
            for (character of chemicalFormulaString) {
                if (!(character >= '0' && character <= '9')) {
                    if (alreadyNumeric == false) {
                        printedFormula += character
                    }
                    if (alreadyNumeric == true) {
                        printedFormula += `</sub>${character}`
                        alreadyNumeric = false
                    }
                }
                else {
                    if (alreadyNumeric == true) {
                        printedFormula += `${character}`
                    }
                    if (alreadyNumeric == false) {
                        printedFormula += `<sub>${character}`
                        alreadyNumeric = true
                    }
                }
        
            }
        if (alreadyNumeric == true) {
            printedFormula += "</sub>"
        }
        return printedFormula
    }
            
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
        if (substance.formula != "" && substance.formula != null) {

            const chemicalFormulaString = substance.formula
            const printedFormula  = addSubscriptToChemicalFormula(chemicalFormulaString)
            let formulaDiv = document.createElement("div")
            formulaDiv.setAttribute("class", "formulaInSearchedSubstanceDiv")
            formulaDiv.innerHTML = `${printedFormula}`
            createdSubstanceDiv.appendChild(formulaDiv)
        }
    }
}