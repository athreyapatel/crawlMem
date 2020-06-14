//iban website, crawl the table
const { Worker, isMainThread, parentPort } = require('worker_threads');
const axios = require('axios');
const cheerio = require('cheerio');

let workDir = __dirname + '/dbWorker.js';

const mainFunc = async () => {
  const url = 'https://www.iban.com/exchange-rates';
  let res = await fetchData(url);
  if (!res.data) {
    console.log('Invalid data');
    return;
  }
  const html = res.data;
  let dataObject = new Object();
  const $ = cheerio.load(html);
  const statsTable = $(
    '.table.table-bordered.table-hover.downloads > tbody > tr'
  );
  statsTable.each(function () {
    let title = $(this).find('td').text();
    let newStr = title.split('\t'); //convert text to array
    newStr.shift(); //strip off empty arrat at index 0
    formatStr(newStr, dataObject); //format array string and store in object
    console.log(title);
  });
  return dataObject;
};

mainFunc().then((res) => {
  const worker = new Worker(workDir);
  console.log('Sendind to dbworker the data');
  // send formated data to worker threads
  worker.postMessage(res);
  worker.on('message', (message) => {
    console.log(message);
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

function formatStr(arr, dataObject) {
  //format using regex ihateregex.com ..lol match all the words before the first digit
  let regExp = /[^A-Z]*(^\D+)/;
  let newArr = arr[0].split(regExp);
  dataObject[newArr[1]] = newArr[2];
}
