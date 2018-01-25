'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.emsApi
 * @description
 * # emsApi
 * Factory in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.factory('graphApi', function ($http) {
		var self = this;
		// Service logic
		self.apiEndPoint = 'http://graph.nimbus.com:8000/v1/';

		// Public API here
		return {
			api : function(requestType,parameters,data){
							
				switch(requestType){
					case 'GET' : return $http.get(self.apiEndPoint+parameters);
					case 'POST' : return $http.post(self.apiEndPoint+parameters,data); 
				}
			}
		};
	})
	.factory('fmsApi', function ($http) {
		// Service logic
		var apiEndPoint = 'http://fms.nimbus.com:9090/';//'http://fms-api-v1.herokuapp.com/v1/';

		// Public API here
		return {
			api : function(requestType,parameters,data){
				
				switch(requestType){
					case 'GET' : return $http.get(apiEndPoint+parameters);
					case 'POST' : return $http.post(apiEndPoint+parameters,data); 
				}
			}
		};
	})
	.factory('eduApi', function ($http) {
		// Service logic
		var apiEndPoint = 'http://edu.nimbus.com:7070/v1/'; //http://nimbus-learning-api.herokuapp.com/v1/

		// Public API here
		return {
			api : function(requestType,parameters,data){
								
				switch(requestType){
					case 'GET' : return $http.jsonp(apiEndPoint+parameters,{method:requestType});//$http.get(apiEndPoint+parameters);
					case 'POST' : return $http.jsonp(apiEndPoint+parameters,{method:requestType,data:data});//$http.post(apiEndPoint+parameters,data); 
				}
				
			}
		};
	})
	.factory('subdomain', function ($cookies) {
		var auth = $cookies.get('auth');
		
		var domain = auth ? JSON.parse(auth) : false;
		
		if (domain){
			return domain.tenant.username;
		}else{
			return false;
		}	
	});