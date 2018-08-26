'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:usercard
 * @description
 * # usercard
 */
angular.module('nimbusEmsApp')
  .directive('usercard', function (uikit3) {

  	var template = '';
  		template += '{{ user.firstname | uppercase }} {{ user.lastname | uppercase }} {{ user.othernames | uppercase }}';
  		template += '<p class="uk-text-meta uk-text-uppercase">{{ user.user_type.name }}</p>';
  	
    return {
      template: uikit3.card({
      		body:template,
      		classes:{
      			body:'uk-text-center uk-padding-small',
      		}
      }),
      controller : function($scope,$localStorage){
      	//$scope.user = JSON.parse($localStorage.auth);
      },
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        //element.text('this is the usercard directive');
      }
    };
  });
