var ready;
ready = function() {
  // $("#query").autocomplete({
  //       source: gon.searchCriteria,
  //       noResults: ''
  // });
  $('.checkbox').on('click',function(){
    $('#filter-by-category').submit();
  });

  if (gon.selectedFilter !== undefined){
    $('#' + gon.selectedFilter + '-filter').parent().addClass('selected-filter');
  };

  $('#categories-header').on('click', function(){
    $('#categories-container').slideToggle('slow');
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
  })

}

$(document).ready(ready);
$(document).on('page:load', ready);
