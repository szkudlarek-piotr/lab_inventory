const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function getShelves(lockerId) {
    let returnedArr = []
    const shelvesReqText ="SELECT id, shelf_name FROM shelves WHERE locker_id = ?"
    const [shelvesList] = await pool.query(shelvesReqText, [lockerId])
    for (shelf of shelvesList) {
        const newDict = {"id": shelf.id, "name": shelf.shelf_name}
        returnedArr.push(newDict)
    }
    return returnedArr
}
module.exports = getShelves