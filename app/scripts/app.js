'use strict';

/**
 * @ngdoc overview
 * @name nimbusEmsApp
 * @description
 * # nimbusEmsApp
 *
 * Main module of the application.
 */
angular
  .module('nimbusEmsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
