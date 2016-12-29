'use strict';

var $ = require('jquery');
var _ = require('underscore');
var lunr = require('lunr');

// Initialize lunr with the fields to be searched, plus any boost.
window.idx = lunr(function () {
  this.field('artist');
  this.field('title');
  this.ref('id');
  this.field('styles');
});

// Get the generated search_data.json file so lunr.js can search it locally.
window.search_data = $.ajax({
  url: './search_data.json',
  type: "GET", // default is GET but you can use other verbs based on your needs.
  dataType: "json", // specify the dataType for future reference
});
window.search_data.done(successHandler);
function successHandler (data) {
  $.each(data, function(key, value){
    window.idx.add(
      $.extend({ "id": key }, value)
    );
  });
}

function display_search_results(results) {
  console.log('DISPLAY RESULTS :: ');
  var $placeholder = $('#js-search_results');
  var tests = _.sortBy(results, 'artist');
  var testg = _.groupBy(tests, 'artist');
  var html_stuff = "";
  html_stuff = '<h2 class="search__heading">Search Results</h2><section class="search__list">'
  $.each( testg, function( key, value ) {
    console.log( key + ": " );
    console.log('value = ' + value);
    html_stuff += '<p class="search__artist">' + key + '</p><ul>';
    var val = _.sortBy(value, 'title');
    $.each(val, function(k, v) {
      console.log(k + ":::" + v.title);

      html_stuff += '<li class="search__title">' + v.title + '</li>';
    });
    html_stuff += '</ul>';
  });
  html_stuff += "</section>";
  $placeholder.empty().append(html_stuff);
}

$(function() {
  // Event when the form is submitted
  $("#js-songsearch").submit(function(event){
    event.preventDefault();
    var $query = $("#js-songsearch_input").val(); // Get the value for the text field
    var lunrResults = window.idx.search($query); // Get lunr to perform a search

    // Wait for data to load
    window.search_data.then(function(loaded_data) {
      var search_results = [];

      // Iterate over the results and add to the results array
      lunrResults.forEach(function(result) {
        var item = loaded_data[result.ref];
        search_results.push(item);
      });

      display_search_results(search_results); // Hand the results off to be displayed

    });

  });

});
