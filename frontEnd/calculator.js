'use strict'

import Table from './table.js';
import {createItemStorage, Item} from './item.js';

export default class Calculator{
  constructor(parentTag) {
    let config = {};
    config.table = {
                        parent: parentTag || document.getElementById('result'),
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
  this.config = config;
  }

  calculate(idItem) {
    let self   = this,
        item   = new Item(idItem),
        table  = new Table(this.config.table);

    let result = new Promise(function(resolve, reject) {
      //todo reject
      item.state
        .then(calculateReaction)
        .then(rows => {
          let components = item.getComponents();

          rows = rows.map(function(val) {
            if (components[val.id]) {
              val.attributes = {
                'data-itemId': val.id
              };
            }
            return val;
          });

          table.addRow(rows);
          table.show();
          resolve(rows[0]);
          return rows;
        })
        .then(rows => {
          table.tbody.addEventListener('click', function(event) {
            let componentPrice = addCalculation(event, table);
            //todo update react cost
          });
        })
        .catch( err => console.error(new Error(err)) );
      });

    return result;

    function calculateReaction(item) {
      let rows            = [],
          cost            = 0,
          productionCost  = 0;

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

      rows[0].productionCost = productionCost;

      return rows;
    }

    function addCalculation(event, parentTable) {
      let targetTR = getTR(event),
          result = self.calculate(+targetTR.getAttribute('data-itemId'));

      result
        .then(res => {
          updateResult(targetTR, res, parentTable);
        })
        .catch( err => console.error(new Error(err)) );
      return result;

      function getTR(event) {
        let target = event.target;

        while (target != this) {
          if (target.tagName == 'TR') {
          return target;
          }
          target = target.parentNode;
        }
      }
    }

    function updateResult(tableRow, res, parentTable) {
      let cost = 0;
      tableRow.lastChild.innerText = res.productionCost;
      let allCost = parentTable.tbody.querySelectorAll('.productionCost');
      for (let i = 1; i < allCost.length; i++) {
        cost += +allCost[i].innerText;
        console.log(+allCost[i].innerText);
      }
      allCost[0].innerText = cost;
    }
  }

}