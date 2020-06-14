//iban website, crawl the table

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.iban.com/exchange-rates';

fetchData(url).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  const statsTable = $(
    '.table.table-bordered.table-hover.downloads > tbody > tr'
  );
  statsTable.each(function () {
    let title = $(this).find('td').text();
    console.log(title);
  });
});
async function fetchData(url) {
  console.log('Crawl Data');
  //making http call to url
  let response = await axios(url).catch((err) => console.log(err));
  if (response.status !== 200) {
    console.log('Error Occured');
    return;
  }
  return response;
}
