function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 45.5166745, lng: -122.7225432}
  });
  setMarkers(map);
}

var foodCarts = gon.food_carts

function setMarkers(map) {
  for (var i = 0; i < foodCarts.length; i++) {
    var foodCart = foodCarts[i];
    var marker = new google.maps.Marker({
      position: {lat: Number(foodCart.latitude), lng: Number(foodCart.longitude)},
      map: map,
    });
  }
}
