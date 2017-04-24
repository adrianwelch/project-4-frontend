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
      legs: '=',
      selected: '='
    },
    link($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        zoom: 2,
        center: new $window.google.maps.LatLng(32.2287166, 29.9120764),
        scrollwheel: false
      });
      let infoWindow = new google.maps.InfoWindow();
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
        $scope.legs.forEach(leg => addMarker(leg));
      }

      function addMarker(leg) {

        // var icon = {
        // path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
        // fillColor: '#FF0000',
        // fillOpacity: .6,
        // anchor: new google.maps.Point(0,0),
        // strokeWeight: 0,
        // scale: 1
        // }
        var icon = {
        url: "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-1/512/location_marker_pin-512.png",
        scaledSize: new google.maps.Size(25,25)
        }
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var labelIndex = 0;

        const latLng = new $window.google.maps.LatLng(leg.lat, leg.lng);

        marker = new google.maps.Marker({
          position: latLng,
          map,
          animation: google.maps.Animation.DROP,
          // label: labels[labelIndex++ % labels.length],
          icon
        });
        markers.push(marker);
        // console.log('marker', marker);

        const htmlElement = `<div id="infoWindow">
                              <h3>${leg.location}</h3>
                              <a class="take">Take Me Here</a>
                             </div>`;

        google.maps.event.addListener(marker, 'click', function () {
          infoWindow.close();

          // $scope.getLatLng({lat: $scope.lat, lng: $scope.lng});

          infoWindow.setContent(htmlElement);

          google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById('infoWindow').onclick = function handleWindowClick() {
              $scope.selected = leg;
              $scope.$apply();
            };

          });
          infoWindow.open(map, this);
        });
      }

      $scope.$watch('legs', (newVal) => {
        if ($scope.legs.length) removeMarkers();
      }, true);

    }
  };

  return directive;
}
