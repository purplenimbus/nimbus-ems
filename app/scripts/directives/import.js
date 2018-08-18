'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:import
 * @description
 * # import
 */
angular.module('nimbusEmsApp')
  .directive('import', function (uikit3,importService,csvParser) {
    return {
      template: importService.render(),
      restrict: 'E',
      controller : function($scope){
      		$scope.workbooks = [{name:'tony'}];
  			$scope.$on('upload',function(e,files){
    			csvParser.parse(files).then(function(result){
    				console.log('parser result',result);
	            	$scope.workbooks = result;
	            	console.log('workbooks scope',$scope);
	            });
        	});
      },
      link: function postLink(scope, element, attrs) {
        //element.text('this is the import directive');
      }
    };
  });
