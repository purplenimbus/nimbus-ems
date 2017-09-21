'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
  .controller('NavCtrl', function ($scope,offcanvas,modal,form,settings) {
	$scope.loggedin = false;
    $scope.offcanvas = offcanvas.offcanvas;
	$scope.showLogin = function(){
		var obj = {
			title:'Login',
			body:form.login(),
			footer:false
		};
		modal.modal(obj,$scope).then(function(result){
			$scope.modal = result;
		});
	};
	
	$scope.login = function(creds){
		console.log('login credentials',creds);
		$scope.loggedin = true;
		$scope.modal.hide();
		$scope.user = {
			fname : 'anthony',
			lname : 'akpan',
			email : 'anthony.akpan@hotmail.com',
			picture : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/4/005/02f/0b3/31ce301.jpg'
		};
	};
	
	$scope.showSettings = function(type){
		var settingsBody = '',
			obj;
		
		settingsBody += '<ul class="uk-list uk-list-divider">';
		settingsBody += '	<li ng-repeat="(key , setting) in settings" class="uk-clearfix">';
		settingsBody += '	<div class="uk-align-left uk-margin-remove">';
		settingsBody += '		{{ key | uppercase }}';
		settingsBody += '	</div>';
		settingsBody += '	<div class="uk-align-right">';
		settingsBody += '		<input class="uk-checkbox" type="checkbox" ng-model="setting.display">';
		settingsBody += '	</div>';
		settingsBody += '	</li>';
		settingsBody += '</ul>';
		
		
		obj = {
			title:'Settings',
			body:settingsBody,
			footer:false
		};
		
		$scope.settings = settings.getSettings(type);
				
		modal.modal(obj,$scope).then(function(result){
			$scope.modal = result;
		});
	};	
  });
