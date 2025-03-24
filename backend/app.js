const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000
const getShelvesAndLabs = require("./get_shelves_and_labs.js")
const addPackaging = require("./addNewPackage.js")
const getDetailsForSubstanceModal = require('./getInfoForSubstanceModal.js')
const getSubsDetailsWithImage = require("./get_subs_from_string_w_image.js")
const getSubstancesByCas = require('./get_substances_from_cas.js')
const addSubstance = require('./addSubstance.js')
const getSubsFromString = require('./getSubsFromString.js')
const checkSubstance = require('./checkSubstance.js')
const getLabs = require('./get_labs.js')
const getLockers = require('./get_lockers.js')
const getShelves = require('./get_shelves.js')

app.get('/check-substance', async(req, res) => {
  const substanceId = req.query.substanceId
  const substanceInfo = await checkSubstance(substanceId)
  res.send(substanceInfo)
})
app.get('/substances', async (req, res) =>{
  const deliveredString = req.query.substanceString
  res.send(deliveredString)
})

app.get('/shelves-and-labs', async (req, res) =>{
  const shelvesList = await getShelvesAndLabs()
  res.send(shelvesList)
})


app.get('/substance-for-modal', async(req, res) =>{
    const substanceId = req.query.substanceId
    const dataToSend = await getDetailsForSubstanceModal(substanceId)
    res.send(dataToSend)
  }
)

app.get('/subs-from-string', async(req, res) => {
  const substanceString = req.query.substanceString
  const response = await getSubsFromString(substanceString)
  res.send(response)
})

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
      await addPackaging(shelfId, substanceId, mass, adnotations, amount, purity, producer);
      console.log("Wstawianie zakończone pomyślnie!"); // Ta linia powinna się wykonać po sukcesie
      res.send("1"); // Wysyłamy odpowiedź
  } catch (error) {
      console.error("Błąd w trakcie obsługi dodawania pakietu:", error.message);
      res.status(500).send("Błąd serwera: " + error.message); // Wysyłamy błąd do klienta
  }
});

app.post('/add-substance', async(req,res) => {
  const substanceName = req.query.name
  const casNumber = req.query.cas
  const alternativeNames = req.query.alternative_names
  const formula = req.query.formula
  const cid = req.query.cid
  try {
    const returnedStatus = await addSubstance(substanceName, casNumber, alternativeNames, formula, cid)
    console.log(returnedStatus)
    res.send(returnedStatus)
  }
  catch (error) {
    console.log(error.message)
  }
})

app.get('/search-substance-by-name', async (req, res) => {
  const substanceString = req.query.substanceString
  const returnedListOfSubstances = await getSubsDetailsWithImage(substanceString)
  res.send(returnedListOfSubstances)
})

app.get('/get-labs', async(req, res)=> {
  const listOfLabs = await getLabs()
  res.send(listOfLabs)
})

app.get('/get-lockers', async(req, res) => {
  const labId = req.query.labId
  const lockersList = await getLockers(labId)
  res.send(lockersList)
})

app.get('/get-shelves', async(req, res) => {
  const lockerId = req.query.lockerId
  const shelvesList = await getShelves(lockerId)
  res.send(shelvesList)
})

app.get('/search-substance-by-cas', async (req, res) => {
  const casString = req.query.casString
  const returnedListOfSubstances = await getSubstancesByCas(casString)
  res.send(returnedListOfSubstances)
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  })



  