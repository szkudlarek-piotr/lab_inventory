const mysql = require('mysql2')
require('dotenv').config();
const getPhotoFromId = require('./getSubstancePhotoFromId.js')

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()
async function getSubstancesFromCas(cas_string) {
    const returnedArr = []
    const formattedString = `%${cas_string}%`;
    const query_text = "SELECT id, name, cas, formula, CID FROM substances WHERE cas LIKE ?"
    const [all_subs] = await pool.query(query_text, [formattedString])
    for (substance of all_subs) {
        let substanceObj = {"name": substance.name, "cas": substance.cas, "id": substance.id, "image": getPhotoFromId(substance.id), "formula": substance.formula}
        returnedArr.push(substanceObj)
    }
    return returnedArr
}
module.exports = getSubstancesFromCas