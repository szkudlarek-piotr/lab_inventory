const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000
const getShelvesAndLabs = require("./get_shelves_and_labs.js")
const getSubstancesFromString = require("./get_substances_from_string.js")
const addPackaging = require("./addNewPackage.js")
const getDetailsForSubstanceModal = require('./getInfoForSubstanceModal.js')
const getSubsDetailsWithImage = require("./get_subs_from_string_w_image.js")

app.get('/substances', async (req, res) =>{
  const deliveredString = req.query.substanceString
  res.send(deliveredString)
})

app.get('/shelves-and-labs', async (req, res) =>{
  const shelvesList = await getShelvesAndLabs()
  res.send(shelvesList)
})

app.get('/subs-from-string', async(req, res) => {
  const substanceString = req.query.substanceString
  const returnedListOfSubstances = await getSubstancesFromString(substanceString)
  res.send(returnedListOfSubstances)
})

app.get('/substance-for-modal', async(req, res) =>{
    const substanceId = req.query.substanceId
    const dataToSend = await getDetailsForSubstanceModal(substanceId)
    res.send(dataToSend)
  }
)

app.post('/add-packaging', async (req, res) => {
  const labId = req.query.lab;
  const shelfId = req.query.shelf;
  const substanceId = req.query.substance;
  const mass = req.query.mass;
  const amount = req.query.amount;
  const adnotations = req.query.adnotations;
  const purity = req.query.purity;
  const producer = req.query.producer;

  try {
      console.log("Rozpoczynam wstawianie nowego pakietu...");
      await addPackaging(labId, shelfId, substanceId, mass, adnotations, amount, purity, producer);
      console.log("Wstawianie zakończone pomyślnie!"); // Ta linia powinna się wykonać po sukcesie
      res.send("1"); // Wysyłamy odpowiedź
  } catch (error) {
      console.error("Błąd w trakcie obsługi dodawania pakietu:", error.message);
      res.status(500).send("Błąd serwera: " + error.message); // Wysyłamy błąd do klienta
  }
});

app.get('/search-substance-by-name', async (req, res) => {
  const substanceString = req.query.substanceString
  const returnedListOfSubstances = await getSubsDetailsWithImage(substanceString)
  res.send(returnedListOfSubstances)
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  })



  