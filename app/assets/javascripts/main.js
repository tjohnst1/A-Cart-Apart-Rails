var ready;
ready = function() {
  // $("#query").autocomplete({
  //       source: gon.searchCriteria,
  //       noResults: ''
  // });

  $('#account-button').on('click', function(){
    if (!document.cookie){
      $("#login-modal").modal('toggle');
    }
  });

  $('.checkbox').on('click',function(){
    $('#filter-by-category').submit();
  });

  if (gon.selectedFilter !== undefined){
    $('#' + gon.selectedFilter + '-filter').parent().addClass('selected-filter');
  };

  $('#categories-header').on('click', function(){
    $('#categories-list').slideToggle('slow');
    var caret = $('#categories-header span').attr('class')
    if (caret === 'caret-left'){
      $('#categories-header span').removeClass('caret-left')
      $('#categories-header span').addClass('caret-down')
    } else {
      $('#categories-header span').removeClass('caret-down')
      $('#categories-header span').addClass('caret-left')
    }
  });

  $('#tab-view button').on('click', function(){
    var btnText = $('#tab-view button').html()
    if (btnText === 'Tab View'){
      $('#tab-view button').html('Map View')
    } else {
      $('#tab-view button').html('Tab View')
    }
    $('#map').slideToggle("slow");
    $('#cart-list').fadeToggle("slow");
  });

  $('#selected-food-cart-details').on('click', function(){
    if ($('#selected-food-cart-container').css('display') !== 'none'){
      if ($('.selected-food-cart').css('display') === 'none'){
        $('.selected-food-cart').slideDown();
        $('#selected-food-cart-details').html('<span class="glyphicon glyphicon-chevron-up"></span> Hide Details');
      } else {
        $('.selected-food-cart').slideUp();
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
      $('#flash-messages').fadeOut('slow')
    }, 2000)
  };

//////// Search Box Functions ////////

  function autocompleteSearchArr(foodCarts){
    var autocompleteHash = [];
    var tagNames = [];
    for (var i = 0; i < foodCarts.length; i++) {
      var newNameHash = {value: foodCarts[i]["name"], data: { category: 'Food Cart Name' }};
      for (var t = 0; t < foodCarts[i]["tags"].length; t++){
        var tag = foodCarts[i]["tags"][t]["name"];
        if (tagNames.indexOf(tag) === -1){
          tagNames.push(tag);
        };
      };
      autocompleteHash.push(newNameHash);
    }
    for (var n = 0; n < tagNames.length; n++){
      autocompleteHash.push({value: tagNames[n], data: { category: 'Categories' }});
    }
    return autocompleteHash;
  }

  var autocompleteLookup = autocompleteSearchArr(foodCarts)

  $('#search-box-input').autocomplete({
    lookup: autocompleteLookup,
    showNoSuggestionNotice: true,
    noSuggestionNotice: 'Sorry, no matching results',
    groupBy: 'category'
  });

  $('#search-box-input').change(function(){
    filterMarkers(foodCarts, setMarkerCollection, $(this).val())
  });

}

$(document).ready(ready);
$(document).on('page:load', ready);
