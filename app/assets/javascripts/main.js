var ready;
ready = function() {
  $("#query").autocomplete({
        source: gon.searchCriteria,
        noResults: ''
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
