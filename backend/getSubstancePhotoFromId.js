const fs = require('fs')
const path = require('path')
function getPhotoFromSubstanceId(substanceId) {
    const pngPath = path.join(__dirname, "images", substanceId + ".png")
    const avifPath = path.join(__dirname, "images", substanceId + ".avif")
    const noImagePath = path.join(__dirname, "images", "no_image.png")
    if (fs.existsSync(pngPath)) {
        return pngPath
    }
    else if (fs.existsSync(avifPath)) {
        return avifPath
    }
    else {
        return noImagePath
    }
}
module.exports = getPhotoFromSubstanceId