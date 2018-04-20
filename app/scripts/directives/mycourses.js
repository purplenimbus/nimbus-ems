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
		controller : function($scope,eduApi,$route,apiConst,$window,grades,$auth,$cookies,format){
			
			console.log('auth',$auth);
			
			$scope.widgetTitle = function(fname){ return format.widgetTitle(fname); };
			
			$scope.getTotal = function(index){	
				return 	grades.getTotal($scope.courses[index].meta.grades,$scope.courses[index].course.meta.course_schema);
			};
			
			$scope.getGrade = function(index){			
				return grades.getGrade(grades.getTotal($scope.courses[index].meta.grades,$scope.courses[index].course.meta.course_schema));
			};
			
			$scope.init = function(){
				$scope.loading  = true;
				$scope.user = JSON.parse($cookies.get('auth'));
				//check for logged in
			 	eduApi.api('GET',$scope.user.tenant.id+'/registrations?user_id='+$scope.user.id+'&paginate='+apiConst.componentPagination+'&page=1').then(function(result){
					console.log('eduApi course result',result);
					$scope.courses = result.data.data;
					$scope.loading  = false;
				}).catch(function(error){
					$scope.loading  = false;
					$window.UIkit.notification({
						message: 'Couldnt get courses',
						status: 'danger',
						pos: 'top-right',
						timeout: 5000
					});
					console.log('eduApi course error',error);
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
