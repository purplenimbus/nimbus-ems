'use strict';

describe('Service: resumeService', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var resumeService;
  beforeEach(inject(function (_resumeService_) {
    resumeService = _resumeService_;
  }));

  it('should do something', function () {
    expect(!!resumeService).toBe(true);
  });

});
