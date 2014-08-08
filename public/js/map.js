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
  console.log("in map.js, map_data is ", mapData);

  clearMap();

  var length = mapData.length;
  var latlongs = [];

  // ***** iterate through mapData and create marker for each item *****
  for (var i = 0; i < length; i++) {
    var lat = mapData[i].brewery_lat;
    var lng = mapData[i].brewery_lng;
    
    var venue = mapData[i];
    // ** set marker for brewery **
    var marker = L.marker([lat, lng]).addTo(map);

    marker.venue = venue;
    marker.on('click', function () {
      console.log("what is it", this.venue);
    });
    currentMarkers.push(marker);

    // ** set array of markers **
    latlongs.push([lat, lng]);

    // ** set popup for brewery marker **
    marker.bindPopup(venue.brewery_name + "<br>" + venue.brewery_addr + "<br>" +
        venue.brewery_city + ", " + venue.brewery_state + " " + venue.brewery_zipcode).openPopup();

    // display brewery info in div
    marker.on('click', function() {
      $("#detailDiv").empty();
      $("#detailDiv").text(this.venue.brewery_name
        + " " + this.venue.brewery_addr
        + ", " + this.venue.brewery_city
        + ", " + this.venue.brewery_state
        + ", " + this.venue.brewery_zipcode     
      );
    }.bind(marker));
  }

  // zoom map to fit all the markers
  map.fitBounds(latlongs);

} // end buildMap function

// ************ clear map ************
var clearMap = function() {
  console.log("Clearing map", currentMarkers.length);
  var length = currentMarkers.length;
  for (var i = 0; i < length; i++) {
    console.log("Removing:", currentMarkers);
    map.removeLayer(currentMarkers[i]);
  }
  currentMarkers = [];
} // end clear map




