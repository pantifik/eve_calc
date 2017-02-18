'use strict'

import {getItem}    from "./inside/requestInside.js";
import {getPrice}   from './outside/requestOutside.js';


export class Item {
  constructor(id) {
    this.id = id;

    let self = this;
    
    this.state = new Promise(function(resolve, reject) {

      getItem(id, 'itemId')
      .then(res =>  {
                      return new Promise(function(resolvePrice, rejectPrice) {
                        let pricePromise = [];
                        for (let key in res) {
                          pricePromise.push(
                            getPrice(key)
                              .then(price => {
                                                res[key].price = price;
                                                res[key].medianBuy = Math.round(price.buy.median);
                                              }))
                        }
                        Promise.all(pricePromise)
                          .then( () => resolvePrice(res))
                          .catch( err => rejectPrice(new Error(err)))
                      });
                    })
      .then(res => {
        self.name = res[id].name;
        self.price = res[id].price;
        self.medianBuy = res[id].medianBuy;
        self.quantity = res[id].quantity;
        delete res[id];
        self.components = res;
        resolve(self);
      })
      .catch(err => reject(new Error(err)));
    });
  }
                      

  getMedianPrice() {

  };

  getComponents() {
      for (var key in this.components) {
        this.components[key] = new Item(+key);
      }
    return this.components;
  }
};

