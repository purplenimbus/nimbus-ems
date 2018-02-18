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
				$scope.profileData.meta.resume.summary.value = summary;
				$scope.newSummary = '';
				$scope.profileData.meta.resume.summary.edit = false;
				console.log('resumeService addSummary',$scope.profileData.meta.resume);
			},
			add	: function($scope,key,data){
				$scope.profileData.meta.resume[key].push(wordpressApi.parseWPData(data));
				$scope['new'+key.charAt(0).toUpperCase() + key.slice(1)] = {};
				console.log('resumeService add '+key,data,$scope.profileData.meta.resume);
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
