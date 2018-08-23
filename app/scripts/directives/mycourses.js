'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:myCourses
 * @description
 * # myCourses
 */
angular.module('nimbusEmsApp')
  .directive('myCourses', function () {
    return {
		templateUrl: 'views/templates/myCourses.html',
		restrict: 'E',
		scope:true,
		controller : function($scope,eduApi,$route,apiConst,$window,grades,$auth,$cookies,format,$rootScope,$localStorage){
			
			//console.log('auth',$auth.getPayload(),$rootScope);
			
			$scope.widgetTitle = function(fname){ return format.widgetTitle(fname); };
			
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
			
			$scope.init = function(){
				$scope.loading  = true;
				//$scope.user = JSON.parse($cookies.get('auth'));
				
				var user = JSON.parse($localStorage.auth);
				
				//console.log('me!!',user);
				//var user = user ? user : $rootScope.user.info;
				
				//check for logged in
			 	eduApi.api('GET',user.tenant.id+'/registrations?user_id='+user.id+'&paginate='+apiConst.componentPagination+'&page=1')
			 	.then((result) => {
					console.log('eduApi course result',result);
					$scope.coursesData = result.data;
					$scope.loading  = false;
				}).catch((error) => {
					console.log('eduApi course error',error);
					$scope.error = error.statusText;
					$scope.loading  = false;
				});
			};
			
			$scope.init();
		},
		link: function postLink(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
    };
  });
