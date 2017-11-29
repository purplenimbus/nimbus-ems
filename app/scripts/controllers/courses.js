'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:CoursesCtrl
 * @description
 * # CoursesCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('CoursesCtrl', function ($scope,coursesData,grades) {
		$scope.coursesData = coursesData;
				
		$scope.coursesList = coursesData.data;
		
		$scope.courseAverage = function(index){
			return grades.getAverage($scope.coursesList[index]);
		};
		
		$scope.courseGrade = function(index){
			return grades.getGrade(grades.getAverage($scope.coursesList[index]));
		};
		
		console.log('CoursesCtrl scope',$scope);
		
		$scope.next = function(){
			
		};
	});
