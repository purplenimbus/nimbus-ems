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
		'siyfion.sfTypeahead',
		'satellizer'
	])
	.config(function ($routeProvider,$locationProvider,$authProvider,apiConst) {
		$authProvider.baseUrl = 'http://graph.nimbus.com:8000';
		$authProvider.loginUrl = '/'+apiConst.defaultTenantId+'/login';
		
		$routeProvider
		.when('/', {
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardCtrl',
			controllerAs: 'dashboard'
		})
		.when('/users', {
			templateUrl: 'views/users.html',
			controller: 'UsersCtrl',
			controllerAs: 'users',
			resolve:	{
				usersData : function(emsApi,$window,apiConst){
					return emsApi.api('GET','1/users?paginate='+apiConst.componentPagination+'&page=1').then(function(result){
						return result.data;
					}).catch(function(){
						$window.UIkit.notification({
							message: 'Couldnt get usersData',
							status: 'danger',
							pos: 'top-right',
							timeout: 5000
						});
					});
					
				}
			}
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
		.when('/learning', {
		  templateUrl: 'views/learning.html',
		  controller: 'LearningCtrl',
		  controllerAs: 'learning'
		})
		.otherwise({
			redirectTo: '/'
		});
	});
	