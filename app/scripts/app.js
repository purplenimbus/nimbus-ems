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
		'ngTouch',
	])
	.config(function ($routeProvider) {
		$routeProvider
		  .when('/', {
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard'
		  })
		  .when('/users', {
			templateUrl: 'views/users.html',
			controller: 'UsersCtrl',
			controllerAs: 'users'
		  })
		  .when('/account/:id', {
			templateUrl: 'views/account.html',
			controller: 'AccountCtrl',
			controllerAs: 'account'
		  })
		.when('/inventory', {
		  templateUrl: 'views/inventory.html',
		  controller: 'InventoryCtrl',
		  controllerAs: 'inventory'
		})
		  .otherwise({
			redirectTo: '/'
		  });
	});
	