const cheerio = require('cheerio');
const axios = require('axios');

async function fetchAndParse() {
    const { data } = await axios.get('https://pubchem.ncbi.nlm.nih.gov/compound/Hydrazine-Sulfate')

    const $ = cheerio.load(data)
    const title = $('title').text()
    const compoundName = title.split(" | ")[0]
    const sumFormula = title.split(" | ")[1]
    const cid = title.split(" -")[0].split("CID ")[1]
    console.log(compoundName)
    console.log(sumFormula)
    console.log(cid)
}

fetchAndParse();