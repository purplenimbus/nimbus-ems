'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.emsApi
 * @description
 * # emsApi
 * Factory in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  .factory('emsApi', function ($http) {
    // Service logic
    var apiEndPoint = 'http://ems.nimbus.com:8000/';

    // Public API here
    return {
		api : function(requestType,params,data){
			var parameters = ( params  ? params+'&callback=foo' : '?callback=foo');
						
			switch(requestType){
				case 'GET' : return $http.get(apiEndPoint+parameters);
				case 'POST' : return $http.post(apiEndPoint+parameters,data); 
			}
		}
    };
  })
  .factory('fmsApi', function ($http) {
    // Service logic
    var apiEndPoint = 'http://fms-api-v1.herokuapp.com/';

    // Public API here
    return {
		api : function(requestType,params,data){
			var parameters = '?'+params || '?callback=foo';
						
			switch(requestType){
				case 'GET' : return $http.get(apiEndPoint+parameters);
				case 'POST' : return $http.post(apiEndPoint+parameters,data); 
			}
		}
    };
  });
