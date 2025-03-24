const mysql = require('mysql2')
const getSubstancePhoto = require('./getSubstancePhotoFromId.js')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function getSubstanceFromString(searchInput) {
    const formatedInput = `%${searchInput}%`
    const reqText = `SELECT id, name, cas FROM substances WHERE  name LIKE ?`
    const [substancesReq] = await pool.query(reqText, [formatedInput])
    return substancesReq
}
module.exports = getSubstanceFromString