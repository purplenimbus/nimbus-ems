'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('CourseCtrl', function ($scope,$window,grades,eduApi,apiConst,modal,courseService,user,$route) {
		$scope.init = function(){
			
			var params = $route.current.params;
			
			$scope.instuctor = {
				fname : 'joey',
				lname : 'badass'
			};
			
			return courseService.initCourse($scope,params);
		
		};
		
		$scope.getTotal = function(course){	
			if(course.meta){
				return 	grades.getTotal(course.meta.grades,course.course.meta.course_schema);
			}else{
				return false;
			}
		};
				
		$scope.getGrade = function(course){
			if(course.meta){
				return grades.getGrade(grades.getTotal(course.meta.grades,course.course.meta.course_schema));
			}else{
				return false;
			}
		};
		
		$scope.loadOutline = function(){
			$scope.loadingOutline = true;
			//console.log('loadOutline',$scope,user);
			
			//TO DO do validation here
			if($scope.courseData){
				eduApi.api('GET',user.tenant.id+'/lessons?course_id='+$scope.courseData.data[0].course.id+'&paginate='+apiConst.componentPagination+'&page=1')
				.then((result) => {
					console.log('outline loaded',result);
					if(result.data.length && result.data.data){
						$scope.outline = result.data.data;
					}else{
						$scope.outlineMessage = result.statusText ? result.statusText : 'No Data';
					}
					
					$scope.loadingOutline = false;
				})
				.catch((error) => {
					$scope.outlineMessage = error.statusText ? error.statusText : 'Error';
					$scope.loadingOutline = true;
				});
			}else{
				$scope.outlineMessage = 'No Course Data';
			}
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
		
	});
