angular
   .module('project4')
   .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      legs: '='
    },
    link($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 3,
        center: new $window.google.maps.LatLng(30, -12),
        scrollwheel: false
      });
      let infoWindow = null;
      let marker = null;
      let markers = [];
      let route = [];
      let path = null;

      function removeMarkers() {
        // console.log('inside removeMarkers()');
        markers.forEach((marker) => {
          marker.setMap(null);
        });

        markers = [];
        route = [];
        if (path) path.setMap(null);

        addMarkers();
        addRoute();
      }

      function addRoute() {
        $scope.legs.forEach((leg) => {
          route.push(new $window.google.maps.LatLng(leg.lat, leg.lng));
        });

        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        };

        path = new $window.google.maps.Polyline({
          path: route,
          icons: [{
            icon: lineSymbol,
            offset: '100%'
          }],
          geodesic: true,
          strokeColor: '#939292',
          strokeOpacity: 1.0,
          strokeWeight: 4
        });
        path.setMap(map);
      }

      function addMarkers() {
        $scope.legs.forEach((leg) => {
          addMarker(leg)
        });
      }

      function addMarker(leg) {
        const latLng = new $window.google.maps.LatLng(leg.lat, leg.lng);

        marker = new google.maps.Marker({
          position: latLng,
          map,
          animation: google.maps.Animation.DROP,
        });
        markers.push(marker);
        // console.log('marker', marker);
      }

      $scope.$watch('legs', (newVal) => {
        if ($scope.legs.length) removeMarkers();
      }, true);

    }
  }

  return directive;
}
