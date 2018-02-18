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
			addEducation : function($scope,data){
				//console.log('resumeService addEducation data',data);
				
				$scope.profileData.meta.resume.education.push(wordpressApi.parseWPData(data));
				$scope.newEducation = {};
								
				console.log('resumeService addEducation education',data,$scope.profileData.meta.resume.education);
			},
			addExperience : function($scope,experience){
				console.log('resumeService addExperience',experience);
				$scope.newExperience = {};
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
