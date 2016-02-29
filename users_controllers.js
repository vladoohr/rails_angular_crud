var myApp = angular.module("myApp", ['ngRoute', 'ngResource']);


// Services
myApp.factory('Users',['$resource', function($resource){
	return $resource('/users.json', {}, {
		query: { method: 'GET', isArray: true },
		create: { method: 'POST' }
	});
}]);

myApp.factory('User', ['$resource', function($resource){
	return $resource('/users/:id.json', {}, {
		show: {method: 'GET'},
		update: {method: 'PUT', params: {id: '@id'}},
		delete: {method: 'DELETE', params: {id: '@id'}}
	});
}]);

//Controllers
myApp.controller('UserListCtr', function($scope, Users){
	$scope.users = Users.query();
	alert('OK')
});

// Routing
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/users', {
		templateUrl: '/templates/users/index.html',
		controller: 'UserListCtr'
	});

	$routeProvider.otherwise({
		redirectTo: '/users'
	});
}]);

