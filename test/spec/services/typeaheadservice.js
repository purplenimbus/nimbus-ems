'use strict';

describe('Service: typeaheadService', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var typeaheadService;
  beforeEach(inject(function (_typeaheadService_) {
    typeaheadService = _typeaheadService_;
  }));

  it('should do something', function () {
    expect(!!typeaheadService).toBe(true);
  });

});
