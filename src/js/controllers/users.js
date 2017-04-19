angular
  .module('project4')
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', 'Trip', '$stateParams', '$state'];
function UsersShowCtrl(User, Trip, $stateParams, $state) {
  const vm = this;
  vm.userTrips = [];

  vm.user = User.get($stateParams, (user) => {
    vm.user = user;
    vm.userTrips = Trip.query({ createdBy: user.id });
    console.log(vm.userTrips);
  });

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('tripsIndex'));
  }

  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}
