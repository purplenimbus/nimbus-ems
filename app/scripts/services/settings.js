'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.settings
 * @description
 * # settings
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  .service('settings', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
	this.settings = {
		dashboard : {
			tasks : {
				display:true
			},
			reports : {
				display:false
			},
			activities : {
				display:false
			},
			employees : {
				display:false
			},
			requests : {
				display:false
			}
		}
	};
	
	this.getSettings = function(type){
		return this.settings[type];
	};
	
  });
