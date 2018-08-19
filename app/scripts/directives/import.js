'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:import
 * @description
 * # import
 */
angular.module('nimbusEmsApp')
  .directive('import', function (uikit3,importService,csvParser,eduApi,user) {
    return {
      template: importService.render(),
      restrict: 'E',
      controller : function($scope,$timeout){
      		$scope.workbook = [];
      		
  			$scope.$on('upload',function(e,files){
  				$scope.loading = true;
    			csvParser.parse(files).then(function(result){
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
        		$scope.workbook[worksheetIndex].data.splice(row,1);
        	};

        	$scope.reset = function(){
        		$scope.$broadcast('reset');
        		$scope.workbook = [];
        		$scope.importType = false;
        	};

        	$scope.import = function(type){
  				var data = importService.parseWorkBook($scope.workbook,$scope.importType.name);

  				eduApi.api('POST',user.tenant.id+'/users/batch?type='+type,data)
  				.then(function(result){
  					console.log('import result',result);
  				})
  				.catch(function(error){
  					console.log('import error',error);
  				});

  				//send data to api here
  			};

  			$scope.importTypes = importService.importTypes();
      },
      link: function postLink(scope,element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
