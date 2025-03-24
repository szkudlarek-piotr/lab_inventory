const mysql = require('mysql2')
const getSubstancePhoto = require('./getSubstancePhotoFromId.js')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function checkSubstance(substanceId) {
    const reqText = `SELECT substances.id, substances.name, substances.cas, shelves.shelf_name, chemicals_packagings.mass, chemicals_packagings.amount FROM chemicals_packagings JOIN substances ON substances.id = chemicals_packagings.substance_id JOIN shelves ON shelves.id = chemicals_packagings.shelf_id WHERE chemicals_packagings.substance_id = ?`
    const [substanceReq] = await pool.query(reqText, [substanceId])
    return substanceReq
}
module.exports = checkSubstance