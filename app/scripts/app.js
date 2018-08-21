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
		'satellizer',
		'chart.js',
		'ngStorage',
	])
	.config(function ($routeProvider,$locationProvider,$authProvider,apiConst,$sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			// Allow loading from our assets domain. **.
			'http://edu.nimbus.com:7070/**',
			'http://graph.nimbus.com:8000/**'
		]);
  
		$authProvider.baseUrl = 'http://edu.nimbus.com:7070';
		$authProvider.loginUrl = '/api/v1/login';
		
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
					usersData : function(eduApi,$window,apiConst,user){
						//console.log('usersData before resolve',user);
						return eduApi.api('GET',user.tenant.id+'/users?paginate='+apiConst.componentPagination+'&page=1').then(function(result){
							console.log('usersData result',result);
							return result.data;
						}).catch(function(error){
							console.log('usersData error',error);
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
			.when('/profile/settings', {
				templateUrl: 'views/account.html',
				controller: 'AccountCtrl',
				controllerAs: 'account',
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
			.when('/learning/course/:id', {
				templateUrl: 'views/course.html',
				controller: 'CourseCtrl',
				controllerAs: 'course',
				resolve:	{
					/*courseData : function(eduApi,$window,apiConst,$route,tenant){
						var params = $route.current.params;
						
						return eduApi.api('GET',tenant.id+'/registrations?course_id='+params.id+'&paginate='+apiConst.componentPagination+'&page=1&user_list=true').then(function(result){
							console.log('eduApi course result',result);
							return result.data;
						}).catch(function(){
							$window.UIkit.notification({
								message: 'Couldnt get courseData',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});
						
					}*/
				}
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'login'
			})
			.when('/learning/courses', {
				templateUrl: 'views/courses.html',
				controller: 'CoursesCtrl',
				controllerAs: 'courses',
				resolve:	{
					coursesData : function(eduApi,$window,apiConst,user,sweetAlert){
						return eduApi.api('GET',user.tenant.id+'/courses?paginate='+apiConst.componentPagination+'&page=1')
						.then((result) => {
							return result.data;
						})
						.catch((error) => {
							console.log('eduApi course error',error);
							sweetAlert.alert({
							   	title: 'Something\'s Wrong',
							   	text : error.data.message,
							   	icon: "error",
							   	buttons:{
									confirm: sweetAlert.button({text:'ok'})
								}
							});
						});
						
					}
				}
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl',
				controllerAs: 'register',
				resolve:	{
					services : function(graphApi,$window,apiConst/*,subdomain*/){
						
						return graphApi.api('GET','services?paginate='+apiConst.componentPagination+'&page=1').then(function(result){
							//console.log('eduApi course result',result);
							return result.data;
						}).catch(function(){
							$window.UIkit.notification({
								message: 'Couldnt get services',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});
						
					}
				}
			})
			.when('/settings', {
			  templateUrl: 'views/settings.html',
			  controller: 'SettingsCtrl',
			  controllerAs: 'settings'
			})
			.when('/tools', {
			  templateUrl: 'views/tools.html',
			  controller: 'ToolsCtrl',
			  controllerAs: 'tools'
			})
			.otherwise({
				redirectTo: '/'
			});
			
	})
	.run(function($rootScope, $location, $cookies, $http,$auth,$window) {
		// keep user logged in after page refresh
		
		$rootScope.globals = $cookies.get('auth') || {};
		
		if ($rootScope.globals && $auth.isAuthenticated()) {			
			$http.defaults.headers.common.Authorization = 'Bearer ' + $auth.getToken(); // jshint ignore:line
		}
		
		var history = [];

		$rootScope.$on('$routeChangeStart', function() { 
   			//close any open menus or modals
			$window.UIkit.offcanvas('#side-menu').hide();
		});

		$rootScope.$on('$routeChangeSuccess', function() {
			history.push($location.$$path);
		});

		$rootScope.$on('$locationChangeStart', function () {

			//allowed pages
			var allowed = ['login','register'];
			
			var restricted = false;
			
			angular.forEach(allowed,function(value){
				restricted = $location.path() === '/'+value ? false : true;
			});
			
			//console.log('logged in restrictions',restricted,$location.path());

						
			// redirect to login page if not logged in and trying to access a restricted page
			var loggedIn = $auth.isAuthenticated();//$rootScope.globals.currentUser;
			
			if (!loggedIn && restricted) {
				//auth.clearUser();
				
				//console.log('logging you out',history,$rootScope);
				
				$location.path('/login');//.search({returnUrl: history[0]});
			}
		});
	})
	.filter('trusted', ['$sce', function ($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}]);	