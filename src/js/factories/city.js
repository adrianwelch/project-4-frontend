angular
  .module('project4')
  .factory('City', City);

City.$inject = ['$resource', 'API_URL'];
function City($resource, API_URL) {
  return new $resource(`${API_URL}/api/cities/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
