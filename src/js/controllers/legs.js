angular
  .module('project4')
  // .controller('LegsIndexCtrl', LegsIndexCtrl)
  // .controller('LegsNewCtrl', LegsNewCtrl)
  .controller('LegsShowCtrl', LegsShowCtrl)
  .controller('LegsEditCtrl', LegsEditCtrl);

// LegsIndexCtrl.$inject = ['Leg'];
// function LegsIndexCtrl(Leg) {
//   const vm = this;
//
//   vm.all = Leg.query();
// }
//
// LegsNewCtrl.$inject = ['Leg', 'User', '$state'];
// function LegsNewCtrl(Leg, User, $state) {
//   const vm = this;
//   vm.leg = {};
//   vm.users = User.query();
//
//
//
// }


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

  // function toggleAttending() {
  //   const index = vm.leg.joiner_ids.indexOf(vm.currentUser.id);
  //   if (index > -1) {
  //     vm.leg.joiner_ids.splice(index, 1);
  //     vm.leg.joiners.splice(index, 1);
  //   } else {
  //     vm.leg.joiner_ids.push(vm.currentUser.id);
  //     vm.leg.joiners.push(vm.currentUser);
  //   }
  //   legsUpdate();
  // }

  // vm.toggleAttending = toggleAttending;
  //
  // function isAttending() {
  //   return $auth.getPayload() &&  vm.leg.$resolved && vm.leg.joiner_ids.includes(vm.currentUser.id);
  // }
  // vm.isAttending = isAttending;
}


LegsEditCtrl.$inject = ['Leg', 'User', '$stateParams', '$state'];
function LegsEditCtrl(Leg, User, $stateParams, $state) {
  const vm = this;

  Leg.get($stateParams).$promise.then((leg) => {
    vm.leg = leg;
    vm.leg.date = new Date(leg.date);
  });

  vm.users = User.query();

  function legsUpdate() {
    Leg
      .update({id: vm.leg.id, leg: vm.leg })
      .$promise
      .then(() => $state.go('legsShow', { id: vm.leg.id }));
  }

  vm.update = legsUpdate;
}
