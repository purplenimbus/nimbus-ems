'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:CoursesCtrl
 * @description
 * # CoursesCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('CoursesCtrl', function ($scope,coursesData,grades,courseService) {
		$scope.asset = { 
			meta : {
				class_id : 1,
			} 
		};
		
		$scope.coursesList = coursesData.data;
				
		//$scope.coursesList = coursesData.data ? coursesData.data : false;
		
		$scope.courseAverage = function(index){
			return grades.getAverage($scope.coursesList[index]);
		};
		
		$scope.courseGrade = function(index){
			return grades.getGrade(grades.getAverage($scope.coursesList[index]));
		};
		
		console.log('CoursesCtrl scope',$scope);
		
		$scope.next = function(){
			
		};
		
		$scope.course = courseService;
		
		$scope.save = function(data){ courseService.save(data); };
	});
