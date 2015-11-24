// Initialize the Map
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

  // Hide the Side Bar When the Map Moves
  map.addListener('drag', function(){
    if ($('#selected-food-cart-container').css('display') !== 'none'){
      if ($('.selected-food-cart').css('display') !== 'none'){
        $('.selected-food-cart').slideUp();
        $('#selected-food-cart-details').html('<span class="glyphicon glyphicon-chevron-down"></span> Show Details');
      }
    }
  });

}

// Create the Zoom Controllers (Lower Left Size of the Screen)
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

// Slightly Offsets Markers with the Same Coordinates
function compareCoords(cartList, currentCart){
  var offsetAmount = 0;
  for (var z = 0; z < cartList.length; z++){
    if ((currentCart.latitude === cartList[z].latitude) && (currentCart.longitude === cartList[z].longitude) && (cartList[z].offset === undefined) && (currentCart.name != cartList[z].name)){
      if (cartList[z].offset === undefined){
        offsetAmount += 0.000015;
      }
    }
  }
  if (offsetAmount > 0){
    currentCart.latitude = Number(currentCart.latitude) + (offsetAmount);
    currentCart.offset = true;
  }
}

// Function to Create Individual InfoBoxes
function createInfobox(foodCart){
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

  return infobox;
}

function setMarkers(map) {
  // Place Individual Markers
  for (var i = 0; i < foodCarts.length; i++) {
    var foodCart = foodCarts[i];
    compareCoords(foodCarts, foodCart);
    var marker = new google.maps.Marker({
      position: {lat: Number(foodCart.latitude), lng: Number(foodCart.longitude)},
      animation: google.maps.Animation.DROP,
      map: map,
      zIndex: i
    })

    var infobox = createInfobox(foodCart);

    google.maps.event.addListener(marker, 'click', (function (marker, id, infobox){
      return function () {
        if (currentWindow) { currentWindow.close() };
        if (currentMarker) { currentMarker.setVisible(true) };
        map.setCenter(marker.position);
        marker.setVisible(false);
        infobox.open(map, marker);
        currentWindow = infobox;
        currentMarker = marker;

        // Ajax Call for Populating the Side Panel
        $.ajax({
            url:'/food_carts/' + id,
            dataType:'json',
            type: 'get',
            success:function(data){
              $('.individual-review-container').empty();
              for (var key in data["food_cart"]){
                if (key !== ("id" || "created_at" || "updated_at" || "longitude" || "latitude")){
                  if (key === "tags"){
                    var tagNames = [];
                    for (var t = 0; t < data["food_cart"]["tags"].length; t++){
                      tagNames.push(data["food_cart"]["tags"][t]["name"]);
                    };
                    $(".categories").html(tagNames.join(', '));
                  } else if(key === "reviews") {
                    for (var r = 0; r < data["food_cart"]["reviews"].length; r++){
                      var reviewId = data["food_cart"]["reviews"][r]["id"];
                      var editLink = '';
                      var deleteLink = '';
                      if (document.cookie){
                        editLink = '<a href="#" id="edit-review-' + reviewId + '">Edit</a>';
                        deleteLink = '<a href="/food_carts/' + id + '/reviews/' + reviewId + '" id="delete-review-' + reviewId + '" data-remote="true" data-method="delete" rel="nofollow">Delete</a>';
                      }
                      var filledStars = Number(data["food_cart"]["reviews"][r]["rating"]);
                      var outlineStars = 5 - filledStars;
                      var starArr = [];
                      for (var s = 1; s <= 5; s++){
                        if (filledStars >= s){
                          starArr.push('<span class="star-review-filled"></span>');
                        } else {
                          starArr.push('<span class="star-review-unfilled"></span>');
                        }
                      }
                      $('.individual-review-container').append(
                        '<div class="individual-review">' +
                          '<h3>' + data["food_cart"]["reviews"][r]["user"]["username"] + '</h3>' +
                          '<div class="star-container">' + starArr.join('') + '</div>' +
                          '<p>' + data["food_cart"]["reviews"][r]["content"] + '</p>' +
                          '<div class="edit-review-container">' +
                           editLink + deleteLink +
                          '</div>' +
                        '</div>'
                      );
                      // Add Click Handler for
                      $('#edit-review-' + reviewId).on('click', (function(id, reviewId){
                        return function(){
                          $.ajax({
                              url:'/food_carts/' + id + '/reviews/' + reviewId + '/edit',
                              dataType:'html',
                              type: 'get',
                              success:function(data){
                                // Set the New Review Data in the Modal
                                $('#modal-form-title').html('Edit a Review');
                                var parsed = $('<div/>').append(data);
                                $('#modal-body').empty().html($(parsed).find('#edit-review-form-container').html());
                                $('#modal-form').modal('toggle');
                              }
                          });
                        };
                      })(id, reviewId)); // click handler
                    }; // /review loop
                  } else if(key === "website" || key === "twitter" || key === "facebook") {
                    if (data["food_cart"][key] === "Not Provided"){
                      $('.' + key).parent().hide();
                    } else {
                      var linkPhrase = data["food_cart"][key].replace(/(https?:\/\/)|(www\.)|(\/$)/gi, "").toLowerCase();
                      $('.' + key).html('<a href="' + data["food_cart"][key] + '">' + linkPhrase + '</a>');
                      $('.' + key).parent().show();
                    }
                  } else if(key === "phone_number") {
                    if (data["food_cart"][key] === "Not Provided"){
                      $('.' + key).parent().hide();
                    } else {
                      $('.phone-number').html(data["food_cart"][key]);
                      $('.' + key).parent().show();
                    }
                  } else {
                    $('.' + key).html(data["food_cart"][key]);
                  }
                }
              };

              // Add the 'Add a Review' Link
              var link = '<button id="add-review-btn">Add a Review</button>'
              $('#add-review').empty();
              if (document.cookie){
                $('#add-review').append(link);
              }

              // Launch a New Review Modal
              $('#add-review-btn').on('click', function(){
                $.ajax({
                    url:'/food_carts/' + id + '/reviews/new',
                    dataType:'html',
                    type: 'get',
                    success:function(data){
                      // Set the New Review Data in the Modal
                      $('#modal-form-title').html('Add a Review');
                      var parsed = $('<div/>').append(data);
                      $('#modal-body').empty().html($(parsed).find('#new-review-form-container').html());
                      $('#modal-form').modal('toggle');
                    }
                 });
              });

              if ($('#selected-food-cart-container').css('display') === 'none'){
                $('#selected-food-cart-container').slideDown()
                $('#selected-food-cart-details').html('<span class="glyphicon glyphicon-chevron-up"></span> Hide Details');
              } else {
                $('.selected-food-cart').slideDown();
              }
            }
        }); //ajax
      } //function
    })(marker, foodCart.id, infobox)); //IIFE

    var url = '<div class="food-cart-list-item">' +
                '<a href="/food_carts/' + foodCart.id.toString() + '" id="food-cart-' + foodCart.id + '" class="food-cart-link">' +
                  foodCart.name +
                '</a>' +
              '</div>'

    $('#cart-list').append(url);

  }

}

// Map Stylings
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

google.maps.event.addDomListener(window, 'load', initMap);
