/**
 * Created by matthew.sanders on 1/31/14.
 */
var popcornApp = angular.module('popcorn', [
  'ui.bootstrap',
  'ngRoute',
  'colorpicker.module',
  'controllers',
  'nvd3',
  'ngLodash'
]);

popcornApp.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'src/login/login.html',
        controller: 'loginCtrl'
        //secure:true
      })
      .when('/home', {
        templateUrl: 'src/home/home.html',
        controller: 'homeCtrl'
        //secure:true
      })
      .when('/main', {
        templateUrl: '/index'
        //secure:true
      })
      .when('/about', {
        templateUrl: 'views/about.html'
        //secure:false
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
        //secure:false
      })
      .otherwise({
        redirectTo: '/index',
        controller: 'mainCtrl'
      });
    }]);
