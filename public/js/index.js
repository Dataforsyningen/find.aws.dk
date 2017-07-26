"use strict"

var kort= require('dawa-kort')
  , dawalautocomplete= require('./dawa-leaflet-autocomplete.js')
  , dawalgrafik= require('./dawa-leaflet-grafik.js')
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
    callback: nærmesteAdgangsadresse
  },
  {
    text: 'Bygning?',
    callback: nærmesteBygning
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

function main() { 
  fetch('/getticket').then(function (response) {
    response.text().then(function (ticket) {      
      map= kort.viskort('map', ticket, options);
      dawalautocomplete.search().addTo(map);
    })
  });  
}

main();

function nærmesteAdgangsadresse(e) {
  fetch(dawautil.danUrl("https://dawa.aws.dk/adgangsadresser/reverse",{struktur: 'mini', x: e.latlng.lng, y: e.latlng.lat, medtagugyldige: true}))
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
    var marker= L.circleMarker(L.latLng(adgangsadresse.y, adgangsadresse.x), {color: 'red', fillColor: 'red', stroke: true, fillOpacity: 1.0, radius: 4, weight: 2, opacity: 1.0}).addTo(map);//defaultpointstyle);
    var popup= marker.bindPopup(L.popup().setContent("<a target='_blank' href='https://dawa.aws.dk/adgangsadresser?id="+adgangsadresse.id+"'>" + dawautil.formatAdgangsadresse(adgangsadresse) + "</a>"),{autoPan: true});
    
    map.setView(L.latLng(adgangsadresse.y, adgangsadresse.x),12);
    popup.openPopup();
  })
};


function nærmesteBygning(e) {
  var params = new URLSearchParams();
  params.set('format','json');
  params.set('x', e.latlng.lng);
  params.set('y', e.latlng.lat);
  params.set('medtagugyldige', true);
  var url= '/oisbygninger?'+params.toString();
  fetch(url)
  .catch(function (error) {
    alert(error.message);
  })
  .then(function(response) {
    if (response.status >=400 && response.status <= 499) {
      response.text().then(function (text) {
        alert(text);
      });
    }
    else if (response.status >= 200 && response.status <=299 ){
      return response.json();
    }
  }) 
  .then( function ( bygninger ) {
    var bygning= bygninger[0];
    var punkt=  L.latLng(bygning.bygningspunkt.koordinater[1], bygning.bygningspunkt.koordinater[0]);
    var marker= L.circleMarker(punkt, {color: 'blue', fillColor: 'blue', stroke: true, fillOpacity: 1.0, radius: 4, weight: 2, opacity: 1.0}).addTo(map);//defaultpointstyle);
    var popup= marker.bindPopup(L.popup().setContent("<a target='_blank' href='" + url + "'>" + dawaois.anvendelseskoder[bygning.BYG_ANVEND_KODE] + " fra " + bygning.OPFOERELSE_AAR + "</a>"),{autoPan: true});
    
    map.setView(punkt,12);
    popup.openPopup();
  //  map.fitBounds(geojsonlayer.getBounds());
  })
}
