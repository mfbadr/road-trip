/* global geocode */

(function(){
  'use strict';

  $(document).ready(function(){
    $('#origin').blur(geocodeOrigin);
    $('#destination').blur(geocodeDestination);
  });

  function geocodeOrigin(){
    var origin = $('#origin').val();
    geocode(origin, function(originName, originLat, originLng){
      $('#origin').val(originName);
      $('#originLat').val(originLat);
      $('#originLng').val(originLng);
    });
  }
  function geocodeDestination(){
    var destination = $('#destination').val();
    geocode(destination, function(destinationName, destinationLat, destinationLng){
      $('#destination').val(destinationName);
      $('#destinationLat').val(destinationLat);
      $('#destinationLng').val(destinationLng);
    });
  }
})();

