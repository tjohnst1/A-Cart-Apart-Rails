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
var currentWindow;

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
    var contentString =
    '<div class="info-window tk-rucksack">' +
      '<div class="info-window-text-container">' +
          '<h3 class="info-window-heading-text">' + foodCart.name + '</h3>' +
          '<p class="info-window-subtext-text">' + foodCart.tags + '</p>' +
      '</div>' +
      '<div class="info-window-icon-container">' +
        '<span class="glyphicon glyphicon-info-sign"></span>' +
      '</div>' +
    '</div>'
    // var infowindow = new google.maps.InfoWindow({
    //   content: contentString
    // });

    var infobox = new InfoBox({
         content: contentString,
         disableAutoPan: false,
         maxWidth: 0,
         pixelOffset: new google.maps.Size(0, -60),
         zIndex: null,
         closeBoxURL: "",
         boxStyle: {
            opacity: 1,
            background: "url('/triangle.svg') no-repeat",
            width: "180px",
        },
        infoBoxClearance: new google.maps.Size(1, 1)
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i, id, infobox) {
      return function () {
        if (currentWindow) { currentWindow.close() };
        $('.food-carts').css("color", "black")
        map.setZoom(15);
        map.setCenter(marker.position);
        $("#food-cart-" + id.toString()).css("color", "red");
        infobox.open(map, marker);
        currentWindow = infobox;
      }
    })(marker, i, foodCart.id, infobox));
    var url = '<li>' +
                '<a href="/food_carts/' + foodCart.id.toString() + '" id="food-cart-' + foodCart.id + '" class="food-carts">' +
                  foodCart.name +
                '</a>' +
              '</li>'
    $('#cart-list').append(url);
  }

}



google.maps.event.addDomListener(window, 'load', initMap);
