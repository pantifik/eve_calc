'use strict'
//http://eve-marketdata.com/api/item_prices2.json?char_name=demo&type_ids=34,12068&region_ids=10000002&buysell=s



export function getPrice(id){
  return new Promise(function(resolve, reject) {
      if (typeof id === 'Array') id = id.join(',');
      let request   = new XMLHttpRequest(),
          http      = `https://api.eve-central.com/api/marketstat/json?typeid=${id}`;
      
      request.open('GET', http, true);
      
      request.send();
      request.onreadystatechange = function() { 
        if (this.readyState != 4) return;
        if (request.status != 200) {
          let error = new Error(this.statusText);
          error.code = this.status;
          reject(error);
        } else {
          let price = JSON.parse(request.responseText)[0];
          resolve(price);
        }
      }
  })

}