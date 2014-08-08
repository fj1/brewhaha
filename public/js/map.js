// ************ default map view ************
// TO-DO: make default the user's location
var map = L.map('map').setView([30.26, -97.75], 11)
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

    // reset null values to n/a
    for (var prop in venue) {
      if (venue[prop] === null) {
        venue[prop] = "n/a";
      }
    }

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
      $("#detailDiv").html(this.venue.brewery_name + "<br>"  
        + "Location Type: " + this.venue.brewery_type + "<br><br>" 
        + "<i class='fa fa-phone'></i>" + " "   
        + this.venue.brewery_phone + "<br>"    
        + "<i class='fa fa-laptop'></i>" + " "   
        + "<a href='" + this.venue.brewery_website + "' target='_blank'>"
        + this.venue.brewery_website + "</a><br><br>"
        // + " " + "is this brewery organic?" + this.venue.brewery_isOrganic + "<br>"
        + "Hours: " + this.venue.brewery_hours + "<br><br>"
        + "Tours: " + this.venue.brewery_tours + "<br>"
      );
    }.bind(marker));
  }

  // zoom map to fit all the markers
  map.fitBounds(latlongs);

} // end buildMap function

// ************ clear map ************
var clearMap = function() {
  var length = currentMarkers.length;
  for (var i = 0; i < length; i++) {
    map.removeLayer(currentMarkers[i]);
  }
  currentMarkers = [];
} 




