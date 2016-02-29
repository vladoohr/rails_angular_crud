var myApp = angular.module("myApp", ['ngRoute', 'ngResource']);

// Services
myApp.factory("Users",['$resource', function($resource){
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

// Routing
myApp.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
	$routeProvider.when('/users', {
		templateUrl: '/templates/users/index.html',
		controller: 'UserListCtr'
	});

	$routeProvider.when('/users/new', {
		templateUrl: '/templates/users/new.html',
		controller: 'UserAddCtr'
	});

	$routeProvider.when('/users/:id/edit', {
		templateUrl: '/templates/users/edit.html',
		controller: 'UserEditCtr'
	});

	$routeProvider.otherwise({
		redirectTo: '/users'
	});

}]);


//Controllers
myApp.controller('UserListCtr', function($scope, $location, Users, User){
	$scope.users = Users.query();

	$scope.deleteUser = function(userId){
		if(confirm('Are you sure?')){
			User.delete({id: userId}, function(){
				$location.path('/#/users')
			}, function(error){
				console.log(error)
			})
		}
	}
});

myApp.controller('UserAddCtr', function($scope, $location, Users){
	$scope.user = {}
	$scope.save = function(){
		if($scope.userForm.$valid){
			Users.create({user: $scope.user}, function(){
				$location.path('/#/users')
			}, function(error){
				console.log(error)
			})
		}
	}
});
myApp.controller('UserEditCtr', function($scope, $location, $routeParams, User){
	$scope.user = User.get({id: $routeParams.id})
	console.log($scope.user)
	$scope.update = function(){
		if($scope.userForm.$valid){
			User.update({id: $scope.user.id}, {user: $scope.user}, function(){
				$location.path('/#/users')
			}, function(error){
				console.log(error)
			}
		)}
	}

});