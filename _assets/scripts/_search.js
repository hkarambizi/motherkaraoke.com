'use strict';

var $ = require('jquery');
var _ = require('underscore');
var fusejs = require('fuse.js');

var searchData, fuse;
// Initialize fuse.js options
var options = {
  shouldSort: true,
  threshold: 0.1,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "artist",
    "title"
  ]
};

// Get the generated search_data.json file so lunr.js can search it locally.
searchData = $.ajax({
  url: './search_data.json',
  type: "GET", // default is GET but you can use other verbs based on your needs.
  dataType: "json", // specify the dataType for future reference
});
searchData.done(successHandler);
function successHandler (data) {
  var i = _(data).toArray();

  fuse = new fusejs(i, options); // "list" is the item array
}

function display_search_results(results) {
  console.log("success");
  console.log(results);

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
    var fuseResults = fuse.search($query); // Get fuse.js to perform a search

    display_search_results(fuseResults); // Hand the results off to be displayed

  });

});
