const fs = require('fs');
let new_results = JSON.parse(fs.readFileSync('results.json'));
let db = fs.readFileSync('db.json');
let products = JSON.parse(db);

const cleanData = function(data){
    let cleaned_data = {};
    Object.keys(data).forEach(code =>{

        try{
            clean_product = {}

            ///setting up values here for easy reading
            product = data[code]
            price = product['prices']['price']['value']
            comparaisonPrice = product['prices']['comparisonPrices'][0]['value']
            
            time = new Date
            time = time.toDateString()
            /// 
            
            clean_product['code'] = code
            clean_product['name'] = product['name']
            clean_product['description'] = product['description']
            clean_product['brand'] = product['brand']
            clean_product['link'] = product['link']
            clean_product['images'] = product['imageAssets']
            clean_product['prices'] = [[price,time]]
            clean_product['comparatorPrice'] = comparaisonPrice
            clean_product['format'] = product['packageSize']
            clean_product['available'] = product['shoppable']
            
            //adding the product
            cleaned_data[product['code']] = clean_product
        }catch(err){

            console.log("could not process product at https://www.maxi.ca"+product['link'])
            console.log(err)
            
            delete data[product['code']]
        }
    })
   
    
    
    return cleaned_data;
};


var addPricePoint = function(id,record){
    try{
        price_point = record['prices'][0];
        console.log(price_point)
        products[id]['prices'].push(price_point);
    }catch(err){
        console.log(err);
        console.log(products[id]);
    };
};



var processData = function(data){
    Object.keys(data).forEach(code=>{
        var product = data[code]
        if (code in products){
            addPricePoint(code, product)
            
        }else{
            products[code] = product
        }
    }); 
    var sample_db = products['20081865_EA']
    var sample_results = data['20081865_EA']
    
    
    fs.writeFileSync('db.json',JSON.stringify(products))

};
var new_clean_results = cleanData(new_results);
processData(new_clean_results)