'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.resumeService
 * @description
 * # resumeService
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('resumeService', function (wordpressApi) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		return {
			addSummary : function($scope,summary){
				console.log('resumeService addSummary',summary);
				$scope.newSummary = '';
			},
			add	: function($scope,key,data){
				
				$scope.profileData.meta.resume[key].push(wordpressApi.parseWPData(data));
				$scope.newExperience = {};
				console.log('resumeService add '+key,data,$scope.profileData.meta.resume[key]);
			},
			remove : function($scope,key,index){
				console.log('remove',$scope.profileData.meta.resume[key],index);
				$scope.profileData.meta.resume[key].splice(index,1);
			},
			edit : function($scope,key,index){
				console.log('edit',$scope.profileData.meta.resume[key],index);
				$scope['new'+key] = $scope.profileData.meta.resume[key][index];
			}
		};
	});
