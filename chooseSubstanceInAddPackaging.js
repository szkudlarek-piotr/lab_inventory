function chooseSubstance(id, name, cas) {
    let substanceIdDiv = document.getElementById("idOfChosenSubstance")
    let chosenSubstanceNameDive = document.getElementById("nameOfChosenSubstance")
    let chosenSubstanceCasDiv = document.getElementById("casOfChosenSubstance")
    substanceIdDiv.innerText = id
    chosenSubstanceNameDive.innerText = name
    chosenSubstanceCasDiv.innerText = cas
    clearSuggestedSubstances()
}