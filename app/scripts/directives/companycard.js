'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:companyCard
 * @description
 * # companyCard
 */
angular.module('nimbusEmsApp')
  .directive('companyCard', function () {
    return {
		templateUrl: 'views/templates/companyCard.html',
		restrict: 'E',
		scope:true,
		controller: function($scope,wordpressApi){
			$scope.loading = true;
			$scope.init = function(id){
				
				wordpressApi.getData('companies/'+id).then(function(result){
					$scope.company = wordpressApi.parseWPData(result.data);
					$scope.loading = false;
					console.log('company id',$scope.company); 
				}).catch(function(error){
					console.log('WordpressApi error',error);
					//TO DO DO Something
					$scope.loading = false;
				});
			};
			
		},
		link: function postLink(scope, element , attrs) {
			
			element.on('$destroy', function () {
				scope.$destroy();
			});
						
			attrs.$observe('id', function(value) {
				scope.init(value);
				/*if (value) {
				  console.log('company id',value);
				}*/
			});
		}
    };
  });
