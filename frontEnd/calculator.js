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
    let self        = this;
        this.item   = new Item(idItem);
        this.table  = new Table(this.config.table);

    this.item.state
      .then(calculateReaction)
      .then(rows => {
        let components = this.item.getComponents();

        rows = rows.map(function(val) {
          if (components[val.id]) {
            val.attributes = {
              'data-itemId': val.id
            };
          }
          return val;
        });

        this.table.addRow(rows);
        this.table.show();
        return rows;
      })
      .then(rows => {
        this.table.tbody.addEventListener('click', addCalculation);
      })
      .catch( err => console.error(new Error(err)) );

    function calculateReaction (item) {
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

    function addCalculation(event) {
      self.calculate(getTargetItemId(event));

      function getTargetItemId(event) {
        let target = event.target

        while (target != this) {
          if (target.tagName == 'TR') {
          return +target.getAttribute('data-itemId');
          }
          target = target.parentNode;
        }
      }
    }

    function updateResult(tableRow) {
    //todo
    }
  }

}