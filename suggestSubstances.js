async function suggestSubstances() {
    const deliveredString = document.getElementById("substanceInput").value
    clearSuggestedSubstances()
    if (deliveredString.length >2) {
        const substancesReq = await fetch(`http://localhost:3000/subs-from-string?substanceString=${deliveredString}`)
        const substancesJson = await substancesReq.json()
        const suggesionsListDiv = document.getElementById("substancesSuggestions")
        for (substance of substancesJson) {
            let newSubstanceSuggestion = document.createElement("div")
            newSubstanceSuggestion.setAttribute("class", "substanceSuggestion")
            let subststanceNameDiv = document.createElement("div")
            subststanceNameDiv.setAttribute("class", "substanceName")
            subststanceNameDiv.innerText = substance.name
            newSubstanceSuggestion.appendChild(subststanceNameDiv)
            let casDiv = document.createElement("div")
            casDiv.setAttribute("title", "CAS number")
            casDiv.setAttribute("class", "casNumber")
            casDiv.innerText = substance.cas
            newSubstanceSuggestion.appendChild(casDiv)
            newSubstanceSuggestion.setAttribute("onclick", `chooseSubstance("${substance.id}", "${substance.name}", "${substance.cas}")`)
            suggesionsListDiv.appendChild(newSubstanceSuggestion)
        }
    }
}