'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:upload
 * @description
 * # upload
 */
angular.module('nimbusEmsApp')
  .directive('upload', function (uikit3) {
    return {
      	template: uikit3.upload({}),
      	restrict: 'E',
      	controller : function($scope,upload){
      		const options = {
		        url: '',
		        multiple: true,
		        beforeAll: function (el,files) {
		        	console.log('upload',files);
		        	$scope.$emit('upload',files);
		        },
		    };

      		$scope.upload = upload.uikit3(options);
      	},
      	link: function postLink(scope, element, attrs) {
        	//element.text('this is the upload directive');
      	}
    };
  });
