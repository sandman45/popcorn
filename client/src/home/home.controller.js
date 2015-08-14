
controllers.controller('homeCtrl', ['$scope', 'service', 'giphy', '$location', '$modal', '$log', 'model',
  function($scope, service, giphy, $location, $modal, $log, model) {


    $scope.init = function() {
      getChallenges();
    };

    function getChallenges(){
      service.getChallenge().then(function (data) {
        $scope.challenges = data;
        $scope.model = model.user;
        $scope.homeImage = model.user.homeImage?model.user.homeImage:'http://i.giphy.com/LSnUSeF7m5n8s.gif';
      });
    }

    $scope.open = function(size){
      var modalInstance = $modal.open({
        templateUrl: '/src/challenge/challenge-modal.html',
        controller: 'challengeModalCtrl',
        size: size,
        resolve: {
          items: function () {
            return [];
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
        getChallenges();
      });
    };



    $scope.randomGiphy = function(){
      var randomIndex = Math.floor((Math.random() * 100) + 0);
      if( model.randomGiphyImages.length < 1 ){
        giphy.getRandomImage('popcorn',100,'pg').then(function(data){
          model.randomGiphyImages = data.data;
          $scope.homeImage =  model.randomGiphyImages[randomIndex].images.downsized.url;
        });
      }else{
        $scope.homeImage = model.randomGiphyImages[randomIndex].images.downsized.url;
      }
    };

    $scope.keepImage = function(){
      model.user.homeImage = $scope.homeImage;
      service.updateUser( model.user).then(function(data){
        $log.info(data);
      });
    };

    $scope.viewDetails = function (index) {
      //$log.info(JSON.stringify(model.user) + " " + index);
      //TODO: Go to Challenges details page
      model.challenge = $scope.challenges[index];
      $location.path('/challenge-detail');
    };


  }]);