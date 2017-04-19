angular
  .module('project4')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'js/views/static/home.html'
    })
    .state('tripsIndex', {
      url: '/trips',
      templateUrl: 'js/views/trips/index.html',
      controller: 'TripsIndexCtrl as tripsIndex'
    })
    .state('tripsNew', {
      url: '/trips/new',
      templateUrl: 'js/views/trips/new.html',
      controller: 'TripsNewCtrl as tripsNew'
    })
    .state('tripsShow', {
      url: '/trips/:id',
      templateUrl: 'js/views/trips/show.html',
      controller: 'TripsShowCtrl as tripsShow'
    })
    .state('tripsEdit', {
      url: '/trips/:id/edit',
      templateUrl: 'js/views/trips/edit.html',
      controller: 'TripsEditCtrl as tripsEdit'
    })
    .state('legsIndex', {
      url: '/legs',
      templateUrl: 'js/views/legs/index.html',
      controller: 'LegsIndexCtrl as legsIndex'
    })
    .state('legsNew', {
      url: '/legs/new',
      templateUrl: 'js/views/legs/new.html',
      controller: 'LegsNewCtrl as legsNew'
    })
    .state('legsShow', {
      url: '/legs/:id',
      templateUrl: 'js/views/legs/show.html',
      controller: 'LegsShowCtrl as legsShow'
    })
    .state('legsEdit', {
      url: '/legs/:id/edit',
      templateUrl: 'js/views/legs/edit.html',
      controller: 'LegsEditCtrl as legsEdit'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'AuthCtrl as auth'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'AuthCtrl as auth'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    });

    $urlRouterProvider.otherwise('/');
  }
