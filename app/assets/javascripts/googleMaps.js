function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 45.5223226, lng: -122.6678265}
  });
  setMarkers(map);
}

var foodCarts = gon.food_carts

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function setMarkers(map) {
  for (var i = 0; i < foodCarts.length; i++) {
    var foodCart = foodCarts[i];
    var marker = new google.maps.Marker({
      position: {lat: Number(foodCart.latitude), lng: Number(foodCart.longitude)},
      animation: google.maps.Animation.DROP,
      label: String.fromCharCode("A".charCodeAt(0) + i),
      map: map,
      zIndex: i
    });
  }
}
