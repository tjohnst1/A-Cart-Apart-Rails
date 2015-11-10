var ready;
ready = function() {
  // $("#query").autocomplete({
  //       source: gon.searchCriteria,
  //       noResults: ''
  // });
  $('.checkbox').on('change',function(){
    $('#filter-by-category').submit();
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
