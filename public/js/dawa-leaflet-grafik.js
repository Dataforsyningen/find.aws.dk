
var defaultpointstyle = {
  "stroke": false,
  "husnr": false,
  "color": "red",
  "opacity": 1.0,
  "weight": 1, 
  "fill": true,
  "fillColor": 'red',
  "fillOpacity": 1.0,
  "husnr": false,
  "radius": 5
};

var bygningpointstyle = {
  "stroke": false,
  "husnr": false,
  "color": "blue",
  "opacity": 1.0,
  "weight": 1, 
  "fill": true,
  "fillColor": 'blue',
  "fillOpacity": 1.0,
  "husnr": false,
  "radius": 5
};

var tekniskeanlaegpointstyle = {
  "stroke": false,
  "husnr": false,
  "color": "black",
  "opacity": 1.0,
  "weight": 1, 
  "fill": true,
  "fillColor": 'black',
  "fillOpacity": 1.0,
  "husnr": false,
  "radius": 5
};

var defaultpolygonstyle = {
  "stroke": true,
  "color": "blue",
  "opacity": 1.0,
  "weight": 2, 
  "fill": true,
  "fillColor": 'blue',
  "fillOpacity": 0.2,
  "husnr": false, 
  "radius": 5
};

var defaultlinestyle = {
  "stroke": true,
  "color": "blue",
  "opacity": 1.0,
  "weight": 2, 
  "fill": false,
  "fillColor": 'blue',
  "fillOpacity": 0.2,
  "husnr": false, 
  "radius": 5
};


var anvendelseskoder= {};
  function initanvendelseskoder() {
    anvendelseskoder[110]= "Stuehus til landbrugsejendom";
    anvendelseskoder[120]= "Fritliggende eenfamilieshus (parcelhus)";
    anvendelseskoder[130]= "Række-, kæde-, eller dobbelthus (lodret adskillelse mellem enhederne)";
    anvendelseskoder[140]= "Etageboligbebyggelse (flerfamiliehus, herunder to-familiehus (vandret adskillelse mellem enhederne)";
    anvendelseskoder[150]= "Kollegium";
    anvendelseskoder[160]= "Døgninstitution (plejehjem, alderdomshjem, børne- eller ungdomshjem)";
    anvendelseskoder[190]= "Anden bygning til helårsbeboelse";
    anvendelseskoder[210]= "Bygning til erhvervsmæssig produktion vedrørende landbrug, gartneri, råstofudvinding o. lign";
    anvendelseskoder[220]= "Bygning til erhvervsmæssig produktion vedrørende industri, håndværk m.v. (fabrik, værksted o. lign.)";
    anvendelseskoder[230]= "El-, gas-, vand- eller varmeværk, forbrændingsanstalt m.v.";
    anvendelseskoder[290]= "Anden bygning til landbrug, industri etc.";
    anvendelseskoder[310]= "Transport- og garageanlæg (fragtmandshal, lufthavnsbygning, banegårdsbygning, parkeringshus). Garage med plads til et eller to køretøjer registreres med anvendelseskode 910";
    anvendelseskoder[320]= "Bygning til kontor, handel, lager, herunder offentlig administration";
    anvendelseskoder[330]= "Bygning til hotel, restaurant, vaskeri, frisør og anden servicevirksomhed";
    anvendelseskoder[390]= "Anden bygning til transport, handel etc.";
    anvendelseskoder[410]= "Bygning til biograf, teater, erhvervsmæssig udstilling, bibliotek, museum, kirke o. lign.";
    anvendelseskoder[420]= "Bygning til undervisning og forskning (skole, gymnasium, forskningslaboratorium o. lign.)";
    anvendelseskoder[430]= "Bygning til hospital, sygehjem, fødeklinik o. lign.";
    anvendelseskoder[440]= "Bygning til daginstitution";
    anvendelseskoder[490]= "Bygning til anden institution, herunder kaserne, fængsel o. lign.";
    anvendelseskoder[510]= "Sommerhus";
    anvendelseskoder[520]= "Bygning til ferieformål m.v., bortset fra sommerhus (feriekoloni, vandrehjem o. lign.)";
    anvendelseskoder[530]= "Bygning i forbindelse med idrætsudøvelse (klubhus, idrætshal, svømmehal o. lign.)";
    anvendelseskoder[540]= "Kolonihavehus";
    anvendelseskoder[590]= "Anden bygning til fritidsformål";
    anvendelseskoder[910]= "Garage med plads til et eller to køretøjer";
    anvendelseskoder[920]= "Carport";
    anvendelseskoder[930]= "Udhus";
  }
  initanvendelseskoder();


  var klassifikationskoder= {};
  function initklassifikationskoder() {
    klassifikationskoder[1110]= "Tank (Produkt på væskeform)";
    klassifikationskoder[1120]= "Silo (Produkt på fast form)";
    klassifikationskoder[1130]= "Gasbeholder (Produkt på gasform)";
    klassifikationskoder[1140]= "Affaldsbeholder";
    klassifikationskoder[1210]= "Vindmølle (elproducerende)";
    klassifikationskoder[1220]= "Slanger til jordvarme";
    klassifikationskoder[1230]= "Solvarme-/ solcelleanlæg";
    klassifikationskoder[1240]= "Nødstrømsforsyningsanlæg";
    klassifikationskoder[1250]= "Transformerstation";
    klassifikationskoder[1260]= "Elskab";
    klassifikationskoder[1265]= "Naturgasfyr";
    klassifikationskoder[1270]= "Andet energiproducerende eller - distribuerende anlæg";
    klassifikationskoder[1310]= "Vandtårn";
    klassifikationskoder[1320]= "Pumpestation";
    klassifikationskoder[1330]= "Swimmingpool";
    klassifikationskoder[1340]= "Private rensningsanlæg f.eks. pileanlæg, nedsivningsanlæg";
    klassifikationskoder[1350]= "Offentlige rensningsanlæg";
    klassifikationskoder[1360]= "Regnvandsanlæg";
    klassifikationskoder[1905]= "Legeplads";
    klassifikationskoder[1910]= "Teknikhus";
    klassifikationskoder[1915]= "Døgnpostboks";
    klassifikationskoder[1920]= "Køleanlæg (herunder aircondition)";
    klassifikationskoder[1925]= "Kunstværk (springvand, mindesmærker m.v.)";
    klassifikationskoder[1930]= "Sirene / mast med sirene";
    klassifikationskoder[1935]= "Skilt";
    klassifikationskoder[1940]= "Antenne / mast fx tv, radio- og telekommunikation";
    klassifikationskoder[1945]= "Dambrug";
    klassifikationskoder[1950]= "Møddingsanlæg";
    klassifikationskoder[1955]= "Andet teknisk anlæg";
  }
  initklassifikationskoder();

