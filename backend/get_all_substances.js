const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()
async function get_all_subs() {
    const [all_subs] = await pool.query("SELECT * FROM substances")
    console.log(all_subs)
}
get_all_subs()