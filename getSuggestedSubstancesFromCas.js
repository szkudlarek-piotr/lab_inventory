async function getSuggestedSubstancesFromCas() {
            
    let casInputValue = document.getElementById("chemicalsSerachCAS").value
    clearResultsField()
    if (casInputValue.length > 1) {
        
        const searchRequest = await fetch(`http://localhost:3000/search-substance-by-cas?casString=${casInputValue}`)
        const matchingSubstancesJson = await searchRequest.json()
        createSubstancesDivs(matchingSubstancesJson)
    }
}