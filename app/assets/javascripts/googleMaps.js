function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
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
    })
    google.maps.event.addListener(marker, 'click', (function (marker, i, id) {
      return function () {
        $('.food-carts').css("color", "black")
        map.setZoom(15);
        map.setCenter(marker.position);
        $("#food-cart-" + id.toString()).css("color", "red");
      }
    })(marker, i, foodCart.id));
    var url = '<li><a href="/food_carts/' + foodCart.id.toString() + '" id="food-cart-' + foodCart.id + '" class="food-carts">' + foodCart.name + '</a></li>'
    $('#cart-list').append(url);
  }
}
