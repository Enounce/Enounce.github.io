var map = L.map('map-div').setView([60.1682653, 24.9422078], 5);
var basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Basemap (c) <a href="http://openstreetmap.org">OpenStreetMap</a>',
  //minZoom: 5,
  maxZoom: 100
});
basemap.addTo(map);


var fg = L.featureGroup().addTo(map);
function addPoints(data, tabletop) {
	var line = L.polyline([]).addTo(map);
	for (var row in data) {
    var marker = L.marker([
      data[row].Latitude,
      data[row].Longitude
    ]).addTo(fg);
    line.addLatLng(marker.getLatLng());
    marker.bindPopup('<strong>' + data[row].Info + '</strong>');
  }
  
  map.fitBounds(fg.getBounds());
}


function init() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1Rs6xPlJ8pU4UFfmokjATaf4dArMWxQxZcyS-xRIIFuY/edit?usp=sharing',
    callback: addPoints,
    simpleSheet: true
  });
}
init()
