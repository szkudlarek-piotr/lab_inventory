const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function getLabs() {
    let returnedArr = []
    const labsReqText ="SELECT * FROM labs"
    const [labsList] = await pool.query(labsReqText)
    for (lab of labsList) {
        const newDict = {"id": lab.id, "name": lab.lab_name}
        returnedArr.push(newDict)
    }
    return returnedArr
}
module.exports = getLabs