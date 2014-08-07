// ************ default map view ************
// TO-DO: make default the user's location
var map = L.map('map').setView([30.3, -97.8], 11)
L.tileLayer('http://{s}.tiles.mapbox.com/v3/ak1.j499a0cd/{z}/{x}/{y}.png', {
  // attribution: 'Map data &copy; []',
  maxZoom: 18
}).addTo(map);
var currentMarkers = [];

// ************ dynamically build map ************
function buildMap(mapData) {

  // clear map if it's populated
  // if (mapData.length > 0) {
  clearMap();
    // map.clearLayers();
  // }

  // ***** iterate through mapData and create marker for each item *****
  var lat;
  var lng;
  var bname;
  var baddr;
  var bcity;
  var bstate;
  var bzip;

  console.log("in map.js, map_data is ", mapData);

  var length = mapData.length;
  var latlongs = [];
  for (var i = 0; i < length; i++) {
    lat = mapData[i].brewery_lat;
    lng = mapData[i].brewery_lng;
    // ** set marker for brewery **
    var marker = L.marker([lat, lng]).addTo(map);
    currentMarkers.push(marker);

    // ** set array of markers **
    latlongs.push([lat, lng]);

    bname = mapData[i].brewery_name;
    baddr = mapData[i].brewery_addr;
    bcity = mapData[i].brewery_city;
    bstate = mapData[i].brewery_state;
    bzip = mapData[i].brewery_zipcode;
    // ** set popup for brewery marker **
    marker.bindPopup(bname + "<br>" + baddr + "<br>" + bcity + ", " + bstate + " " + bzip).openPopup();
  }

  // zoom map to fit all the markers
  map.fitBounds(latlongs);
  console.log("Marker count:", currentMarkers.length);
  // window.layerGroup = L.layerGroup(currentMarkers);
  
} // end buildMap function

// ************ clear map ************
var clearMap = function() {
  console.log("Clearing map", currentMarkers.length);
  // L.clearLayers('map');
  // console.log("marker_array is ", marker_array);
  var length = currentMarkers.length;
  for (var i = 0; i < length; i++) {
    console.log("Removing:", currentMarkers);
    map.removeLayer(currentMarkers[i]);
  }
  currentMarkers = [];
} // end clear map




