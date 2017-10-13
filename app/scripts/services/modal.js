'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.modal
 * @description
 * # modal
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('modal', function ($window,uikit3,$q,$compile) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		this.modal = function(obj,$scope){
			
			var deferred = $q.defer() , modal;
						
			angular.element('.uk-offcanvas-content').append($compile(uikit3.modal(obj))($scope));
			
			modal = $window.UIkit.modal('#modal');
			
			modal.show();
			
			angular.element('#modal').on({

				'show.uk.modal': function(){
					console.log('Modal is visible.');
				},

				'hide.uk.modal': function(){
					angular.element(this).remove();
					angular.element('html').removeClass('uk-modal-page');
				}
			});
			
			deferred.resolve(modal);
			
			return deferred.promise;
		};
			
	});
