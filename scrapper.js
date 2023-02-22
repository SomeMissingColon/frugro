var axios = require('axios');
var fs = require('fs')
var getPageResult = function(page,category){
  
  var data = JSON.stringify({
    "pagination": {
      "from": page,
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
    "categoryId": category,
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
      'Cookie': 'ADRUM_BT1=R%3A20%7Ci%3A557816%7Ce%3A72%7Cd%3A251; ADRUM_BTa=R%3A20%7Cg%3A6017a788-4ed0-49be-9556-a1771d3ee32e%7Cn%3Alblw_afe7f4d6-4637-4e11-95bb-0a169ff97498; SameSite=None'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    if (response.data){
      var clean_results = {}
      var pageResults = response.data['results']
      pageResults.forEach(result=>{
        clean_results[result['code']] = result
      });
      var results = JSON.parse(fs.readFileSync('results.json'))
      console.log(response.data)
      Object.assign(results,clean_results);
      fs.writeFileSync('results.json',JSON.stringify(results));
    }else{
      console.log(`finished category: ${category}`)
      
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });
  
  }
  
const categories = ['28000','28003']
categories.forEach(category=>{
  getPageResult(0,category);
  console.log('done with category')
});


