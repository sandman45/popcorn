
var app = angular.module('popcorn');

app.factory('service', function( $http, $q, $location, $log, config ) {
 var service = {};
 //var url = "http://107.170.178.211:8081/"
 //var url = "http://localhost:8081/"
  var url = config.couch.urlLocal;
  service.login = function( data ){
    var d = $q.defer();
    var _url = url + "login";
    $http.post( _url, data).success( function( data, status, headers, config ) {
      d.resolve(data);
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err);
    });

    return d.promise;
  };

  service.logout = function( data ){
    var d = $q.defer();
    var _url = url + "logout";
    $http.get( _url, data).success( function( data, status, headers, config ) {
      d.resolve(data);
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err);
    });

    return d.promise;
  };


  service.getUser = function(id) {
    var d = $q.defer();

    var _url = url + "popcorn/user/" + id;
    $http.get( _url ).success( function( data, status, headers, config ) {
      d.resolve( data );
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err);
    });

    return d.promise;
  };

  service.updateUser = function(doc) {
    var d = $q.defer();

    var _url = url + "popcorn/updateUser";
    $http.post( _url, doc ).success( function( data, status, headers, config ) {
      d.resolve( data );
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err);
    });

    return d.promise;
  };


  service.getPaleoResults = function( id ) {
    var d = $q.defer();

    var _url = url + "popcorn/paleo-results/" + id;
    $http.get( _url ).success( function( data, status, headers, config ) {
      if( data ){
        d.resolve( data );
      }
    })
    .error( function( err, code ) {
        d.reject( err );
        $log.error( err);
    });

    return d.promise;
  };

  service.insertPaleoData = function( data ) {
    var d = $q.defer();
    var _url = url + "popcorn/createPaleoResult";
    $http.post( _url, data ).success( function( data, status, headers, config ) {
      if( data ){
        d.resolve( data );
      }
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err );
    });
    return d.promise;
  };

  service.insertUser = function( userObj ) {
    var d = $q.defer();
    var _url = url + "createUser";
    $http.post( _url, userObj ).success( function( data, status, headers, config ) {
      if( data ){
        d.resolve( data );
      }
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err );
    });
    return d.promise;
  };

  service.getRecipes = function( id ) {
    var d = $q.defer();
    var _url = url + "popcorn/recipe/getRecipe/" + id;
    $http.get( _url ).success( function( data, status, headers, config ) {
      if( data ){
        d.resolve( data );
      }
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err);
    });
    return d.promise;
  };

  service.insertRecipe = function( recipeObj ) {
    var d = $q.defer();
    var _url = url + "popcorn/recipe/insertRecipe";
    $http.post( _url, recipeObj ).success( function( data, status, headers, config ) {
      if( data ){
        d.resolve( data );
      }
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err );
    });
    return d.promise;
  };

  service.insertChallenge = function( obj ) {
    var d = $q.defer();
    var _url = url + "popcorn/createChallenge";
    $http.post( _url, obj ).success( function( data, status, headers, config ) {
      if( data ){
        d.resolve( data );
      }
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err );
    });
    return d.promise;
  };


  service.getChallenge = function( ){
    var d = $q.defer();
    var _url = url + "popcorn/getChallenge";
    $http.get( _url ).success( function( data, status, headers, config ) {
      if( data ){
        d.resolve( data );
      }
    })
    .error( function( err, code ) {
      d.reject( err );
      $log.error( err);
    });
    return d.promise;
  };


  return service;
});