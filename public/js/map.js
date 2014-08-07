// ************ default map view ************
// TO-DO: make default the user's location
var map = L.map('map').setView([30.3, -97.8], 11)
L.tileLayer('http://{s}.tiles.mapbox.com/v3/ak1.j499a0cd/{z}/{x}/{y}.png', {
  // attribution: 'Map data &copy; []',
  maxZoom: 18
}).addTo(map);


// ************ dynamically build map ************
function buildMap(mapData) {
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

  var marker_array = [];

  for (var i = 0; i < length; i++) {
    lat = mapData[i].brewery_lat;
    lng = mapData[i].brewery_lng;
    // ** set marker for brewery **
    marker = L.marker([lat, lng]).addTo(map);

    // ** set array of markers **
    marker_array.push([lat, lng]);

    bname = mapData[i].brewery_name;
    baddr = mapData[i].brewery_addr;
    bcity = mapData[i].brewery_city;
    bstate = mapData[i].brewery_state;
    bzip = mapData[i].brewery_zipcode;
    // ** set popup for brewery marker **
    marker.bindPopup(bname + "<br>" + baddr + "<br>" + bcity + ", " + bstate + " " + bzip).openPopup();
  }

  // zoom map to fit all the markers
  map.fitBounds(marker_array);

  // ***** adding popups ******
  // useful for attaching clickable info to a particular obj on a map
  // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  // circle.bindPopup("I am a circle");
  // polygon.bindPopup("I am a polygon");

  // // using popups as layers
  // // used .openOn instead of .addTo b/c it handles auto closing of a previously opened popup
  // var popup = L.popup()
  //   .setLatLng([51.5, -0.09])
  //   .setContent("I am a standalone popup")
  //   .openOn(map);

  // // ***** adding a circle *****
  // // similar to adding a marker
  //   // except the 2nd arg is the radius in meters
  // // can control how it looks by passing options as the last arg when creating the obj
  // var circle = L.circle([51.508, -0.11], 500, {
  //   color: 'red',
  //   fillColor: '#f03',
  //   fillOpacity: 0.5
  // }).addTo(map);

  // ***** adding a polygon *****
  // var polygon = L.polygon([
  //   [51.509, -0.08],
  //   [51.503, -0.06],
  //   [51.51, -0.047]
  // ]).addTo(map);


  // // ***** dealing with events *****
  // // every time something happens in leaflet (ie user clicks on a marker or map zoom changes)
  //   // the corresponding obj sends an event which you can subscribe to with a function
  //   // this allows you to reach to user interaction
  //   // note: each obj has its own set of events (see leaflet docs)
  // // the 1st arg is an event obj (it contains userful info about the event that happened, ie the latlng property)
  // function onMapClick(e) {
  //   alert('You clicked the map at ' + e.latlng);
  // }

  // map.on('click', onMapClick);

  // // refactoring the above example to have a popup instead of an alert
  // var popup = L.popup();

  // function onMapClick(e) {
  //   popup
  //     .setLatLng(e.latlng)
  //     .setContent('You clicked the map at ' + e.latlng.toString())
  //     .openOn(map);
  // }

  // map.on('click', onMapClick);
  
} // end buildMap function







