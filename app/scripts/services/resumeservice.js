'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.resumeService
 * @description
 * # resumeService
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('resumeService', function (form) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		return {
			addSummary : function(){
				console.log('resumeService addSummary');
			},
			addEducation : function(){
				console.log('resumeService addEducation');
			},
			addExperience : function(){
				console.log('resumeService addExperience');
			},
		};
	});
