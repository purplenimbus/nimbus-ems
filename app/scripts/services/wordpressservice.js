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
				var wp_endpoint = 'http://purplenimbus.net/jp/wp-json/wp/v2/';
		
		return{
			/**
			 * Returns a $http.get promise to get a job based on the job id
			 * @param {object} $data - The data for the GET request
			 * @param {integer} $id - The id for the GET request
			 * @returns {Promise}
			 */
			getData	:	function($data,$id){	
				var logged_in = $auth.isAuthenticated();
								
				return	$http.get(wp_endpoint+$data+($id ? '/'+$id : '')+(logged_in ? '?token='+$auth.getToken() : ''));
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
				return	$http.post(wp_endpoint+'/'+$name+($id ? '/'+$id : ''),$data);
			},
			/**
			 * Returns a $http.put or post promise to store a job based on job id and its data
			 * @param {String} $name - The name of the PUT/POST endpoint
			 * @param {object} $data - The data for the PUT/POST request
			 * @param {integer} $id - The id for the PUT/POST enpoint
			 * @returns {Promise}
			 */
			findJobs : function(location_id,job_id){
				return $http.get('api/locations/'+location_id+'/wordpress/'+job_id);
			},
			/**
			 * Parse Wordpress data and return it to match the frontend
			 * @param {object} data - The data for the PUT/POST request
			 * @returns {WPData}
			 */
			parseWPData : function(data){
				
				var wp_data = {};
				
				for(var k in data){
					//console.log('wordpress key',k);
					switch(k){
						case 'title' 	: 	wp_data.title = data[k].rendered;	break;
						case 'content' 	: 	wp_data.description = data[k].rendered;	break;
						case 'excerpt' 	: 	wp_data.excerpt = data[k].rendered;	break;
						case 'modified' : 	wp_data.updated_at = data[k];	break;
						case 'date' 	: 	wp_data.created_at = data[k];	break;
						case 'meta' 	: 	wp_data.salary = Number(data[k].salary) || null;	
											wp_data.min_experience = Number(data[k].min_experience);	
											wp_data.job_ref_id = data[k].ref_url;	
											wp_data[k] = data[k];
											break;
											
						default 		: 	wp_data[k] = data[k];	break;
					}
				}
				
				delete wp_data.job_level;
				delete wp_data.job_type;
				delete wp_data.tags;
				delete wp_data.template;
				delete wp_data.comment_status;
				delete wp_data.author;
				
				return wp_data;
			}
		};
	});
