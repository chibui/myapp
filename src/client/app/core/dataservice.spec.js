/* jshint -W117, -W030 */
describe('dataservice', function () {

  beforeEach(function () {
    bard.appModule('app.core');
    bard.inject('$httpBackend', '$q', 'dataservice', '$rootScope');
  });

  it('should exists', function () {
    expect(dataservice).to.exist;
  });

  it('getMessageCount returns a value ', function () {
    dataservice.getMessageCount()
      .then(function (data) {
        expect(data).to.exist;
      });
    $rootScope.$apply();
  });

  it('getPeople hits /api/people', function () {
    $httpBackend.when('GET', '/api/people').respond(200, [{}]);
    dataservice.getPeople()
      .then(function (people) {
        expect(people).to.exist;
      });

    $httpBackend.flush();
  });

  it('getPeople reports error if server fails', function () {
    var responseData = {description: 'you failed' };
    $httpBackend
      .when('GET', '/api/people')
      .respond(500, responseData
    );

    dataservice.getPeople()
      .catch(function (error) {
        expect(error.data.description).to.match(/you failed/);
      });

    $httpBackend.flush();
  });
});
