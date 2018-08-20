'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.sweetAlert
 * @description
 * # sweetAlert
 * Factory in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  .factory('sweetAlert', function ($window) {
    // Service logic
    return {
      alert: (attrs = {}) => {
        return $window.swal(attrs);
      },
      button:(attrs) => {
        return  {
          text: attrs.text || '',
          value: attrs.value || false,
          visible: true,
          className: attrs.className || "uk-button uk-button-primary",
          closeModal: true
        };
      }
    };
  });
