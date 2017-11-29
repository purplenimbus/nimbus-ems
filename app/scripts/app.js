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
			.when('/profile/settings', {
				templateUrl: 'views/account.html',
				controller: 'AccountCtrl',
				controllerAs: 'account'
			})
			.when('/:tenant_id/profile/:id', {
			  templateUrl: 'views/profile.html',
			  controller: 'ProfileCtrl',
			  controllerAs: 'profile',
			  resolve:	{
					profileData : function(emsApi,$window,$route){
												
						var params = $route.current.params;
						
						//var profileData = {};
						
						return emsApi.api('GET',params.tenant_id+'/users/'+params.id).then(function(user){
							
							//console.log('get user',user);
							
							var profileData = user.data.data[0];
							
							return emsApi.api('GET',params.tenant_id+'/activities?user_id='+params.id+'&paginate='+apiConst.componentPagination+'&page=1').then(function(activities){
								
								profileData.activities = activities.data;
								
								console.log('get user activities',profileData);
								
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
			.when('/:tenant_id/inventory', {
			  templateUrl: 'views/inventory.html',
			  controller: 'InventoryCtrl',
			  controllerAs: 'inventory'
			})
			.when('/:tenant_id/learning', {
			  templateUrl: 'views/learning.html',
			  controller: 'LearningCtrl',
			  controllerAs: 'learning'
			})
			.when('/:tenant_id/learning/course/:id', {
			  templateUrl: 'views/course.html',
			  controller: 'CourseCtrl',
			  controllerAs: 'course',
			  resolve:	{
					courseData : function(eduApi,$window,apiConst,$route){
						var params = $route.current.params;
						
						return eduApi.api('GET',params.tenant_id+'/registrations?course_id='+params.id+'&paginate='+apiConst.componentPagination+'&page=1').then(function(result){
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
			})
			.when('/login', {
			  templateUrl: 'views/login.html',
			  controller: 'LoginCtrl',
			  controllerAs: 'login'
			})
			.when('/:tenant_id/learning/courses', {
			  templateUrl: 'views/courses.html',
			  controller: 'CoursesCtrl',
			  controllerAs: 'courses',
			  resolve:	{
					coursesData : function(eduApi,$window,apiConst,$route){
						var params = $route.current.params;
						
						return eduApi.api('GET',params.tenant_id+'/courses?paginate='+apiConst.componentPagination+'&page=1').then(function(result){
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
			})
			.otherwise({
				redirectTo: '/'
			});
	});
	