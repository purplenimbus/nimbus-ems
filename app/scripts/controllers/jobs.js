'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:JobsCtrl
 * @description
 * # JobsCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('JobsCtrl', function (jobsData,$rootScope,wordpressApi,$scope) {
		this.init = function(){
			var parsed = [];
			
			angular.forEach(jobsData,function(value){
				parsed.push(wordpressApi.parseWPData(value));
			});
			
			console.log('Init parsing',parsed);
			
			this.jobs = parsed;
			
			$rootScope.loading = false;
			
		};
		
		$scope.wordpress = function(data){			
			return wordpressApi.parseWPData(data);
		};
		
		this.init();
	});
