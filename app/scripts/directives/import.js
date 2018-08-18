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
      		$scope.workbook = [];
      		
  			$scope.$on('upload',function(e,files){
  				$scope.loading = true;
    			csvParser.parse(files).then(function(result){
    				console.log('parser result',result);
	            	$timeout(function(){
	            		$scope.workbook = result;
	            		$scope.loading = false;
	            	},1000);
	            });
        	});

  			$scope.add = function(worksheetIndex){
  				$scope.workbook[worksheetIndex].data.unshift({});
  			};

        	$scope.remove = function(worksheetIndex,row){
        		console.log('remove',$scope.workbook[worksheetIndex]);
        		$scope.workbook[worksheetIndex].data.splice(row,1);
        	};

        	$scope.reset = function(){
        		$scope.$broadcast('reset');
        		$scope.workbook = [];
        	};

        	$scope.import = function(){
  				importService.import($scope.workbook);
  			};
      },
      link: function postLink(scope,element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
