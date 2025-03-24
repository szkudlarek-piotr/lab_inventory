const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_NAME
}).promise()

async function insertNewPackage(shelfId, substanceId, mass, adnotations, amount, purity, producer) {
    const reqText = "INSERT INTO `chemicals_packagings` (`id`, `shelf_id`, `substance_id`, `mass`, `uwagi`, `amount`, `purity`, `Producer`) VALUES (NULL, ?,  ?, ?, ?, ?, ?, ?);"
    try {
        const [result] = await pool.query(reqText, [shelfId, substanceId, mass, adnotations, amount, purity, producer]);
        console.log(`Wstawiono nowy pakiet. ID: ${result.insertId}, Zmienione wiersze: ${result.affectedRows}`);
        return result; // Zwracamy wynik dla potwierdzenia
    } catch (error) {
        console.error("Błąd podczas wstawiania nowego pakietu:", error.message);
        throw error; // Rzucamy błąd, aby kod wywołujący wiedział, że coś poszło nie tak
    }
}
module.exports = insertNewPackage

