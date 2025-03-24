const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function getLockers(labId) {
    let returnedArr = []
    const lockersReqText ="SELECT id, Locker_symbol FROM lockers WHERE lab_id = ?"
    const [lockersList] = await pool.query(lockersReqText, [labId])
    for (locker of lockersList) {
        const newDict = {"id": locker.id, "name": locker.Locker_symbol}
        returnedArr.push(newDict)
    }

    return returnedArr
}
module.exports = getLockers