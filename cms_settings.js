var app = angular.module('cms',[]);

app.controller('settingsController',['$scope','$http','$filter',function settingsController($scope,$http,$filter){

	$scope.maps = []

		$http({method: 'GET' , url: '/cms/setting'}).
		success(function(data){
			$scope.maps = data
			console.log($scope.maps)
		}).
		error(function(data){
			console.log('error')
		});


}]);