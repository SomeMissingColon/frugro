var axios = require('axios');
const j2cp = require('json2csv').Parser;
const fs = require('fs')
query = 'olive oil'
var data = JSON.stringify({
  "pagination": {
    "from": 0,
    "size": 48
  },
  "banner": "maxi",
  "cartId": "0a1b1148-52bf-453d-be42-0e3bd052f12b",
  "lang": "en",
  "date": "18022023",
  "storeId": "8675",
  "pcId": "8040cfe9-0bf1-4c00-8949-8751d41b9378",
  "pickupType": "DELIVERY",
  "offerType": "ALL",
  "term": query,
  "userData": {
    "domainUserId": "3ae9866f-7403-4653-a5e1-f01789cdc5c2",
    "sessionId": "0a3c682b-f526-4d41-a952-ed1a5988a5ca"
  }
});

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://api.pcexpress.ca/product-facade/v3/products/search',
  headers: { 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0', 
    'Accept': 'application/json, text/plain, */*', 
    'Accept-Language': 'en', 
    'Accept-Encoding': 'gzip, deflate, br', 
    'Content-Type': 'application/json', 
    'Site-Banner': 'maxi', 
    'x-apikey': '1im1hL52q9xvta16GlSdYDsTsG0dmyhF', 
   'sentry-trace': 'd3a3de4706f64bd592f3722aeb9a92b7-9 02984e6705b3860-1', 
    'Origin': 'https://www.maxi.ca', 
    'Connection': 'keep-alive', 
    'Referer': 'https://www.maxi.ca/', 
    'Sec-Fetch-Dest': 'empty', 
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Site': 'cross-site', 
    'Cookie': 'ADRUM_BT1=R%3A20%7Ci%3A557809%7Ce%3A160%7Cd%3A163; ADRUM_BTa=R%3A20%7Cg%3Acb32c2ab-6aa6-47d0-8bbd-cffdf8441b8a%7Cn%3Alblw_afe7f4d6-4637-4e11-95bb-0a169ff97498; SameSite=None'
  },
  data : data
};

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
