//= require 'jqueryui.min'
//= require 'ui-sortable'
var app = angular.module('cms',['ui.sortable']);

//var canvasCtrl = angular.module('canvasCtrl',[]);

app.controller('updateController',['$scope','$http','$filter',function updateController($scope,$http,$filter){
	$scope.updates = {}

	$scope.sortableOptions = {
	    update: function(e, ui) {
	    	$http({method: 'PUT', url: '/cms/update' , data: $scope.updates}).
			  success(function(data, status, headers, config) {
			
			     
			  }).
			  error(function(data, status, headers, config) {
			    //console.log(status)
			  });
	    },
	    

 	 };

	$http({method: 'GET' , url: '/cms/updates'}).
		success(function(data){
			 $scope.updates = data

		}).
		error(function(data){
			console.log('ewrror')
		});

	$scope.update = {'enabled' : true }
	
	
	

	$scope.postUpdate = function postUpdate(){
		$http({method: 'POST', url: '/cms/update' , data: $scope.update}).
		  success(function(data, status, headers, config) {
		
		     $scope.updates.push(data)
		     $scope.update = {'enabled' : true}
		
		  }).
		  error(function(data, status, headers, config) {
		    //console.log(status)
		  });
	};

	$scope.editEnable = function editEnable(id,index){
		$http({method: 'GET' , url: '/cms/update/'+id}).
		success(function(data){
			$scope.editUpdate = data
			$scope.currentIndex = index
			$('.cmsTab a[href="#edit"]').tab('show')
		}).
		error(function(data){
			console.log('ewrror')
		});

	}

	$scope.updateUpdate = function updateUpdate(){
		$http({method: 'PUT', url: '/cms/update' , data: $scope.editUpdate}).
		  success(function(data, status, headers, config) {
		
		     $scope.updates[$scope.currentIndex] = data 
		     $scope.currentIndex = {}
		     $('.cmsTab a[href="#index"]').tab('show')
		  }).
		  error(function(data, status, headers, config) {
		    //console.log(status)
		  });
	};

	$scope.deleteUpdate = function deleteUpdate(id){
		$http({method: 'DELETE' , url: '/cms/update/'+id }).
		success(function(data){
			$scope.updates.pop(data) 
			console.log('deleted')
		}).
		error(function(data){
			console.log('ewrror')
		});
	}




	

}]);
