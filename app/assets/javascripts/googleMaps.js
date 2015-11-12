function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {lat: 45.5223226, lng: -122.6678265},
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    zoomControl: false,
    styles: style,
  });
  setMarkers(map);

  var zoomControlDiv = document.createElement('div');
  var zoomControl = new ZoomControl(zoomControlDiv, map);

  zoomControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

}

function ZoomControl(controlDiv, map) {

  // Creating divs & styles for custom zoom control
  controlDiv.style.padding = '5px';

  // Set CSS for the control wrapper
  var zoomContainer = document.createElement('div');
  zoomContainer.style.cursor = 'pointer';
  zoomContainer.style.textAlign = 'center';
  zoomContainer.style.width = '32px';
  zoomContainer.style.height = '69px';
  zoomContainer.setAttribute('id', 'zoom-container')
  controlDiv.appendChild(zoomContainer);

  // Set CSS for the zoomIn
  var zoomInButton = document.createElement('div');
  zoomInButton.setAttribute("class", "zoom-button")
  zoomContainer.appendChild(zoomInButton);

  var plus = document.createElement('span');
  plus.setAttribute("class", "glyphicon glyphicon-plus")
  plus.style.margin = "10px";
  zoomInButton.appendChild(plus);

  // Set CSS for the zoomOut
  var zoomOutButton = document.createElement('div');
  zoomOutButton.setAttribute("class", "zoom-button")
  zoomContainer.appendChild(zoomOutButton);

  var minus = document.createElement('span');
  minus.setAttribute("class", "glyphicon glyphicon-minus")
  minus.style.margin = "10px";
  zoomOutButton.appendChild(minus);

  // Setup the click event listener - zoomIn
  google.maps.event.addDomListener(zoomInButton, 'click', function() {
    map.setZoom(map.getZoom() + 1);
  });

  // Setup the click event listener - zoomOut
  google.maps.event.addDomListener(zoomOutButton, 'click', function() {
    map.setZoom(map.getZoom() - 1);
  });

}

var foodCarts = gon.food_carts

var currentWindow;
var currentMarker;

function setMarkers(map) {

  // var image = {
  //   url: '/FoodIcon.svg',
  //   // This marker is 20 pixels wide by 32 pixels high.
  //   size: new google.maps.Size(20, 32),
  //   // The origin for this image is (0, 0).
  //   origin: new google.maps.Point(0, 0),
  //   // The anchor for this image is the base of the flagpole at (0, 32).
  //   anchor: new google.maps.Point(0, 32)
  // };

  for (var i = 0; i < foodCarts.length; i++) {
    var foodCart = foodCarts[i];
    var marker = new google.maps.Marker({
      // icon: image,
      position: {lat: Number(foodCart.latitude), lng: Number(foodCart.longitude)},
      animation: google.maps.Animation.DROP,
      map: map,
      zIndex: i
    })

    var contentString =
    '<div class="info-window tk-rucksack">' +
      '<div class="info-window-text-container">' +
          '<h3 class="info-window-heading-text">' + '<a href="/food_carts/' + foodCart.id + '">' + foodCart.name + '</a>' + '</h3>' +
      '</div>' +
      '<div class="info-window-icon-container">' +
        '<span class="glyphicon glyphicon-info-sign"></span>' +
      '</div>' +
    '</div>';

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
        if (currentMarker) { currentMarker.setVisible(true) };
        map.setZoom(15);
        map.setCenter(marker.position);
        marker.setVisible(false);
        // $('.food-carts').css("color", "black")
        // $("#food-cart-" + id.toString()).css("color", "red");
        infobox.open(map, marker);
        currentWindow = infobox;
        currentMarker = marker;
        $.ajax({
            url:'/food_carts/' + id,
            dataType:'json',
            data: $(this).attr('id'),
            type: 'get',
            success:function(data){
              for (var key in data){
                if (key !== ("id" || "created_at" || "updated_at" || "longitude" || "latitude")){
                  if (key === "tags"){
                    var tagNames = [];
                    for (var i = 0; i < data["tags"].length; i++){
                      tagNames.push(data["tags"][i]["name"]);
                    };
                    $(".categories").html(tagNames.join(', '));
                  } else {
                    $('.' + key).html(data[key]);
                  }
                }
              }
              $('#selected-food-cart-container').slideDown();
            }
        });
      }
    })(marker, i, foodCart.id, infobox));
    var url = '<div class="food-cart-list-item">' +
                '<a href="/food_carts/' + foodCart.id.toString() + '" id="food-cart-' + foodCart.id + '" class="food-cart-link">' +
                  foodCart.name +
                '</a>' +
              '</div>'
    $('#cart-list').append(url);
  }

}


// function createEntry(foodCart){
//    '<div class="selected-food-cart" style="display:none">' +
//      '<p class="food-cart-name">' + foodCart.name + '</p>' +
//      '<p class="food-cart-categories"' + foodCart.tag_list + '</p>' +
//    '</div>';
// }



	var style = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.icon",
        "stylers": [
            {
                "weight": "1.30"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#e0e0e0"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

var filterLink = $('.filter-link')
google.maps.event.addDomListener(window, 'load', initMap);
google.maps.event.addDomListener(filterLink, 'click', initMap)
