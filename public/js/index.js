"use strict"

var kort= require('dawa-kort')
  , dawalautocomplete= require('./dawa-leaflet-autocomplete.js')
  , dawalgrafik= require('./dawa-leaflet-grafik.js')
  , dawautil= require('dawa-util');

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
    callback: nærmesteAdgangsadresse
  },
  {
    text: 'Bygning?',
    callback: nærmeste('bygninger')
  },
  {
    text: 'Tekniske anlæg?',
    callback: nærmeste('tekniskeanlaeg')
  }
  // {
  //   text: 'Bebyggelse?',
  //   callback: bebyggelse
  // },
  // {
  //   text: 'Kommune?',
  //   callback: visKommune
  // }, '-',{
  //   text: 'Centrer kort her',
  //   callback: centerMap
  // }
  ]
}


function nærmesteAdgangsadresse(e) {
  fetch(dawautil.danUrl("https://dawa.aws.dk/adgangsadresser/reverse",{format: 'geojson', x: e.latlng.lng, y: e.latlng.lat, medtagugyldige: true}))
  .catch(function (error) {
    alert(error.message);
  })
  .then(function(response) {
    if (response.status >=400 && response.status <= 499) {
      response.json().then(function (object) {
        alert(object.type + ': ' + object.title);
      });
    }
    else if (response.status >= 200 && response.status <=299 ){
      return response.json();
    }
  }) 
  .then( function ( adgangsadresse ) { 
    var geojsonlayer= L.geoJson(adgangsadresse, {style: dawalautocomplete.style, onEachFeature: dawalautocomplete.eachFeature, pointToLayer: dawalautocomplete.pointToLayer(dawalautocomplete.style)});
    geojsonlayer.addTo(map);
  })
};


function nærmeste(ressource) {
  return function (e) {
    fetch(dawautil.danUrl("https://dawa.aws.dk/ois/"+ressource,{format: 'geojson', x: e.latlng.lng, y: e.latlng.lat, medtagugyldige: true}))
    .catch(function (error) {
      alert(error.message);
    })
    .then(function(response) {
      if (response.status >=400 && response.status <= 499) {
        response.json().then(function (object) {
          alert(object.type + ': ' + object.title);
        });
      }
      else if (response.status >= 200 && response.status <=299 ){
        return response.json();
      }
    }) 
    .then( function ( bygning ) { 
      var style=  dawalgrafik.getDefaultStyle(bygning);
      var geojsonlayer= L.geoJson(bygning, {style: style, onEachFeature: dawalgrafik.eachFeature, pointToLayer: dawalgrafik.pointToLayer(style)});
      geojsonlayer.addTo(map);
    //  map.fitBounds(geojsonlayer.getBounds());
    })
  };
}

function main() { 
  fetch('/getticket').then(function (response) {
    response.text().then(function (ticket) {      
      map= kort.viskort('map', ticket, options);
      dawalautocomplete.search().addTo(map);
    })
  });  
}

main();