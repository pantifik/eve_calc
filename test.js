'use strict'

/*import Table from './frontEnd/table.js';
import {createItemStorage, Item} from './frontEnd/item.js';*/
import Calculator from './frontEnd/calculator.js';

document.addEventListener('DOMContentLoaded', function() {
  let a = new Calculator();
  
  let calc = document.getElementById('calc').addEventListener('click', buttonClick);

  function buttonClick(event) {
    if ( !event.target.tagName === 'BUTTON' ) return;
    a. calculate(+event.target.name);
  }

  
  /*function calculate(idItem) {

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
                          quantity:         'Количество',
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
      let components = item.getComponents();
      let res = calculateReaction(item).map(function(val) {
        if (components[val.id]) {
          val.attributes = {
            'data-itemId': val.id
          };
        }
        return val;
      });
      table.show(table.addRow(res));
      
      table.tbody.addEventListener('click', function(event) {
        let target = event.target;
        let itemId;
        while (target != this) {
          if (target.tagName == 'TR') {
          itemId = +target.getAttribute('data-itemId');
          let a = calculate(itemId);
          console.log(a);
          return;
          }
          target = target.parentNode;
        }
      });
    }

    function calculateReaction (item) {
      let rows = [],
          cost = 0,
          productionCost = 0;

      rows.push({
                  id:           item.id,
                  name:         item.name,
                  quantity:     item.quantity, 
                  medianPrice:  item.medianBuy
                }
      );

      for (let key in item.components) {
        cost = item.components[key].medianBuy * item.components[key].quantity;
        rows.push({
                   id:              key,
                   name:            item.components[key].name,
                   quantity:        item.components[key].quantity,
                   medianPrice:     item.components[key].medianBuy,
                   productionCost:  cost
                  }
        );
        productionCost += cost;
      }

      rows[0].productionCost = +( (productionCost/item.quantity).toFixed(2) );

      return rows;
    }

    return 1;
  }*/

})
