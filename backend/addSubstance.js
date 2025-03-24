const mysql = require('mysql2');
const { error } = require('selenium-webdriver');
const { ConsoleLogEntry } = require('selenium-webdriver/bidi/logEntries');
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function addSubtance(name, cas, alternativeNames, formula, cid) {
    console.log(name)
    console.log(cas)
    console.log(alternativeNames)
    console.log(formula)
    console.log(cid)
    const queryText = "INSERT INTO `substances` (`id`, `name`, `cas`, `alt_name`, `formula`, `CID`) VALUES (NULL, ?, ?,  ?, ?, ?)"
    try {
        const [postRequest] = await pool.query(queryText, [name, cas, alternativeNames, formula, cid])
        return postRequest
    }
    catch (error) {
        console.log("Nie udało się dodać substancji")
        throw  error
    }
}
module.exports = addSubtance
