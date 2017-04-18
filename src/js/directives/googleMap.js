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
     center: '=',
     locations: '=',
     selected: '=',
     lat: '=',
     lng: '='
   },
   link($scope, element) {
     const map = new $window.google.maps.Map(element[0], {
       zoom: 3,
       center: $scope.center
     });
     // console.log($scope.locations);
     // let infoWindow = null;
     let infoWindow = null;
     let marker = null;
     const markers = [];
   }
 }
 return directive;
}
