'use strict'

import {Item} from './frontEnd/item.js';
import Table from './frontEnd/table.js';
import {getName} from './frontEnd/inside/requestInside.js'



document.addEventListener('DOMContentLoaded', function() {
  let calc = document.getElementById('calc').addEventListener('click', buttonClick);

  function buttonClick(event) {
    if ( !event.target.tagName === 'BUTTON' ) return;
    calculate(+event.target.name);
  }
  

  function calculate(idItem) {
    let tableConfig = {
                        parent: document.getElementById('result'),
                        classes: [
                          'name',
                          'quantity',
                          'medianPrice',
                          'productionCost'
                        ],
                        colName: {
                          name:             'Название',
                          quantity:         'Колличество',
                          medianPrice:      'Средняя цена',
                          productionCost:   'Стоимость Производства'
                        }
                      };

    let item  = new Item(idItem),
        table = new Table(tableConfig);

    item.state
      .then(show)
      .catch( err => console.error(new Error(err)) );
    

    function show(item) {
          
          table.show(table.addRow(calculateReaction(item)));
    }

    function calculateReaction (item) {
      let rows = [],
          cost = 0,
          productionCost = 0;

      rows.push({
                  name:         item.name,
                  quantity:     item.quantity, 
                  medianPrice:  item.medianBuy
                }
      );
      for (let key in item.components) {
        cost = item.components[key].medianBuy * item.components[key].quantity;
        rows.push({
                   name:            item.components[key].name,
                   quantity:        item.components[key].quantity,
                   medianPrice:     item.components[key].medianBuy,
                   productionCost:  cost
                  }
        );
        productionCost += cost;
      }

      rows[0].productionCost = productionCost;

      return rows;
    }
  }

})
