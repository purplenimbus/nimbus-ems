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
				display:true,
				disabled:false
			},
			reports : {
				display:false,
				disabled:true
			},
			activities : {
				display:false,
				disabled:true
			},
			employees : {
				display:false,
				disabled:true
			},
			requests : {
				display:true,
				disabled:false
			}
		}
	};
	
	this.getSettings = function(type){
		return this.settings[type];
	};
	
  });
