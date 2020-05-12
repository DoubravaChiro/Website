export{ init }


const key = "AIzaSyAUWe8KAjLLC1vkGBDXfeTKGtSpk2MTUZM";
var map;
var geocoder;
var infoWindow;
var marker
const office = "32 Washington Ave. Endicott, NY 13760";
function init(){
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAUWe8KAjLLC1vkGBDXfeTKGtSpk2MTUZM&callback=initMap';
    script.defer = true;
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = function() {
      // JS API is loaded and available
      mapInit();
      geocoderInit();
      codeOffice();
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);
}

// initializes the map
function mapInit(){
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.0984, lng: -76.0494},
          zoom: 8
        });
}

// initialize the geocoder
function geocoderInit(){
    geocoder = new google.maps.Geocoder();
}

// recenter map on the office and set a marker on the office location
function codeOffice(){
    geocoder.geocode( { 'address': office }, function(results, status) {
        if (status == 'OK'){
            infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent("<span style='color:black'>Doubrava Family Chiropractic</span>");
            map.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: "Doubrava Family Chiropractic",
            });
            marker.addListener('click', function(){infoWindow.open(map, marker);});
        }
    } );
}

