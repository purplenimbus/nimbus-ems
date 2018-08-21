'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.userService
 * @description
 * # userService
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  	.service('userService', function (eduApi,user,$localStorage) {
    	this.saveUser = (data) => {
    		return eduApi.api('POST',user.tenant.id+'/users/'+data.id,data);
    	};

    	this.updateLocalUser = (user) => {
    		$localStorage.auth = JSON.stringify(user);
    	};
  	});
