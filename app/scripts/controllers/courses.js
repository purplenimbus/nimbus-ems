'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:CoursesCtrl
 * @description
 * # CoursesCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('CoursesCtrl', function ($scope,coursesData,grades,courseService,modal,form,uikit3,eduApi,user) {
		$scope.asset = { 
			meta : {
				class_id : 1,
				course_schema : {
		            lab: {value:5,enabled:true},
		            exam: {value:35,enabled:true},
		            quiz: {value:10,enabled:true},
		            midterm: {value:30,enabled:true},
		            assignment: {value:15,enabled:true},
		            attendance: {value:5,enabled:true}
		        }
			} 
		};

		$scope.getSchema = function(){
			return Object.keys($scope.asset.meta.course_schema);
		}
		
		$scope.coursesList = coursesData.data,
		$scope.createCourseInit = false;
				
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
		
		$scope.createCourse = function(){

			var obj = {
				title	:	'Create Course',
				body	:	form.editCourse($scope),
				footer	:	uikit3.button({cls:'uk-button uk-button-text uk-margin-small-bottom',icon:'upload',label:'Save',directive:'ng-click="save(this.asset)"'})
			};

			if(!$scope.createCourseInit){
				courseService.initTypeAhead($scope,[{
					name:'subjects',
					display:'name',
					endPoint:eduApi.apiEndPoint+'subjects'
				},{
					name:'instructors',
					display:'firstname',
					endPoint:eduApi.apiEndPoint+user.tenant.id+'/users?user_type=teacher'
				}]);
			}

			console.log('$scope createCourse',$scope.asset);

			modal.modal(obj,$scope).then(function(result){
				$scope.modal = result;
				$scope.createCourseInit = true;
			});
			
		};

		$scope.save = function(data){ 
			console.log('save course',data);
			//courseService.saveCourse(data); 
		};
	});
