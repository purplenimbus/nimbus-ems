'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.wordpressService
 * @description
 * # wordpressService
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('wordpressService', function ($http,elements,$rootScope,$auth) {
    // AngularJS will instantiate a singleton by calling "new" on this function
				var wpEndpoint = 'http://purplenimbus.net/jp/wp-json/wp/v2/';
		
		return{
			/**
			 * Returns a $http.get promise to get a job based on the job id
			 * @param {object} $data - The data for the GET request
			 * @param {integer} $id - The id for the GET request
			 * @returns {Promise}
			 */
			getData	:	function($data,$id){	
				var loggedIn = $auth.isAuthenticated();
								
				return	$http.get(wpEndpoint+$data+($id ? '/'+$id : '')+(loggedIn ? '?token='+$auth.getToken() : ''));
			},
			/**
			 * Returns a $http.put or post promise to store a job based on job id and its data
			 * @param {String} $name - The name of the PUT/POST endpoint
			 * @param {object} $data - The data for the PUT/POST request
			 * @param {integer} $id - The id for the PUT/POST enpoint
			 * @returns {Promise}
			 */
			sendData	:	function($name,$id,$data){
				console.log($name+' id',$id);
				return	$http.post(wpEndpoint+'/'+$name+($id ? '/'+$id : ''),$data);
			},
			/**
			 * Returns a $http.put or post promise to store a job based on job id and its data
			 * @param {String} $name - The name of the PUT/POST endpoint
			 * @param {object} $data - The data for the PUT/POST request
			 * @param {integer} $id - The id for the PUT/POST enpoint
			 * @returns {Promise}
			 */
			findJobs : function(locationId,jobId){
				return $http.get('api/locations/'+locationId+'/wordpress/'+jobId);
			},
			/**
			 * Parse Wordpress data and return it to match the frontend
			 * @param {object} data - The data for the PUT/POST request
			 * @returns {WPData}
			 */
			parseWPData : function(data){// jshint ignore:line
				
				var wpData = {};
				/* jshint ignore:start */
				for(var k in data){
					//console.log('wordpress key',k);
					
					switch(k){
						case 'title' 	: 	wpData.title = data[k].rendered;	break;
						case 'content' 	: 	wpData.description = data[k].rendered;	break;
						case 'excerpt' 	: 	wpData.excerpt = data[k].rendered;	break;
						case 'modified' : 	wpData.updated_at = data[k];	break;
						case 'date' 	: 	wpData.created_at = data[k];	break;
						case 'meta' 	: 	wpData.salary = Number(data[k].salary) || null;	
											wpData.min_experience = Number(data[k].min_experience);	
											wpData.job_ref_id = data[k].ref_url;	
											wpData[k] = data[k];
											break;
											
						default 		: 	wpData[k] = data[k];	break;
					}
					
				}
				/* jshint ignore:end */
				delete wpData.job_level;
				delete wpData.job_type;
				delete wpData.tags;
				delete wpData.template;
				delete wpData.comment_status;
				delete wpData.author;
				
				return wpData;
			}
		};
	});
