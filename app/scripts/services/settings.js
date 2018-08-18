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
				display:false,
				disabled:true
			},
			reports : {
				display:false,
				disabled:false
			},
			activities : {
				display:false,
				disabled:true
			},
			employees : {
				display:true,
				disabled:false
			},
			requests : {
				display:false,
				disabled:true
			},
			myCourses : {
				display:true,
				disabled:false
			},
		},
		learningDashboard : {
			myCourses : {
				display:true,
				disabled:false
			},
			activities : {
				display:false,
				disabled:true
			}
		},
		nav : {
			dashboard : {
				display:true,
				disabled:false,
				icon: 'home',
				url:'',
			},
			/*users : {
				display:true,
				disabled:false,
				icon: 'users',
				url:'users',
			},
			/*inventory : {
				display:true,
				disabled:false,
				icon: 'list',
				url:'inventory',
			},*/
			learning : {
				display:true,
				disabled:false,
				icon: 'laptop',
				url:'learning',
				children:{
					courses:{
						display:true,
						disabled:false,
						icon: 'thumbnails',
						url:'learning/courses'
					},
					users : {
						display:true,
						disabled:false,
						icon: 'users',
						url:'users',
					}
				}
			}
		}
	};
	
	this.getSettings = function(type){
		return this.settings[type];
	};
	
  });
