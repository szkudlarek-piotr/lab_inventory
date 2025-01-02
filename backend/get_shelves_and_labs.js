const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function getShelves() {
    let returnedArr = []
    const shelvesReqText = "SELECT * FROM shelves"
    const [shelvesList] = await pool.query(shelvesReqText)
    for (shelf of shelvesList) {
        const newDict = {"class": "shelf", "id": shelf.id, "name": shelf.shelf_name}
        returnedArr.push(newDict)
    }
    const labsReqText ="SELECT * FROM labs"
    const [labsList] = await pool.query(labsReqText)
    for (lab of labsList) {
        const newDict = {"class": "lab", "id": lab.id, "name": lab.lab_name}
        returnedArr.push(newDict)
    }
    return returnedArr
}
module.exports = getShelves