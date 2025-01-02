const mysql = require('mysql2')
const getPhotoFromId = require('./getSubstancePhotoFromId.js')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()
async function get_all_subs(checked_string) {
    let returnedArr = []
    const formattedString = `%${checked_string}%`;
    const query_text = `SELECT id, name, cas, formula, CID FROM substances WHERE name LIKE ?`
    let [all_subs] = await pool.query(query_text, [formattedString])
    for (substance of all_subs) {
        let substanceObj = {"name": substance.name, "cas": substance.cas, "id": substance.id, "image": getPhotoFromId(substance.id)}
        returnedArr.push(substanceObj)
    }
    return returnedArr
}
module.exports = get_all_subs