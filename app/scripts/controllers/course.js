'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('CourseCtrl', function ($scope,courseData,grades,eduApi,apiConst,modal,courseService) {
		$scope.init = function(){
			console.log('courseData',courseData);
			$scope.students = courseData.data;
			$scope.pageTitle = courseData.data[0].course.name;
		};
		
		$scope.getTotal = function(index){	
			return 	grades.getTotal($scope.students[index].meta.grades,$scope.students[index].course.meta.course_schema);
		};
		
		$scope.getGrade = function(index){			
			return grades.getGrade(grades.getTotal($scope.students[index].meta.grades,$scope.students[index].course.meta.course_schema));
		};
		
		$scope.loadOutline = function(){
			$scope.loading = true;
			eduApi.api('GET','1/lessons?course_id='+courseData.data[0].course.id+'&paginate='+apiConst.componentPagination+'&page=1').then(function(result){
				console.log('outline loaded',result);
				$scope.loading = false;
				$scope.outline = result.data.data;
			})
			.catch(function(){
				//TO DO do something
			});
		};
		
		angular.element('.uk-switcher').on({

			'show': function(e){
				switch(angular.element(e.target).get(0).dataset.tab){
					case 'outline' : if(!$scope.outline){	$scope.loadOutline(); 	} break;
				}
			},

		});
		
		$scope.init();
		
		$scope.course = courseService;
		
		/*$scope.$watchCollection('students', function(newNames, oldNames) {
		  console.log('students changed',newNames,oldNames);
		  $scope.getTotal();
		});*/
	});
