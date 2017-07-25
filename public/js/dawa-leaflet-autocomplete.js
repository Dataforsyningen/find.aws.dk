"use strict"

var dawaAutocomplete2 = require('dawa-autocomplete2')
  , dawautil = require('dawa-util');

var style = {
  "stroke": false,
  "color": "red",
  "opacity": 1.0,
  "weight": 1, 
  "fill": true,
  "fillColor": 'red',
  "fillOpacity": 1.0,
  "radius": 5
};

exports.style= style;

var eachFeature= function (feature, layer) {
  if ("vejnavn" in feature.properties && "husnr" in feature.properties) {  
    layer.bindPopup("<a target='_blank' href='https://dawa.aws.dk/adgangsadresser/"+feature.properties.id+"'>"+feature.properties.vejnavn + " " + feature.properties.husnr + ", " + (feature.properties.supplerendebynavn?feature.properties.supplerendebynavn+", ":"") + feature.properties.postnr + " " + feature.properties.postnrnavn + "</a>");
  }
  //layer.on('contextmenu', function(e) {map.contextmenu.showAt(e.latlng)});
}

exports.eachFeature= eachFeature;

function pointToLayer(style) {
  return function(feature, latlng) {
    return L.circleMarker(latlng, style);
  }
}

exports.pointToLayer= pointToLayer;

function selected(map) {
  return function (event) {
    fetch(dawautil.danUrl(event.data.href, {format: 'geojson'})).then( response => {
      response.json().then( function ( data ) {
        var geojsonlayer= L.geoJson(data, {style: style, onEachFeature: eachFeature, pointToLayer: pointToLayer(style)});
        geojsonlayer.addTo(map);
        map.fitBounds(geojsonlayer.getBounds());
      });
    });
  }
}

L.Control.Search = L.Control.extend({
  options: {
    // topright, topleft, bottomleft, bottomright
    position: 'topright',
    placeholder: 'vejnavn husnr, postnr',
    selected: selected
  },
  initialize: function (options /*{ data: {...}  }*/) {
    // constructor
    L.Util.setOptions(this, options);
  },
  onAdd: function (map) {
    // happens after added to map
    var container = L.DomUtil.create('div', '');
    this.form = L.DomUtil.create('form', '', container);
    var group = L.DomUtil.create('div', '', this.form);
    this.input = L.DomUtil.create('input', 'searchbox', group);
    this.input.type = 'search';
    this.input.placeholder = this.options.placeholder;
    dawaAutocomplete2.dawaAutocomplete(this.input, {
        select: this.options.selected(map),        
        adgangsadresserOnly: true
      }
    );
    //this.results = L.DomUtil.create('div', 'list-group', group);
    //L.DomEvent.addListener(this.form, 'submit', this.submit, this);
    L.DomEvent.disableClickPropagation(container);
    return container;
  },
  onRemove: function (map) {
    // when removed
    L.DomEvent.removeListener(form, 'submit', this.submit, this);
  },
  submit: function(e) {
    L.DomEvent.preventDefault(e);
  }
});

exports.search = function(id, options) {
  return new L.Control.Search(id, options);
}