(function() {
  'use strict';

  angular
    .module('app.people')
    .controller('PeopleController', PeopleController);

  PeopleController.$inject = ['$q', '$state','dataservice', 'logger'];
  /* @ngInject */
  function PeopleController($q, $state, dataservice, logger) {
    var vm = this;

    vm.people = [];
    vm.goToPerson = goToPerson;

    getPeople();

    function getPeople() {
      dataservice.getPeople()
        .then(function (people) {
          vm.people = people;
          logger.success('got some people');
        });
    }

    function goToPerson(person) {
      $state.go('person', {id: person.id});
      logger.info('went to person: ' + person.id);
    }
  }
})();
