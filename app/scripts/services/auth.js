'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.auth
 * @description
 * # auth
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('auth', function ($q,$http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return	{
			authenticate	:	function(object){
				var deferred	=	$q.defer();
					
				console.log('Form Object',object);
				
				//console.log($http.post('/api/authenticate'));
				
				$http.post('/api/authenticate',object).then(	function(result){
														console.info('Auth Result',result);
														deferred.resolve(result);
													},
													function(error){
														console.error('Auth Error',error);
														deferred.resolve(error);
													});
				
				return deferred.promise;
			},
			setCookie : function(cname, cvalue, exdays) {
				var d = new Date();
				d.setTime(d.getTime() + (exdays*24*60*60*1000));
				var expires = 'expires='+ d.toUTCString();
				document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
			},
			getCookie : function(cname) {
				var name = cname + '=';
				var ca = document.cookie.split(';');
				for(var i = 0; i <ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) === ' ') {
						c = c.substring(1);
					}
					if (c.indexOf(name) === 0) {
						return c.substring(name.length, c.length);
					}
				}
				return '';
			},
			objectToQuerystring : function(obj) {
				var str = '';
								
				if(obj !== 'undefined'){
					str = '?';
					
					for(var prop=0; prop < Object.keys(obj).length; prop++){
													
						str += Object.keys(obj)[prop]+'='+obj[Object.keys(obj)[prop]];
				
						str += Object.keys(obj)[prop + 1] ? '&' : '';
					}
						
				}
				
				return encodeURI(str);
			}
		};
	});
