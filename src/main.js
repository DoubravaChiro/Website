export{ init }


const key = "AIzaSyAUWe8KAjLLC1vkGBDXfeTKGtSpk2MTUZM";
const office = "32 Washington Ave. Endicott, NY 13760"; // if the office ever moves, make sure to change this
var map;
var geocoder;
var directionService;
var directionRenderer;
var infoWindow;
var marker;
var collapsible;

function init(){
    // Create the script tag, set the appropriate attributes
    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + key + '&callback=initMap';
    script.defer = true;
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = function() {
      // JS API is loaded and available
      mapInit();
      geocoder = new google.maps.Geocoder();
      directionService = new google.maps.DirectionsService();
      directionRenderer = new google.maps.DirectionsRenderer();
      directionRenderer.setMap(map);
      codeOffice();
      getUserLoc();
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    collapsible = document.getElementsByClassName("collapsible");
    for (let i = 0; i < collapsible.length; i++){
        collapsible[i].addEventListener("click", collapsibleOnClick);
    }
}

// initializes the map
function mapInit(){
    map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.0984, lng: -76.0494}, // that's Endicott's coords, in case any devs that aren't me touch this code
          zoom: 8
        });
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

// gets the user's location and feeds it into the directions api
function getUserLoc(){
    // if the HTML 5 geolocator exists/is allowed to run
    if (navigator.geolocation) {
        let pos = {};
        navigator.geolocation.getCurrentPosition(function(position){
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            let route = {
                origin: pos,
                destination: office,
                travelMode: "DRIVING"
            };
            directionService.route(route, setRoute);
        });
    }
    // if the HTML 5 geolocator does not exist/is not allowed to run
    else {
        Window.alert("Could not get user location.");
    }
}

// callback for the direction's api
function setRoute(DirectionsResult, DirectionStatus){
    if (DirectionStatus == 'OK'){
        directionRenderer.setDirections(DirectionsResult);
    }
    else {
        Window.alert("Could not find route: " + DirectionStatus);
    }
}

function collapsibleOnClick(){
        let content = this.nextElementSibling;
        console.log(content.style.maxHeight);
        debugger;
        if (this.value == "false"){
            this.value = "true";
            content.style.maxHeight = "1000px";
            this.style.borderBottom = "2px solid #539564";
        }
        else {
            this.value = "false";
            content.style.maxHeight = "0px";
            this.style.borderBottom = "0px";
        }
}