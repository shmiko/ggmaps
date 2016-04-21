

var map;
var initialCenter;
var initialZoom;
var elevationService;
var geocoder;

function init() {
    var mapOptions = {
        center: new google.maps.LatLng(52.373922, -3.427734),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        mapTypeControl: false
    };
	
    map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
	
	initialCenter = mapOptions.center;
	initialZoom = mapOptions.zoom;
	
    addButtons();
    addGroundOverlay();
    addMarkers();
    addPolyline();
    addEditablePolygon();
    addDraggableRectangle();
    addCircle();
    addKmlLayer();
	addGeoJSONDataLayer();
    addElevationService();
    addGeocodingService();
	addGoToInitialExtent();
	addShowCoords();
}
google.maps.event.addDomListener(window, "load", init);

function addButtons() {
    document.getElementById('btnTerrain').addEventListener('click', function () {
        map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    });
    document.getElementById('btnHybrid').addEventListener('click', function () {
        map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    });
    document.getElementById('btnRoadmap').addEventListener('click', function () {
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    });
    document.getElementById('btnSatellite').addEventListener('click', function () {
        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    });
}

function addGroundOverlay() {
    // south-west and north-east corners
    var imageBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(53.178521, -3.438549),
            new google.maps.LatLng(53.194979, -3.390613));
    var historicalOverlay = new google.maps.GroundOverlay(
            'http://localhost:8080/ggmaps/images/denbigh.jpg',
            imageBounds);
    historicalOverlay.setMap(map);
}

function addMarkers() {

    var image = "images/walesflag.png";
    var centerMarker = new google.maps.Marker({
        icon: image,
        position: new google.maps.LatLng(52.345860,-3.051817),
        map: map,
        title: "The Offa's Dyke Center, Knighton, Powys"
    });

    var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">The Offa\'s Dyke Center</h1>' +
            '<div id="bodyContent">' +
            '<p>The <b>Offa\'s Dyke Center</b> is located in the middle of the pretty town of Knighton, in Powys.</p>' +
            '<p>The Centre, opened in 1999, forms the focus for activities based on the 8th Century earthwork built ' +
            'by <i>Offa</i>, the King of Mercia. The dyke follows the Welsh English border from the hills above ' +
            'Prestatyn to the Severn Estuary near Chepstow. With its free exhibition and car park, the Centre caters' + 
            'for the needs of a wide range of visitors, from those taking toddlers to play in the surrounding park ' +
            'and play area, to those exploring the border area by car, cycle or on foot, to education groups ' +
            'studying the history of the area, and particularly that of Offas Dyke. There is something here ' +
            'for everyone.</p>' +
            '<img src="http://www.offasdyke.demon.co.uk/odaj3.jpg"/>' +
            '<p>For more information, visit the center <a href="http://www.offasdyke.demon.co.uk/odc.htm">web page</a>' +
            '</div>' +
            '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(centerMarker, 'click', function () {
        infowindow.open(map, centerMarker);
    });

    var pubMarker = new google.maps.Marker({
        icon: image,
        position: new google.maps.LatLng(52.343866, -3.0492420),
        map: map,
        title: "The Knighton Hotel"
    });

}

