"use strict"

var kort= require('dawa-kort');

var map;

function main() { 
  fetch('/getticket').then(function (response) {
    response.text().then(function (ticket) {      
      map= kort.viskort('map', ticket);
    })
  });  
}

main();