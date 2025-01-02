const mysql = require('mysql2')
const getSubstancePhoto = require('./getSubstancePhotoFromId.js')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function getInfoForSubstanceModal(substanceId) {
    const reqText = `
    SELECT labs.lab_name AS lab_name, shelves.shelf_name AS shelf_name, substances.id AS substanceId, substances.name as substance_name, substances.cas AS cas, chemicals_packagings.mass AS mass, chemicals_packagings.uwagi AS adnotations, chemicals_packagings.amount AS amount, chemicals_packagings.purity AS purity 
    FROM chemicals_packagings 
    JOIN labs ON chemicals_packagings.lab_id = labs.id 
    JOIN shelves ON shelves.id = chemicals_packagings.shelf_id
    JOIN substances ON substances.id = chemicals_packagings.substance_id
    WHERE substances.id = ?`

    try {
        const [substancePackagings] = await pool.query(reqText, [substanceId])
        const substanceName = substancePackagings[0]["substance_name"]
        const substanceCas = substancePackagings[0]["cas"]
        const returnedObject = {"photo": getSubstancePhoto(substanceId), "name": substanceName, "cas": substanceCas, "packages": []}
        for (package of substancePackagings) {
            const objectToAdd = {"lab": package["lab_name"], "shelf": package["shelf_name"], "mass": package["mass"], "adnotations": package["adnotations"], "amount": package["amount"], "purity": package["purity"]}
            returnedObject["packages"].push(objectToAdd)
    
        }
        return returnedObject
    }
    catch {
        const notInLabReqText = `SELECT name, cas FROM substances WHERE id = ?`
        const [notInLabReq] = await pool.query(notInLabReqText, [substanceId])
        const returnedObject = {"photo": getSubstancePhoto(substanceId), "name": notInLabReq[0].name, "cas": notInLabReq[0].cas, "packages": []}
        return returnedObject    
    }


}
module.exports = getInfoForSubstanceModal