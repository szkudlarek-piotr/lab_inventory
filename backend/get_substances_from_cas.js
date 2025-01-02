const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()
async function getSubstancesFromCas(cas_string) {
    const formattedString = `%${cas_string}%`;
    const query_text = "SELECT id, name, cas, formula, CID FROM substances WHERE cas LIKE ?"
    const [all_subs] = await pool.query(query_text, [formattedString])
    console.log(all_subs)
    return all_subs
}
getSubstancesFromCas("99685-96-8")