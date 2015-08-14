
controllers.controller('challengeDetailCtrl', ['$scope', 'service', '$location', '$modal', '$log', 'model',
  function($scope, service, $location, $modal, $log, model) {


    $scope.init = function() {
      $scope.model = model.user;


      $scope.c = model.challenge;

    };

    $scope.submit = function (id) {
      $log.info(JSON.stringify(model.user) + " " + id);
      //TODO: submit entry to challenge
      //use modal
    };

    $scope.back = function(){
      $location.path('/home');
    }

  }]);