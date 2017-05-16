angular
  .module('project4')
  .service('flights', Flights);

Flights.$inject = ['$http', 'API_URL'];
function Flights($http, API_URL) {
  const vm = this;
  // vm.flights = [];

  function getFlights(lat,lng) {
    // console.log(lat, lng);
    return $http
      .get(`${API_URL}/flights`, { params: { lat, lng } })
      .then((response) => {
        // console.log(vm.carriers);
        vm.flights = response.data;
        console.log('service', vm.flights);
        response.data.Quotes.forEach((quote) => {
          const destination = response.data.Places.find((place) => {
            return place.PlaceId === quote.OutboundLeg.DestinationId;
          });

          quote.DestinationCity = destination.CityName;
          quote.DestinationCountry = destination.CountryName;

          const carrier = response.data.Carriers.find((carrier) => {
            return carrier.CarrierId === quote.OutboundLeg.CarrierIds[0];
          });

          if(carrier) quote.CarrierName = carrier.Name;
        });
        return response.data.Quotes;
      });
  }

  vm.getFlights = getFlights;
}