function addPolyline() {
    var pathCoordinates = [
        new google.maps.LatLng(52.3439000, -3.0493927),
        new google.maps.LatLng(52.3440737, -3.0491620),
        new google.maps.LatLng(52.3442474, -3.0494893),
        new google.maps.LatLng(52.3443588, -3.0498272),
        new google.maps.LatLng(52.3446243, -3.0500257),
        new google.maps.LatLng(52.3451716, -3.0507070),
        new google.maps.LatLng(52.3453617, -3.0509162)
    ];
    var pathToCenter = new google.maps.Polyline({
        path: pathCoordinates,
        geodesic: false,
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    pathToCenter.setMap(map);
}

function addEditablePolygon() {
    var natureCoords = [
        new google.maps.LatLng(52.347295, -3.059607),
        new google.maps.LatLng(52.347138, -3.061066),
        new google.maps.LatLng(52.346351, -3.060465),
        new google.maps.LatLng(52.345460, -3.060465),
        new google.maps.LatLng(52.344569, -3.059864),
        new google.maps.LatLng(52.344726, -3.058748)
    ];
    var natureArea = new google.maps.Polygon({
        path: natureCoords,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#00FF00",
        fillOpacity: 0.6,
        editable: true
    });
    natureArea.setMap(map);
}

function addDraggableRectangle() {
    var bounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(52.340308, -3.052557),
            new google.maps.LatLng(52.340799, -3.050647)
    );
    var rectangle = new google.maps.Rectangle({
        bounds: bounds,
        map: map,
        fillColor: "#00FF00",
        fillOpacity: 0.6,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        draggable: true
    });
}

function addCircle() {
    var circle = new google.maps.Circle({
        map: map,
        center: new google.maps.LatLng(52.341049, -3.053942),
        fillColor: "#FF33FF",
        fillOpacity: 0.6,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
    circle.setRadius(58.222737);
}

function addKmlLayer() {
    var offasDykeLayer = new google.maps.KmlLayer('http://hikeview.co.uk/tracks/hikeview-offas-dyke.kml');
    offasDykeLayer.setMap(map);
}

function addGeoJSONDataLayer() {
	map.data.loadGeoJson('http://localhost:8080/ggmaps/data/SecretCastlesOfWales.json');
	
	map.data.setStyle({
		icon: 'http://localhost/ggmaps/images/castle.png',
		strokeColor: 'green'
	});
}

function addElevationService() {

    // Create an ElevationService
    elevationService = new google.maps.ElevationService();

    // Add a listener for the double click event and call getElevation on that location
    google.maps.event.addListener(map, 'click', getElevation);

}

function getElevation(event) {

    var locations = [];

    var infowindow = new google.maps.InfoWindow();

    // Retrieve the clicked location and add it to the array
    var userClickLocation = event.latLng;
    locations.push(userClickLocation);

    // Create a LocationElevationRequest object using the array's single value
    var positionalRequest = {
        'locations': locations
    }

    // Send the location request
    elevationService.getElevationForLocations(positionalRequest, function (results, status) {
        if (status == google.maps.ElevationStatus.OK) {
            // Retrieve the first result
            if (results[0]) {
                // Open an info window indicating the elevation at the clicked position
                infowindow.setContent("The elevation at this point is " + Math.round(results[0].elevation) + " meters.");
                infowindow.setPosition(userClickLocation);
                infowindow.open(map);
            } else {
                alert("No results found");
            }
        } else {
            alert("Elevation service failed due to: " + status);
        }
    });
}

function addGeocodingService() {
    geocoder = new google.maps.Geocoder();
}

function geocodeAddress() {
    var address = document.getElementById("address").value;
    geocoder.geocode({ 'address': address}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            map.setZoom(17);
            map.panTo(marker.position)
        } else {
            alert("Geocode failed. The error is: " + status);
        }
    });
}

function addGoToInitialExtent() {
	google.maps.event.addListener(map, 'rightclick', function() {
		map.setCenter(initialCenter);
		map.setZoom(initialZoom);
	});
}

function addShowCoords() {
	google.maps.event.addListener(map, 'center_changed', function() {
		var newCenter = map.getCenter();
		var newZoom = map.getZoom();
		document.getElementById('coordsDiv').innerHTML = "Center: " + newCenter.toString() + "<br>Zoom: " + newZoom;
	});
}

function calcRoute() {

	var directionsService = new google.maps.DirectionsService();
	
	var directionsDisplay;
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("directionsPanel"));	

    var start = document.getElementById("start").value;
	var end = new google.maps.LatLng(52.345860,-3.051817);
    var request = {
        origin : start,
        destination : end,
        travelMode : google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);			
        } else {
			alert("Could not calculate directions. Try again!");
		}
    });
}

