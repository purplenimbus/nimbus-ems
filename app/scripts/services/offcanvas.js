'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.offcanvas
 * @description
 * # offcanvas
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('offcanvas', function ($window) {
		// AngularJS will instantiate a singleton by calling "new" on this function		
		this.offcanvas = function(type){
			
			this.offcanvas.type = type;
						
			return $window.UIkit.offcanvas('#side-menu');
			
		};
				
		angular.element('#side-menu').on('hidden',function(e){
			console.log('offcanvas hidden',e);
		}).on('shown',function(e){
			console.log('offcanvas shown',e);
		});	
		
	});
