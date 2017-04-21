angular
  .module('project4')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersIndexCtrl.$inject = ['User'];
  function UsersIndexCtrl(User) {
    const vm = this;

    vm.all = User.query();
  }

UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth'];
  function UsersShowCtrl(User, $stateParams, $state, $auth) {
    const vm = this;
    vm.userTrips = [];
    vm.userLegs = [];

    if ($auth.getPayload()) vm.currentUser = User.get({ id: $auth.getPayload().id });

    vm.user = User.get($stateParams).$promise.then((user) => {
      vm.user = user
      vm.userTrips = vm.user.trips_created;
      vm.userLegs = vm.user.trips.legs;
      console.log(vm.user.trips.legs);
    });

    function usersDelete() {

      vm.user
        .$remove()
        .then(() => {
          $auth.logout();
          $state.go('register');
        });
    }
  vm.delete = usersDelete;

  function create() {
    Trip.save(vm.trip, () => {
      $state.go('tripsIndex');
    });
  }
  vm.create = create;


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
