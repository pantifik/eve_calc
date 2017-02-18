'use strict'

export function getItem(id, param){

  return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.open('GET', `./backEnd/main.php?${param}=${id}`, true);
      request.send();
      request.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          reject(console.error(this.status))
        } else {
          let name;
          if (param === 'itemId') {
            name = JSON.parse(this.responseText);
          }
          resolve(name);
        }
      }
    });
  
}
