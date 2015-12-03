var ready;
ready = function() {

  $('#account-button').on('click', function(){
    if (!document.cookie){
      $("#login-modal").modal('toggle');
    }
  });

  if (gon.selectedFilter !== undefined){
    $('#' + gon.selectedFilter + '-filter').parent().addClass('selected-filter');
  };

  $('#selected-food-cart-details').on('click', function(){
    if ($('#selected-food-cart-container').css('display') !== 'none'){
      if ($('.selected-food-cart').css('display') === 'none'){
        $('.selected-food-cart').velocity('slideDown', { duration:600, easing: "easeInOutCubic" });
        $('#selected-food-cart-details').html('<span class="glyphicon glyphicon-chevron-up"></span> Hide Details');
      } else {
        $('.selected-food-cart').velocity('slideUp', { duration:600, easing: "easeInOutCubic" });
        $('#selected-food-cart-details').html('<span class="glyphicon glyphicon-chevron-down"></span> Show Details');
      }
    }
  });

  $("#new-account").on('click', function(){
    $('#login-modal').modal('hide');
    $('#signup-modal').modal('show');
  })

  if ($('#flash-messages')){
    setTimeout(function(){
      $('#flash-messages').velocity('fadeOut', { duration:600, easing: "easeInOutCubic" });
    }, 2000)
  };

  //////// Search Box Functions ////////

  var foodCartNames = [];
  var tagNames = [];

  for (var i = 0; i < foodCarts.length; i++) {
    foodCartNames.push(foodCarts[i].name);
    for (var t = 0; t < foodCarts[i]["tags"].length; t++){
      var tag = foodCarts[i]["tags"][t]["name"];
      if (tagNames.indexOf(tag) === -1){
        tagNames.push(tag);
      };
    };
  };

  // Creates suggestions for the autocomplete portion of the searchbox
  function autocompleteSearchArr(foodCarts){
    var autocompleteHash = [];
    for (var i = 0; i < foodCartNames.length; i++) {
      autocompleteHash.push({value: foodCartNames[i], data: { category: 'Food Cart Name' }});
    }
    for (var i = 0; i < tagNames.length; i++) {
      autocompleteHash.push({value: tagNames[i], data: { category: 'Categories' }});
    }
    return autocompleteHash;
  };

  var autocompleteLookup = autocompleteSearchArr(foodCarts);

  $('#search-box-input').autocomplete({
    lookup: autocompleteLookup,
    lookupLimit: 10,
    groupBy: 'category',
    onSelect: function (suggestion) {
      filterMarkers(foodCarts, foodCartNames, setMarkerCollection, suggestion.value)
    }
  });

  // Filter the markers with the provided search parameters
  function filterMarkers(foodCarts, foodCartNames, setMarkers, query){
    if (foodCartNames.indexOf(query) !== -1 ){
      for (var i = 0; i < foodCarts.length; i++){
        if (foodCarts[i].name === query){
          setMarkers[i].setVisible(true);
        } else {
          setMarkers[i].setVisible(false);
        }
      }
    } else {
      var queryRegEx = new RegExp(query, 'gi');
      for (var i = 0; i < foodCarts.length; i++){
        if (foodCarts[i].name.search(queryRegEx) !== -1 || query.length === 0){
          setMarkers[i].setVisible(true);
        } else {
          for (var t = 0; t < foodCarts[i].tags.length; t++){
            if (foodCarts[i].tags[t].name.search(queryRegEx) !== -1){
              setMarkers[i].setVisible(true);
              break
            } else if(t === (foodCarts[i].tags.length - 1)){
              // This only runs if neither the tags nor the name of the food cart match
              setMarkers[i].setVisible(false);
            };
          };
        };
      };
    };
  };

  $('#search-box-input').keyup(function(event){
    filterMarkers(foodCarts, foodCartNames, setMarkerCollection, $(this).val())
  });

  //////// Filter Container Functions ////////

  // Filter the markers with the provided search parameters
  function filterMarkersByCat(foodCarts, setMarkers, category){
    if (category === "clear"){
      for (var i = 0; i < foodCarts.length; i++){
        setMarkers[i].setVisible(true);
      }
    } else {
      var currentQuery = $('.category-checkbox:checked').map(function(){return $(this).val()});
      for (var i = 0; i < foodCarts.length; i++){
        var tags = [];
        for (var j = 0; j < foodCarts[i].tags.length; j++){
          tags.push(foodCarts[i].tags[j].name);
        }
        for (var k = 0; k < currentQuery.length; k++){
          if (tags.indexOf(currentQuery[k]) !== -1){
            setMarkers[i].setVisible(true);
            break
          } else {
            setMarkers[i].setVisible(false);
          }
        }
      }
    }
  };

  // Make the filter panel slide out on click
  $('#filter-btn').on('click', function(){
    $('#filter-container').toggle("slide", { direction: "right" }, 300);
  });

  $('.category-checkbox').on('click', function(){
    if($('.category-checkbox:checked').length === 0){
      resetMarkers();
    } else {
      filterMarkersByCat(foodCarts, setMarkerCollection, $(this).val());
    }
  });

  $('#filter-clear').on('click', function(){
    resetMarkers();
  });

  function resetMarkers(){
    filterMarkersByCat(foodCarts, setMarkerCollection, "clear");
    $('.category-checkbox:checked').attr('checked', false);
  }

  $('#filter-x').on('click', function(){
    $('#filter-container').toggle("slide", { direction: "right" }, 300);
  });

  /////////

}

$(document).ready(ready);
$(document).on('page:load', ready);
