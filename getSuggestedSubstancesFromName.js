async function getSuggestedSubstancesFromName() {
            
    let nameInputValue = document.getElementById("chemicalsSerachName").value
    clearResultsField()
    if (nameInputValue.length > 1) {
        
        const searchRequest = await fetch(`http://localhost:3000/search-substance-by-name?substanceString=${nameInputValue}`)
        
        const matchingSubstancesJson = await searchRequest.json()
        createSubstancesDivs(matchingSubstancesJson)
    }
}