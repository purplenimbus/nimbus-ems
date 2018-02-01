'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:JobCtrl
 * @description
 * # JobCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('JobCtrl', function (jobData,$rootScope,wordpressApi,$scope) {
		this.init = function(){
			$scope.jobData = wordpressApi.parseWPData(jobData);
			$scope.pageTitle = $scope.jobData.title;
			console.log('jobData',$scope.jobData);
			$rootScope.loading = false;
		};
		
		this.init();
	});
