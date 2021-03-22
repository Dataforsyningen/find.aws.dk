"use strict";

var kort= require('dawa-kort')
  , dawalautocomplete= require('./dawa-leaflet-autocomplete.js');

var map;

function getMap() {
  return map;
}


function visKoordinater (e) {
  var parametre= {};
  parametre.x= e.latlng.lng; 
  parametre.y= e.latlng.lat; 
  var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent('<p>Koordinater<br/>(' + parametre.x + ', ' + parametre.y + ')</p>')
    .openOn(getMap());
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
    callback: kort.nærmesteNavngivneVej(getMap)
  },
  {
    text: 'Hvor?',
    callback: kort.hvor(getMap)
  },
  {
    text: 'Koordinater?',
    callback: visKoordinater
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
          function success(position) {
            map.setView(L.latLng(position.coords.latitude, position.coords.longitude),12);
          };
          function error(err) {
            console.warn('ERROR(${err.code}): ${err.message}');
          }      
          navigator.geolocation.getCurrentPosition(success,error);
        }
    }
  )
};

var token = 'd902ac31b1c3ff2d3e7f6aa7073c6c67';

function main() { 
  map= kort.viskort('map', token, options);
  dawalautocomplete.search().addTo(map);
  var center= kort.beregnCenter();
  map.setView(center,2);
}

main();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(function (registration) {
    console.log('Service Worker registration successful with scope: ',
    registration.scope)
  })
  .catch(function (err) {
    console.log('Service Worker registration failed: ', err)
  })
}

