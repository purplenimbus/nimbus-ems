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
		'chart.js'
	])
	.config(function ($routeProvider,$locationProvider,$authProvider,apiConst,$sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			// Allow loading from our assets domain. **.
			'http://edu.nimbus.com:7070/**'
		]);
  
		$authProvider.baseUrl = 'http://graph.nimbus.com:8000';
		$authProvider.loginUrl = '/login';
		
		$routeProvider
			.when('/', {
				templateUrl: 'views/jobs.html',
				controller: 'JobsCtrl',
				controllerAs: 'jobs',
				resolve:	{
					jobsData : function(wordpressApi,$window,apiConst,$rootScope){
						$rootScope.loading = true;		
						return wordpressApi.getData('jobs?per_page='+apiConst.componentPagination).then(function(result){
							console.log('WordpressApi result',result);
							
							return result.data;
						}).catch(function(error){
							console.log('WordpressApi error',error);
							$window.UIkit.notification({
								message: 'Couldnt get Jobs',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});
						
					}
				}
			})
			.when('/job/:jobID', {
				templateUrl: 'views/job.html',
				controller: 'JobCtrl',
				controllerAs: 'job',
				resolve:	{
					jobData : function(wordpressApi,$window,apiConst,$rootScope,$route){
						$rootScope.loading = true;		
						return wordpressApi.getData('jobs/'+$route.current.params.jobID).then(function(result){
							console.log('WordpressApi result',result);
							
							return result.data;
						}).catch(function(error){
							console.log('WordpressApi error',error);
							$window.UIkit.notification({
								message: 'Couldnt get Jobs',
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
				resolve:	{
					profileData : function($cookies,graphApi,subdomain,$window){
						//console.log('profileData',JSON.parse($cookies.get('auth')));
						var id = JSON.parse($cookies.get('auth')).id;
						
						return graphApi.api('GET',subdomain+'/users/'+id).then(function(user){
							
							console.log('get user',user);
							
							return user.data[0];
						}).catch(function(){
							$window.UIkit.notification({
								message: 'Couldnt get profile data',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});
						
						//return JSON.parse($cookies.get('auth'));//user.data[0];
					}
				}
			})
			.when('/profile/:id', {
				templateUrl: 'views/profile.html',
				controller: 'ProfileCtrl',
				controllerAs: 'profile',
				resolve:	{
					profileData : function(graphApi,$window,$route,subdomain){
												
						var params = $route.current.params;
			
						//var profileData = {};
						
						return graphApi.api('GET',subdomain+'/users/'+params.id).then(function(user){
							
							//console.log('get user',user);
							
							var profileData = user.data[0];
							
							return graphApi.api('GET',subdomain+'/activities?user_id='+params.id+'&paginate='+apiConst.componentPagination+'&page=1').then(function(activities){
								
								profileData.activities = activities.data;
								
								//console.log('get user activities',profileData);
								
								return profileData;
							}).catch(function(){
								$window.UIkit.notification({
									message: 'Couldnt get profile data',
									status: 'danger',
									pos: 'top-right',
									timeout: 5000
								});
							});
							//return result.data;
						}).catch(function(){
							$window.UIkit.notification({
								message: 'Couldnt get profile data',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});

						
					}
				}
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
				controllerAs: 'login'
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
			.otherwise({
				redirectTo: '/'
			});
			/*.when('/dashboard', {
				templateUrl: 'views/dashboard.html',
				controller: 'DashboardCtrl',
				controllerAs: 'dashboard'
			})
			.when('/learning/courses', {
				templateUrl: 'views/courses.html',
				controller: 'CoursesCtrl',
				controllerAs: 'courses',
				resolve:	{
					coursesData : function(eduApi,$window,apiConst,tenant){
						
						return eduApi.api('GET',tenant.id+'/courses?paginate='+apiConst.componentPagination+'&page=1').then(function(result){
							console.log('eduApi course result',result);
							return result.data;
						}).catch(function(error){
							console.log('eduApi course error',error);
							$window.UIkit.notification({
								message: 'Couldnt get courseData',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});
						
					}
				}
			})
			.when('/users', {
				templateUrl: 'views/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'users',
				resolve:	{
					usersData : function(graphApi,$window,apiConst,subdomain){
						return graphApi.api('GET',subdomain+'/users?paginate='+apiConst.componentPagination+'&page=1').then(function(result){
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
					courseData : function(eduApi,$window,apiConst,$route){
						var params = $route.current.params;
						
						return eduApi.api('GET',1+'/registrations?course_id='+params.id+'&paginate='+apiConst.componentPagination+'&page=1').then(function(result){
							//console.log('eduApi course result',result);
							return result.data;
						}).catch(function(){
							$window.UIkit.notification({
								message: 'Couldnt get courseData',
								status: 'danger',
								pos: 'top-right',
								timeout: 5000
							});
						});
						
					}
				}
			})*/
	})
	.run(function($rootScope, $location, $cookies, $http,$auth) {
		//console.log('$cookies',JSON.parse($cookies.get('auth')),$auth.getToken());
		// keep user logged in after page refresh
		$rootScope.loading = true;
		
		$rootScope.globals = $cookies.get('auth') || {};
		
		if ($rootScope.globals && $auth.isAuthenticated()) {			
			$http.defaults.headers.common.Authorization = 'Bearer ' + $auth.getToken(); // jshint ignore:line
		}
		
		var history = [];

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

						
			// redirect to login page if not logged in and trying to access a restricted page
			var loggedIn = $auth.isAuthenticated();//$rootScope.globals.currentUser;
			
			if (!loggedIn && restricted) {
				console.log('logging you out',history);
				
				$location.path('/login');//.search({returnUrl: history[0]});
			}
		});
	})
	.filter('trusted', ['$sce', function ($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	}]);	