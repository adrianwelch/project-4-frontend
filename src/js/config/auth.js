angular
  .module('project4')
  .config(Auth);

  Auth.$inject = ['$authProvider', 'API_URL'];
  function Auth($authProvider, API_URL) {
    $authProvider.signupUrl = `${API_URL}/register`;
    $authProvider.loginUrl = `${API_URL}/login`;

    $authProvider.github({
    clientId: 'f432ab5d5c7020dce131',
    url: `${API_URL}/oauth/github`
  });
}
