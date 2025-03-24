async function addNewPackaging() {
    const chosenShelf = document.getElementById("shelvesSelector").value
    const substanceId = document.getElementById("idOfChosenSubstance").textContent
    const adnotationsToSend = document.getElementById("adnotationsInput").value
    const amountToSend = document.getElementById("amountInput").value
    const massToSend = document.getElementById("massInput").value
    const purityToSend = document.getElementById("purityInput").value
    const producerToSend = document.getElementById("producerInput").value

    if (isInt(amountToSend)) {
        const postParams = new URLSearchParams({
            shelf: chosenShelf,
            substance: substanceId,
            mass: massToSend,
            amount: amountToSend,
            adnotations: adnotationsToSend,
            purity: purityToSend,
            producer: producerToSend
        })
        const urlToSend = `http://localhost:3000/add-packaging?${postParams.toString()}`

        try {
            let postRequest = await fetch(urlToSend, { method: "POST" })

            if (!postRequest.ok) {
                throw new Error(`Błąd serwera: ${postRequest.status} ${postRequest.statusText}`)
            }

            console.log("Udało się dodać! Jupi!")
            
            document.getElementById("amountInput").value = "1"
            document.getElementById("massInput").value = ""
            document.getElementById("purityInput").value = ""
            document.getElementById("producerInput").value = ""
            document.getElementById("idOfChosenSubstance").innerText = ""
            document.getElementById("nameOfChosenSubstance").innerText = ""
            document.getElementById("casOfChosenSubstance").innerText = ""

        } catch (error) {
            console.log("Hmmmm... coś się nie powiodło....")
            console.error("Szczegóły błędu:", error.message)
        }
    } else {
        alert("Podana przez Ciebie liczba opakowań nie jest liczbą naturalną!")
    }
}   