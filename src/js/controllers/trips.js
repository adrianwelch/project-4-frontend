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

TripsShowCtrl.$inject = ['Trip', 'User', 'Comment', '$stateParams', '$state', '$auth'];
function TripsShowCtrl(Trip, User, Comment, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.trip = Trip.get($stateParams);

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
    const index = vm.trip.attendee_ids.indexOf(vm.currentUser.id);
    if (index > -1) {
      vm.trip.attendee_ids.splice(index, 1);
      vm.trip.attendees.splice(index, 1);
    } else {
      vm.trip.attendee_ids.push(vm.currentUser.id);
      vm.trip.attendees.push(vm.currentUser);
    }
    tripsUpdate();
  }

  vm.toggleAttending = toggleAttending;

  function isAttending() {
    return $auth.getPayload() &&  vm.trip.$resolved && vm.trip.attendee_ids.includes(vm.currentUser.id);
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
