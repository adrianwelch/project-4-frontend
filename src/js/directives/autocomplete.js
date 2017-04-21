angular
  .module('project4')
  .directive('autocomplete', autocomplete);

autocomplete.$inject = ['$window'];
function autocomplete($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    replace: false,
    scope: {
      lat: '=',
      lng: '=',
      place: '='
    },
    link: function($scope, element, attrs, model) {
      const options = {
        types: []
        // componentRestrictions: {}
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        // console.log(place);
        $scope.lat = place.geometry.location.toJSON().lat;
        $scope.lng = place.geometry.location.toJSON().lng;
        $scope.place = place.address_components[0].long_name;
        model.$setViewValue(element.val());
      });
    }
  };
}
