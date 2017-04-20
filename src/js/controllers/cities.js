angular
  .module('project4')
  .controller('CitiesIndexCtrl', CitiesIndexCtrl);

CitiesIndexCtrl.$inject = ['flights'];
function CitiesIndexCtrl(flights) {
  const vm = this;

  vm.flights = [];

  function getFlights(lat, lng) {
    flights.getFlights(lat, lng)
      .then((quotes) => {
        vm.flights = quotes;
        console.log('vm.flights', vm.flights);
      });
  }
}
