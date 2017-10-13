'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:activities
 * @description
 * # activities
 */
angular.module('nimbusEmsApp')
  .directive('activities', function () {
    return {
      templateUrl: 'views/templates/activities.html',
      restrict: 'E',
	  scope: true,
	  controller : function($scope){
		$scope.widgetTitle = 'Activities';
	  },
      link: function postLink(scope, element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
