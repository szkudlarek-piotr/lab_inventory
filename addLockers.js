async function addLockers() {
    
    const allShelvesOptions = document.getElementsByClassName("shelfOption")
    const numberOfShelvesOptions = allShelvesOptions.length
    console.log(`Mamy ${numberOfShelvesOptions} półek w tym labie.`)
    if (numberOfShelvesOptions > 0) {
        for (i=0; i<numberOfShelvesOptions; i++) {
            let elementToRemove = allShelvesOptions[0]
            elementToRemove.remove()
        }
    }

    
    const allLockerOptions = document.getElementsByClassName("lockerOption")
    const numberOfLockerOptions = allLockerOptions.length
    if (numberOfLockerOptions > 0) {
        for (i=0; i<numberOfLockerOptions; i++) {
            let elementToRemove = allLockerOptions[0]
            elementToRemove.remove()
        }
    }

    const labId = document.getElementById("labsSelector").value
    const lockersReq = await fetch(`http://localhost:3000/get-lockers?labId=${labId}`)
    const listOfLockers = await lockersReq.json()
    let lockersSelector = document.getElementById("lockersSelector")
    for (locker of listOfLockers) {
        let newLockerOption = document.createElement("option")
        newLockerOption.setAttribute("value", locker.id)
        newLockerOption.setAttribute("class", "lockerOption")
        newLockerOption.innerText = locker.name
        lockersSelector.appendChild(newLockerOption)
    }
    lockersSelector.value= ""
}