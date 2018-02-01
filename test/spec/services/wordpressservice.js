'use strict';

describe('Service: wordpressService', function () {

  // load the service's module
  beforeEach(module('nimbusEmsApp'));

  // instantiate service
  var wordpressService;
  beforeEach(inject(function (_wordpressService_) {
    wordpressService = _wordpressService_;
  }));

  it('should do something', function () {
    expect(!!wordpressService).toBe(true);
  });

});
