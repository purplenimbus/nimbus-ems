'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:employees
 * @description
 * # employees
 */
angular.module('nimbusEmsApp')
  .directive('employees', function () {
    return {
      templateUrl: 'views/templates/employees.html',
      restrict: 'E',
	  scope: true,
	  controller : function($scope){
		$scope.widgetTitle = 'Requests';
	  },
      link: function postLink(scope, element) {
		element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
