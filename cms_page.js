
var app = angular.module('cms',[]);

//var canvasCtrl = angular.module('canvasCtrl',[]);

app.controller('pageController',['$scope','$http','$filter',function pageController($scope,$http,$filter){

	$scope.urlUnique = true;
	
	$http({method: 'GET' , url: '/cms/pages'}).
		success(function(data){
			$scope.pages = data
			console.log($scope.pages)
		}).
		error(function(data){
			console.log('error')
		});

	$scope.postPage = function postPage(){
		$http({method: 'POST', url: '/cms/page' , data: $scope.page}).
		  success(function(data, status, headers, config) {
		
		     $scope.pages.push(data)
		     $scope.page = {}
		     $('.cmsTab a[href="#index"]').tab('show')
		  }).
		  error(function(data, status, headers, config) {
		    //console.log(status)
		  });
	};

	$scope.editEnable = function editEnable(id,index){
		$http({method: 'GET' , url: '/cms/page/'+id}).
		success(function(data){
			$scope.editPage = data
			$scope.currentIndex = index
			%
			$('.cmsTab a[href="#edit"]').tab('show')
		}).
		error(function(data){
			console.log('ewrror')
		});

	}

	$scope.updatePage = function updatePage(){
		$http({method: 'PUT', url: '/cms/page' , data: $scope.editPage}).
		  success(function(data, status, headers, config) {
		
		     $scope.pages[$scope.currentIndex] = data 
		     $scope.currentIndex = {}
		     $('.cmsTab a[href="#index"]').tab('show')
		  }).
		  error(function(data, status, headers, config) {
		    //console.log(status)
		  });
	};

	$scope.deletePage = function deletePage(id,index){
		$http({method: 'DELETE' , url: '/cms/page/'+id }).
		success(function(data){
			$scope.pages.splice(index,1) 
			console.log('deleted')
		}).
		error(function(data){
			console.log('ewrror')
		});
	}

	$scope.checkUrl = function checkUrl(url){

			$scope.testurl = {url: url}



			$http({method: 'POST', url: '/cms/page/url', data: $scope.testurl}).
			success(function(data, status, header, config){
				console.log(data.status)
				if(data.status)
				{	
					$scope.urlUnique = false;
				}
				else
				{
					$scope.urlUnique = true;
				}
			}).
			error(function(data){
				console.log('url error')
			})

	}




	

}]);