function buildMap(mapData) {
  // ***** initialize map, centered on specific geo coordinates *****
  // maybe eventually have the map centered to the user's location??
  var map = L.map('map').setView([55.4, -131.8], 13)

  // ***** add a tile layer to map *****
  L.tileLayer('http://{s}.tiles.mapbox.com/v3/ak1.j499a0cd/{z}/{x}/{y}.png', {
    // attribution: 'Map data &copy; []',
    maxZoom: 18
  }).addTo(map);

  // ***** adding a marker *****
  console.log("in map.js, map_data is ", mapData);
  var lat = mapData.brewery_lat;
  var lng = mapData.brewery_lng;
  var marker = L.marker([lat, lng]).addTo(map);

  // ***** popup for marker *****
  var bname = mapData.brewery_name;
  var baddr = mapData.brewery_addr;
  var bcity = mapData.brewery_city;
  var bstate = mapData.brewery_state;
  var bzip = mapData.brewery_zipcode;
  // TO DO - ITERATE THRU RESULTS TO PLACE MARKER FOR EACH RESULT
  marker.bindPopup(bname + "<br>" + baddr + "<br>" + bcity + ", " + bstate + " " + bzip).openPopup();

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







