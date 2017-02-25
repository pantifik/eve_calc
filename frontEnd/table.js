'use strict'

export default class Table{
  constructor(obj) {
    /*
        .classes {}
          .table
          .thead
          .tbody
          .tfooter
          .row
          .cell
        .colName {}
          key = .classes.cell
    */
    this.table    = document.createElement('TABLE');
    this.thead    = this.table.createTHead();
    this.tbody    = this.table.createTBody();
    this._config   = Object.assign({}, obj);
  }

  addRow(obj) {
    let self = this;

    if (Array.isArray(obj)){
      return obj.map(function(value) {return self.addRow(value)});
    }
    
    let row = this.tbody.insertRow();
    if (obj.attributes) {
      for (let key in obj.attributes) {
        row.setAttribute(`${key}`, obj.attributes[key]);
      }
    }
    
    this._config.classes.forEach(function(value){
      let cell = document.createElement('TD');
      cell.className = value;
      cell.innerText = obj[value] ? obj[value] : cell.innerText = '';
      row.appendChild(cell);
    })
    return row;
  }


  addHeader() {
    let self = this;

    let row = this.thead.insertRow();
    this._config.classes.forEach(function(value){
      let cell = document.createElement('TH');
      cell.className = value;
      cell.innerText = self._config.colName[value] ? self._config.colName[value] : cell.innerText = '';
      row.appendChild(cell);
    })

    return row;
  }


  show() {
    this.addHeader.call(this);
    this._config.parent.appendChild(this.table);
    return this.table;
  }

}