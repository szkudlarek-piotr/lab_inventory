const mysql = require('mysql2')
const path = require('path')
const fs = require('fs')
const getSubstancePhoto = require('./getSubstancePhotoFromId.js')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function getSubstancesWoPhoto() {
    const substancesIdReqText = "SELECT * FROM substances"
    const [substancesReq] = await pool.query(substancesIdReqText)
    for (substance of substancesReq) {
        const possiblePhotoPath = path.join(__dirname, "images", substance["id"] + ".png")
        if (getSubstancePhoto(substance.id).includes("no_image")) {
            console.log(`Dodaj zdjecie dla ${substance["name"]} o numerze ID ${substance["id"]}.`)
        }
    }
    
} 
getSubstancesWoPhoto()