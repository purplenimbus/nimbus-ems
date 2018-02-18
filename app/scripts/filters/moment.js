'use strict';

/**
 * @ngdoc filter
 * @name nimbusEmsApp.filter:moment
 * @function
 * @description
 * # moment
 * Filter in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  .filter('moment', function () {
    return function (input) {
      return 'moment filter: ' + input;
    };
  });
