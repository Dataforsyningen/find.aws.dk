"use strict";

var kort= require('dawa-kort')
  , dawalautocomplete= require('./dawa-leaflet-autocomplete.js');

var map;

function getMap() {
  return map;
}

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
    callback: kort.nærmesteAdgangsadresse(getMap)
  },
  {
    text: 'Bygning?',
    callback: kort.nærmesteBygning(getMap)
  },
  {
    text: 'Vej?',
    callback: kort.nærmesteVejstykke(getMap)
  },
  {
    text: 'Hvor?',
    callback: kort.hvor(getMap)
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


if (navigator.geolocation) {
  options.contextmenuItems.push(
    {
      text: 'Placering?',
      callback: 
        function () {        
          navigator.geolocation.getCurrentPosition(function (position) {
            map.setView(L.latLng(position.coords.latitude, position.coords.longitude),12);
          });
        }
    }
  )
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

