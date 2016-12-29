'use strict';

var $ = require('jquery');
var _ = require('underscore');
var l = require('lunr');


$(document).ready(function() {
  // Initialize lunr with the fields to be searched, plus any boost.
  window.idx = l(function () {
    this.field('artist');
    this.field('title');
    this.ref('id');
    this.field('styles');
  });

  // Get the generated search_data.json file so lunr.js can search it locally.
  window.search_data = $.getJSON('/search_data.json');

  // Wait for the data to load and add it to lunr
  window.search_data.then(function(loaded_data){
    $.each(loaded_data, function(key, value){
      window.idx.add(
        $.extend({ "id": key }, value)
      );
    });
  });

  // Event when the form is submitted
  $("#js-songsearch").submit(function(event){
      event.preventDefault();
      var $query = $("#js-songsearch_input").val(); // Get the value for the text field
      var lunr_results = window.idx.search($query); // Get lunr to perform a search

      // Wait for data to load
      window.search_data.then(function(loaded_data) {
        var search_results = [];

        // Iterate over the results and add to the results array
        lunr_results.forEach(function(result) {
          var item = loaded_data[result.ref];
          search_results.push(item);
        });

        display_search_results(search_results); // Hand the results off to be displayed

      });
  });

  function display_search_results(results) {
    console.log('DISPLAY RESULTS :: ');
    var $placeholder = $('#js-search_results');
    var tests = _.sortBy(results, 'artist');
    var testg = _.groupBy(tests, 'artist');
    var html_stuff = "";
    html_stuff = '<h2 class="search__heading">Search Results</h2><dl class="search__list">'
    $.each( testg, function( key, value ) {
      console.log( key + ": " );
      console.log('value = ' + value);
      html_stuff += '<dt class="search__artist">' + key + '</dt>';
      var val = _.sortBy(value, 'title');
      $.each(val, function(k, v) {
        console.log(k + ":::" + v.title);

        html_stuff += '<dd class="search__title">' + v.title + '</dd>';
      });
    });
    html_stuff += "</dl>";
    placeholder.empty().append(html_stuff);
    /*var testc = _.chain(results)
      .sortBy(results, 'artist')
      .groupBy(results, 'artist')
      .value();*/

    //console.log(results[item]);
    //var artist = item;
    //var searchitem = '<div class="result"><div class="post-date small">'+songlist[ref].band+' : '+songlist[ref].song+'<div></div>';
    //resultdiv.append(searchitem);
    //$('#search_results')

  }

});
