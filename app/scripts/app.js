'use strict';

/*
 * Main module of the application.
 */
angular
  .module('toyRobotApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'controllers',
    'services'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

