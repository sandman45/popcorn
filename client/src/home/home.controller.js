
controllers.controller('homeCtrl', ['$scope', 'service', '$location', '$modal', '$log', 'model',
  function($scope, service, $location, $modal, $log, model) {


    $scope.init = function() {
      $scope.model = model.user;


      service.getChallenge().then(function (data) {
        $scope.challenges = data;
        $log.info(JSON.stringify(model));
        $log.info(JSON.stringify(data));
        $scope.model = model;
      });

    };

    $scope.viewDetails = function (id) {
      $log.info(JSON.stringify(model.user) + " " + id);
      //TODO: Go to Challenges details page
    };

    $scope.submitChallenge = function(){
      //TODO: submit challenge
    }

  }]);