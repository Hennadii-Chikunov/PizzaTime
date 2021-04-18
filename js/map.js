function initMap() {
	var element = document.getElementById('gmap');
	var options = {
		zoom: 6,
		center: { lat: 48.450001, lng: 34.983334 }
	};
	var myMap = new google.maps.Map(element, options);
   var icon = {
    url: "../img/common/marker.svg", // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};

	var InfoWindow = new google.maps.InfoWindow({
    content: '<h3>PizzaTime OPEN 24/7</h3>'
	});
   var marker = new google.maps.Marker({
		position: new google.maps.LatLng(48.450001, 34.983334),
	map: myMap,
	icon: icon	
	});
	marker.addListener('click', function () {
		InfoWindow.open(myMap, marker);
	})
}
