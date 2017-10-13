'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
  .controller('UsersCtrl', function ($scope,$window) {
    $scope.$on('$routeChangeStart', function() { 
	   //close any open menus or modals
		$window.UIkit.offcanvas('#side-menu').hide();
	});
  });
