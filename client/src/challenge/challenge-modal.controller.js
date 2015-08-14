
controllers.controller('challengeModalCtrl', ['$scope', '$modalInstance', 'service', '$location', '$log', 'utils',
  function($scope, $modalInstance, service, $location, $log, utils) {

    $scope.alerts = [];

    $scope.closeAlert = function(i){
      $scope.alerts.splice(i,1);
    };

    $scope.create = function(){
      var obj = {
        name: $scope.name,
        desc: $scope.desc
      };
      if(validate(obj)){
        service.insertChallenge(obj).then(function(){
          $modalInstance.dismiss();
        }, function(err){
          $log.error(err);
          $modalInstance.dismiss();
        });
      }else{
        $log.info("invalid.");
      }
    };

    $scope.cancel = function(){
      $modalInstance.dismiss();
    };

    var validate = function(obj){
      var valid = false;
      if(obj.name.length > 0){
        valid = true;
      }else{
        $scope.alerts.push({type:'danger',msg:'Invalid.'});
        valid = false
      }
      if(obj.desc.length > 0){
        valid = true;
      }else{
        $scope.alerts.push({type:'danger',msg:'Invalid.'});
        valid = false
      }

      return valid;
    }

  }]);