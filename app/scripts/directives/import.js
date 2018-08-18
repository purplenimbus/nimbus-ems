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
      controller : function($scope,$timeout){
      		$scope.workbooks = [];
      		
  			$scope.$on('upload',function(e,files){
  				$scope.loading = true;
    			csvParser.parse(files).then(function(result){
    				console.log('parser result',result);
	            	$timeout(function(){
	            		$scope.workbooks = result;
	            		$scope.loading = false;
	            	},1000);
	            });
        	});

  			$scope.add = function(workbookIndex){
  				$scope.workbooks[workbookIndex].data.unshift({});
  			};

        	$scope.remove = function(workbookIndex,row){
        		console.log('remove',$scope.workbooks[workbookIndex]);
        		$scope.workbooks[workbookIndex].data.splice(row,1);
        	};

        	$scope.reset = function(){
        		console.log('reset');
        		$scope.$broadcast('reset');
        		$scope.workbooks = [];
        	};
      },
      link: function postLink(scope,element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
