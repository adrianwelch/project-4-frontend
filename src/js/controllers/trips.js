angular
  .module('project4')
  .controller('TripsIndexCtrl', TripsIndexCtrl)
  .controller('TripsNewCtrl', TripsNewCtrl)
  .controller('TripsShowCtrl', TripsShowCtrl)
  .controller('TripsEditCtrl', TripsEditCtrl);

TripsIndexCtrl.$inject = ['Trip'];
function TripsIndexCtrl(Trip) {
  const vm = this;

  vm.all = Trip.query();
}

TripsNewCtrl.$inject = ['Trip', 'User', '$state'];
function TripsNewCtrl(Trip, User, $state) {
  const vm = this;
  vm.trip = {};
  vm.users = User.query();

  function tripsCreate() {
    Trip
      .save({ trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsIndex'));
  }

  vm.create = tripsCreate;
}


TripsShowCtrl.$inject = ['Trip', 'User', 'Comment', '$stateParams', '$state', '$auth', 'Leg', '$scope', 'flights'];
function TripsShowCtrl(Trip, User, Comment, $stateParams, $state, $auth, Leg, $scope, flights) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.trip = Trip.get($stateParams);

  vm.flights = {};

  function getFlights(lat, lng) {
    flights.getFlights(lat, lng)
      .then((response) => {
        vm.flights = response
        console.log('controller', vm.flights);
      });
  }

  $scope.$watch(() => vm.selected, () => {
    if(!vm.selected) return false;
    getFlights(vm.selected.lat, vm.selected.lng);
  });

  function legsCreate() {

    vm.leg.trip_id = vm.trip.id;

    vm.leg.location = vm.stop.name;
    vm.leg.lat = vm.stop.lat;
    vm.leg.lng = vm.stop.lng;

    console.log(vm.leg.location);


    Leg
      .save({ leg: vm.leg })
      .$promise
      .then((leg) => {
        vm.trip.legs.push(leg);
        vm.leg = {};
      });
      vm.location = null;
  }

  vm.create = legsCreate;

  function deleteLeg(leg) {
    Leg
    .delete({ id: leg.id })
    .$promise
    .then(() => {
      const index = vm.trip.legs.indexOf(leg);
      vm.trip.legs.splice(index, 1);
    });
  }

  vm.deleteLeg = deleteLeg;

  function tripsDelete() {
    vm.trip
      .$remove()
      .then(() => $state.go('tripsIndex'));
  }

  vm.delete = tripsDelete;

  function tripsUpdate() {
    Trip
      .update({id: vm.trip.id, trip: vm.trip });
  }

  function addComment() {
    vm.comment.trip_id = vm.trip.id;

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.trip.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.trip.comments.indexOf(comment);
        vm.trip.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

  function toggleAttending() {
    const index = vm.trip.joiner_ids.indexOf(vm.currentUser.id);
    // console.log(index); < -1
    if (index > -1) {
      vm.trip.joiner_ids.splice(index, 1);
      vm.trip.joiners.splice(index, 1);
    } else {
      vm.trip.joiner_ids.push(vm.currentUser.id);
      console.log('trip joiner id', vm.trip.joiner_ids);
      console.log('currentuser', vm.currentUser.id);


      vm.trip.joiners.push(vm.currentUser);

      console.log('pushing joiner id to currend user id', vm.trip.joiners.push(vm.currentUser.id));

    }
    tripsUpdate();
  }

  vm.toggleAttending = toggleAttending;

  function isAttending() {
    return $auth.getPayload() &&  vm.trip.$resolved && vm.trip.joiner_ids.includes(vm.currentUser.id);
  }
  vm.isAttending = isAttending;
}


TripsEditCtrl.$inject = ['Trip', 'User', '$stateParams', '$state'];
function TripsEditCtrl(Trip, User, $stateParams, $state) {
  const vm = this;

  Trip.get($stateParams).$promise.then((trip) => {
    vm.trip = trip;
    vm.trip.date = new Date(trip.date);
  });

  vm.users = User.query();

  function tripsUpdate() {
    Trip
      .update({id: vm.trip.id, trip: vm.trip })
      .$promise
      .then(() => $state.go('tripsShow', { id: vm.trip.id }));
  }

  vm.update = tripsUpdate;
}
