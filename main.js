//iban website, crawl the table

const axios = require('axios');
const cheerio = require('cheerio');


let workDir = __dirname + './dbWorker.js';

const mainFunc = ()=>{
   const url = 'https://www.iban.com/exchange-rates';
   let res = await fetchData(url);
   if(!res.data){
       console.log("Invalid data");
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
    let newStr = title.split("\t"); //convert text to array
    newStr.shift(); //strip off empty arrat at index 0
    formatStr(newStr, dataObject); //format array string and store in object
    console.log(title);
   });
   return dataObject;
}

mainFunc().then((res)=>{
    
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


