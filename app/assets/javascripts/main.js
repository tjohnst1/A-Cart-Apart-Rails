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
    $('#map').slideToggle("slow");
  });

}

$(document).ready(ready);
$(document).on('page:load', ready);
