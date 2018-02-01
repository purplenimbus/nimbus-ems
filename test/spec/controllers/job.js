'use strict';

describe('Controller: JobCtrl', function () {

  // load the controller's module
  beforeEach(module('nimbusEmsApp'));

  var JobCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobCtrl = $controller('JobCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(JobCtrl.awesomeThings.length).toBe(3);
  });
});
