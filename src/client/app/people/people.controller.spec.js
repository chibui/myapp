/* jshint -W117, -W030 */
describe('PeopleController', function() {
  var controller;
  var people = mockData.getMockPeople();

  beforeEach(function () {

    // bard.appModule('app.people');
    module('app.people');
    bard.inject('$controller', '$log', '$q', '$rootScope', 'dataservice');

    var ds = {
      getPeople: function () {
        return $q.when(people);
      }
    };
    controller = $controller('PeopleController', {
      dataservice: ds
    });
  });

  it('hello test', function () {
    expect('hello').to.equal('hello');
  });

  it('should exists', function () {
    expect(controller).to.exist;
  });

  it('should have empty people array before activation', function () {
    expect(controller.people).to.exist;
  });

  describe('after activation', function () {
    beforeEach(function () {
      bard.inject('$state');
      $rootScope.$apply();
    });

    it('should change state when selecting person', function () {
      controller.goToPerson({id:3});

      $rootScope.$apply();
      expect($state.current.name).to.equal('person');
    });

    it('should have people', function () {
      expect(controller.people).to.have.length.above(0);
    });

    it('should have mock people', function () {
      expect(controller.people).to.have.length(people.length);
    });
  });


});
