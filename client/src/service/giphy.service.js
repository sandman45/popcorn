
var app = angular.module('popcorn');

app.factory('giphy', function( $http, $q, $location, $log, config ) {
  var service = {};
  //var url = "http://107.170.178.211:8081/"
  //var url = "http://localhost:8081/"
  var url = config.giphy.url;
  var key = config.giphy.publicKey;

  //http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC

  service.getRandomImage = function(term, limit, rating) {
    var d = $q.defer();
    var _url = url + "/search?q=" + term + "&api_key=" + key + "&rating=" + rating + "&limit=" + limit + "&callback=JSON_CALLBACK";
    $http.get(_url).success(function(data, status , header, config){
      d.resolve(data);
    })
    .error(function(data, status , header, config){
      d.reject(data);
    });

    return d.promise;
  };

  return service;
});