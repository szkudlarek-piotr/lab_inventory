const mysql = require('mysql2')
const getSubstancePhoto = require('./getSubstancePhotoFromId.js')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function getInfoForSubstanceModal(substanceId) {
    const reqText = `SELECT * FROM lab_inventory WHERE substance_id = ?`

    try {
        const [substancePackagings] = await pool.query(reqText, [substanceId])
        const substanceName = substancePackagings[0]["name"]
        const substanceCas = substancePackagings[0]["cas"]
        const returnedObject = {"photo": getSubstancePhoto(substanceId), "name": substanceName, "cas": substanceCas, "packages": []}
        for (package of substancePackagings) {
            const objectToAdd = {"lab": package["lab_name"], "shelf_name": package["shelf_name"], "mass": package["vessel_capacity"], "adnotations": package["adnotations"], "amount": package["number_of_vessels"], "purity": package["purity"]}
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