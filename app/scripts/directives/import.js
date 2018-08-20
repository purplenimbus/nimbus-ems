'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:import
 * @description
 * # import
 */
angular.module('nimbusEmsApp')
  .directive('import', function (uikit3,importService,csvParser,eduApi,user,$window,sweetAlert) {
    return {
      template: importService.render(),
      restrict: 'E',
      controller : function($scope,$timeout){
      		$scope.workbook = [];
      		//$scope.importType = false;

  			$scope.$on('upload',function(e,files){
  				$scope.loading = true;
    			csvParser.parse(files).then(function(result){
	            	$timeout(function(){
	            		$scope.workbook = result;
	            		$scope.loading = false;
	            		//console.log('csvParser scope',$scope);
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

  				//console.log('import data',JSON.stringify(data));

  				sweetAlert.alert({
				   	title: 'Import '+$scope.importType.name+'?',
				   	icon: "warning",
				   	buttons:{
						cancel: sweetAlert.button({text:'Cancel',className:'uk-button uk-button-danger',value:false}),
						confirm: sweetAlert.button({text:'Import',value:true})
					}
				}).then((e)=>{
					console.log('prompt choice',e);
					$scope.loading = true;

					if(e){
						eduApi.api('POST',user.tenant.id+'/users/batch?type='+type,data)
		  				.then((result) => {
		  					console.log('import result',result);
		  					$scope.loading = false;
		  					sweetAlert.alert({
							   	title: 'Imported',
							   	icon: "success",
							   	buttons:{
									confirm: sweetAlert.button({text:'ok'})
								}
							});
		  				})
		  				.catch((error) => {
		  					console.log('import error',error);
		  					$scope.loading = false;
		  					sweetAlert.alert({
							   	title: 'Somethings wrong!',
							   	icon: "error",
							   	buttons:{
									confirm: sweetAlert.button({text:'ok'})
								}
							});
		  				});
					}

					$scope.loading = false;
				});
  			};

  			$scope.importTypes = importService.importTypes();

  			$scope.orderBy = function(key) {
  				console.log('orderBy',key);
			    $scope.workSheetOrder = key;
			};
      },
      link: function postLink(scope,element) {
        element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
