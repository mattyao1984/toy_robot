'use strict';

/**
 * @ngdoc overview
 * @name freelanceWorkApp
 * @description
 * # freelanceWorkApp
 *
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
    'controllers'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
