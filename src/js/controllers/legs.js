angular
  .module('project4')
  .controller('LegsShowCtrl', LegsShowCtrl)
  .controller('LegsEditCtrl', LegsEditCtrl);


LegsShowCtrl.$inject = ['Leg', 'User', 'Comment', '$stateParams', '$state', '$auth'];
function LegsShowCtrl(Leg, User, Comment, $stateParams, $state, $auth) {
  const vm = this;
  if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

  vm.leg = Leg.get($stateParams);

  function legsDelete() {
    vm.leg
      .$remove()
      .then(() => $state.go('legsIndex'));
  }

  vm.delete = legsDelete;

  function legsUpdate() {
    Leg
      .update({id: vm.leg.id, leg: vm.leg });
  }

  function addComment() {
    vm.comment.leg_id = vm.leg.id;

    Comment
      .save({ comment: vm.comment })
      .$promise
      .then((comment) => {
        vm.leg.comments.push(comment);
        vm.comment = {};
      });
  }

  vm.addComment = addComment;

  function deleteComment(comment) {
    Comment
      .delete({ id: comment.id })
      .$promise
      .then(() => {
        const index = vm.leg.comments.indexOf(comment);
        vm.leg.comments.splice(index, 1);
      });
  }

  vm.deleteComment = deleteComment;

}


LegsEditCtrl.$inject = ['Leg', 'User', '$stateParams', '$state'];
function LegsEditCtrl(Leg, User, $stateParams, $state) {
  const vm = this;
  vm.leg = Leg.get($stateParams);


  vm.users = User.query();

  function legsUpdate() {
    Leg
      .update({id: vm.leg.id, leg: vm.leg })
      .$promise
      .then(() => $state.go('tripsShow', { id: vm.leg.trip.id }));
  }

  vm.update = legsUpdate;
}
