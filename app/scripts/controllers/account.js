'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('AccountCtrl', function ($scope,$window) {
		
	$scope.services = [{
		name : 'service 1',
		description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,',
		key:'key',
	},{
		name : 'service 2',
		description : 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,',
		key:'key',
	}];
	
    $scope.$on('$routeChangeStart', function() { 
		//close any open menus or modals
		$scope.$on('$routeChangeStart', function() { 
		   //close any open menus or modals
			$window.UIkit.offcanvas('#side-menu').hide();
		});
	});
  });
