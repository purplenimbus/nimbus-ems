'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('CourseCtrl', function ($scope,courseData,grades,eduApi,apiConst,modal,courseService,tenant,$route,$window) {
		$scope.init = function(){
			
			var params = $route.current.params;
			var self = this;
			
			$scope.loadingHome = true;
			
			eduApi.api('GET',tenant.id+'/registrations?course_id='+params.id+'&paginate='+apiConst.componentPagination+'&page=1&user_list=true').then(function(result){
				console.log('eduApi course result',result);
				self.courseData = result.data;
				console.log('courseData',self.courseData);
			
				$scope.students = self.courseData.data;
				$scope.pageTitle = self.courseData.data[0].course.name;
				
				$scope.loadingHome = false;
			}).catch(function(){
				$window.UIkit.notification({
					message: 'Couldnt get courseData',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			});
		
		};
		
		$scope.getTotal = function(index){	
			return 	grades.getTotal($scope.students[index].meta.grades,$scope.students[index].course.meta.course_schema);
		};
		
		$scope.getGrade = function(index){			
			return grades.getGrade(grades.getTotal($scope.students[index].meta.grades,$scope.students[index].course.meta.course_schema));
		};
		
		$scope.loadOutline = function(){
			$scope.loadingOutline = true;
			eduApi.api('GET',tenant.id+'/lessons?course_id='+courseData.data[0].course.id+'&paginate='+apiConst.componentPagination+'&page=1').then(function(result){
				console.log('outline loaded',result);
				$scope.loadingOutline = false;
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
