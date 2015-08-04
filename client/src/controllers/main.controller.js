/**
 * Created by matthew.sanders on 2/23/15.
 */
angular.module('popcorn').controller('mainCtrl', function ($rootScope, $scope, $log, $location, service, model) {
  $scope.model = model;
  $scope.title = "POPCORN";
  $scope.mainTitle = "POPCORN";
  $rootScope.title = '!POPCORN!';
  $rootScope.mainTitle = "POPCORN";


  $scope.createAccount = function(){
    $location.path('/login');
  };
});