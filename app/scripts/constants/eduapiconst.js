'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.eduApiConst
 * @description
 * # eduApiConst
 * Constant in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  	.constant('eduApiConst', {
  		defaultCourseSchema : {
            lab: 5,
            exam: 35,
            quiz: 15,
            midterm: 30,
            assignment: 15,
        }
  	});
