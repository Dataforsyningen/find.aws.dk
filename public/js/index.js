"use strict";

var kort= require('dawa-kort')
  , dawalautocomplete= require('./dawa-leaflet-autocomplete.js')
 // , dawalgrafik= require('./dawa-leaflet-grafik.js')
  , dawautil= require('dawa-util')
  , URLSearchParams = require('url-search-params')  
  , dawaois= require('./dawa-ois-koder.js');

var map;

var options= {
  contextmenu: true,
  contextmenuWidth: 140,
  contextmenuItems: [
  // {
  //   text: 'Koordinater?',
  //   callback: visKoordinater
  // },
  {
    text: 'Adgangsadresse?',
    callback: kort.nærmesteAdgangsadresse
  },
  {
    text: 'Bygning?',
    callback: kort.nærmesteBygning
  },
  {
    text: 'Vej?',
    callback: kort.nærmesteVejstykke
  },
  {
    text: 'Hvor?',
    callback: kort.hvor
  }
  // {
  //   text: 'Kommune?',
  //   callback: visKommune
  // }, '-',{
  //   text: 'Centrer kort her',
  //   callback: centerMap
  // }
  ]
};

function main() { 
  fetch('/getticket').then(function (response) {
    response.text().then(function (ticket) {      
      map= kort.viskort('map', ticket, options);
      dawalautocomplete.search().addTo(map);
      var center= kort.beregnCenter();
      map.setView(center,2);
    });
  });  
}

main();