exports.eachFeature= function (feature, layer) {
    if ("ejerlavkode" in feature.properties && "matrikelnr" in feature.properties && !("vejnavn" in feature.properties)) {      
      layer.bindPopup("Jordstykke: " + feature.properties.ejerlavkode + " " + feature.properties.matrikelnr);
    }
    else if ("type" in feature.properties && "navn" in feature.properties) {  
      layer.bindPopup(feature.properties.navn + " (" + feature.properties.type + ")");
    }
    else if ("kode" in feature.properties && "navn" in feature.properties) {  
      layer.bindPopup(feature.properties.kode + " " + feature.properties.navn);
    }
     else if ("nr" in feature.properties && "navn" in feature.properties) {  
      layer.bindPopup(feature.properties.nr + " " + feature.properties.navn);
    }
    else if ("vejnavn" in feature.properties && "husnr" in feature.properties && "etage" in feature.properties) {  
      layer.bindPopup("<a target='_blank' href='https://dawa.aws.dk/adresser/"+feature.properties.id+"'>"+feature.properties.vejnavn + " " + feature.properties.husnr + ", " + (feature.properties.supplerendebynavn?feature.properties.supplerendebynavn+", ":"") + feature.properties.postnr + " " + feature.properties.postnrnavn + "</a>");
    }
    else if ("vejnavn" in feature.properties && "husnr" in feature.properties) {  
      layer.bindPopup("<a target='_blank' href='https://dawa.aws.dk/adgangsadresser/"+feature.properties.id+"'>"+feature.properties.vejnavn + " " + feature.properties.husnr + ", " + (feature.properties.supplerendebynavn?feature.properties.supplerendebynavn+", ":"") + feature.properties.postnr + " " + feature.properties.postnrnavn + "</a>");
    }
    else if ("Tekniskanlaeg_id" in feature.properties) {  
      layer.bindPopup("<a target='_blank' href='https://dawa.aws.dk/ois/tekniskeanlaeg?id="+feature.properties.Tekniskanlaeg_id+"'>"+klassifikationskoder[feature.properties.Klassifikation] + " etableret " + feature.properties.Etableringsaar + "</a>");
    }
    else if ("Bygning_id" in feature.properties) {  
      layer.bindPopup("<a target='_blank' href='https://dawa.aws.dk/ois/bygninger?id="+feature.properties.Bygning_id+"'>"+anvendelseskoder[feature.properties.BYG_ANVEND_KODE] + " fra " + feature.properties.OPFOERELSE_AAR + "</a>");
    }
    layer.on('contextmenu', function(e) {map.contextmenu.showAt(e.latlng)});
  }

exports.pointToLayer= function (style) {
  return function(feature, latlng) {
    if (style.husnr) {
      return L.marker(latlng, {icon: L.divIcon({className: "labelClass", html: feature.properties.husnr})});
    }
    else {
      return L.circleMarker(latlng, style);
    }
  }
}

exports.getDefaultStyle= function (data) {
  var featureData= data;
  if (data.type !== 'Feature') {
    featureData= data.features[0];
  }
  var defaultstyle;
  if (featureData.geometry && featureData.geometry.type==='Point' && featureData.properties.Tekniskanlaeg_id) {
    defaultstyle= tekniskeanlaegpointstyle;
  }
  else if (featureData.geometry && featureData.geometry.type==='Point' && featureData.properties.Bygning_id) {
    defaultstyle= bygningpointstyle;
  }
  else if (featureData.geometry && featureData.geometry.type==='Point') {
    defaultstyle= defaultpointstyle;
  }
  else if (featureData.geometry && featureData.geometry.type==='MultiPolygon') {

    defaultstyle= defaultpolygonstyle; 
  }
  else {
    defaultstyle= defaultlinestyle;
  }
  return defaultstyle;
}
