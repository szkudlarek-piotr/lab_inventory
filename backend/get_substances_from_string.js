const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()
async function get_all_subs(checked_string) {
    const formattedString = `%${checked_string}%`;
    const query_text = "SELECT id, name, cas, formula, CID FROM substances WHERE name LIKE ?"
    const [all_subs] = await pool.query(query_text, [formattedString])
    return all_subs
}
module.exports = get_all_subs