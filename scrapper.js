var axios = require('axios');
const j2cp = require('json2csv').Parser;
const fs = require('fs')
var axios = require('axios');
iteration = 0 
const getScrapping = function(iteration){

  try{ 
  axios(config)
  .then(function (response) {
    clean_data  = {}
    response.data['results'].forEach(product=>{
        clean_data[product['code']] = product
      })
      const json = JSON.stringify(clean_data)
      const parser = new j2cp();
      const csv = parser.parse(response.data['results']);

      fs.writeFileSync('./results.csv',csv);
      fs.writeFileSync('./results.json',json)
      

  })
  .catch(function (error) {
    console.log(error);
  });
  }catch(error){
    console.log(error)
    fs.writeFileSync('./results.csv',csv);
    fs.writeFileSync('./results.json',json)
  };
  fs.writeFileSync('./results.csv',csv);
  fs.writeFileSync('./results.json',json)
};

var data = JSON.stringify({
  "pagination": {
    "from": `${iteration}`,
    "size": 48
  },
  "banner": "maxi",
  "cartId": "0a1b1148-52bf-453d-be42-0e3bd052f12b",
  "lang": "en",
  "date": "21022023",
  "storeId": "8675",
  "pcId": "8040cfe9-0bf1-4c00-8949-8751d41b9378",
  "pickupType": "DELIVERY",
  "offerType": "ALL",
  "categoryId": "27985",
  "userData": {
    "domainUserId": "5751cbe9-d9f3-4181-afbb-1e77b6663acc",
    "sessionId": "a8ce04b0-63f9-450a-990a-7f7ce3c7c90b"
  }
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://api.pcexpress.ca/product-facade/v3/products/category/listing',
  headers: { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0', 
    'Accept': 'application/json, text/plain, */*', 
    'Accept-Language': 'en', 
    'Accept-Encoding': 'gzip, deflate, br', 
    'Content-Type': 'application/json', 
    'Site-Banner': 'maxi', 
    'x-apikey': '1im1hL52q9xvta16GlSdYDsTsG0dmyhF', 
    'sentry-trace': '331ca2d5af824acf9b7a1ea97849bc06-914c0d14dda2286c-1', 
    'Origin': 'https://www.maxi.ca', 
    'Connection': 'keep-alive', 
    'Referer': 'https://www.maxi.ca/', 
    'Sec-Fetch-Dest': 'empty', 
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Site': 'cross-site', 
    'Cookie': 'ADRUM_BT1=R%3A20%7Ci%3A557816%7Ce%3A124%7Cd%3A230; ADRUM_BTa=R%3A20%7Cg%3A83dbccbf-a576-4bb1-85cd-4eb0d8a431e9%7Cn%3Alblw_afe7f4d6-4637-4e11-95bb-0a169ff97498; SameSite=None'
  },
  data : data
};


