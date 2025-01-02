function closeSubstanceModal() {
    let substanceModal = document.getElementById("substanceModal")
    substanceModal.style.display = "none"
    let childrenOfSubstanceModal = substanceModal.children
    let childrenOfSubstanceModalLen = childrenOfSubstanceModal.length
    if (childrenOfSubstanceModal.length > 1) {
        do {
            substanceModal.removeChild(childrenOfSubstanceModal[1])
            childrenOfSubstanceModalLen = childrenOfSubstanceModal.length
        }
        while (childrenOfSubstanceModalLen > 1)
    }
}