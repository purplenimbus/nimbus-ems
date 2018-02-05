'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('ProfileCtrl', function ($scope,profileData,$window,$route,graphApi,modal,resumeService,wordpressApi,typeaheadService) {
		
		$scope.init = function(){
			console.log('profileData',profileData,$scope);
			if(!profileData.meta.resume){
				profileData.meta.resume = { summary:'' , education:[],experience:[],skills:[]};
			}
			$scope.profileData = profileData;
			$scope.resume = resumeService;
			
			wordpressApi.getData('qualifications').then(function(result){
				$scope.data = result.data;
			})
			.catch(function(error){
				console.log('Worpress get qualifications error',error);
				//TO DO Do something!
			});
			$scope.initiated = true;
		};
		
		if(!$scope.initiated){
			$scope.init();
		}
		
		$scope.next = function(page){
			$scope.loading = true;
			
			var params = $route.current.params;
			
			graphApi.api('GET',params.tenant_id+'/activities?user_id='+params.user_id+'&page='+page).then(function(result){
				
				console.log('next page:'+page,result.data.data);
				
				$scope.profileData = result.data;
				
				//var newArray = $scope.usersList.concat(result.data.data);
				
				//$scope.usersList = newArray;
				
				//list.initialize(true);
				
				$scope.loading = false;
				
			}).catch(function(error){
				console.log('graphApi error',error);
				$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			});
		};
		
		$scope.modal = modal;
		
		typeaheadService.init($scope,'schools','https://maps.googleapis.com/maps/api/place/textsearch/json?query=schools%20in%20lagos&key=AIzaSyBZt2nzYlBKm-H6X9bHRlLGu2_mrmzjRpY','name','schools');
		
		typeaheadService.init($scope,'qualification',wordpressApi.wpEndpoint+'qualifications','name','qualifications');

		$scope.$on('$routeChangeStart', function() { 
		   //close any open menus or modals
			$window.UIkit.offcanvas('#side-menu').hide();
		});
	});
