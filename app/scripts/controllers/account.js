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
    $scope.$on('$routeChangeStart', function() { 
	   //close any open menus or modals
		$window.UIkit.offcanvas('#side-menu').hide();
	});
  });
