var app = angular.module('cms',[]);

app.controller('categoryController',['$scope','$http','$filter',function categoryController($scope,$http,$filter){

	$scope.new_category = {'primary': 999}
	$scope.categories = {}
	$scope.urlUnique = true

		$http({method: 'GET' , url: '/cms/categories'}).
		success(function(data){
			$scope.categories = data
			console.log($scope.categories)
		}).
		error(function(data){
			console.log('error')
		});


   		$scope.postCategory = function postCategory(){

			$http({method:'POST', url:'/cms/category', data: $scope.new_category}).
			success(function(data, status, headers, config){
				
				if(data.primary == 'event')
				$scope.categories.event.push(data);
				else if(data.primary == 'workshop')
				$scope.categories.workshop.push(data);
				else
				$scope.categories.page.push(data);

				$scope.new_category = {}

			}).
			error(function(data){
				console.log('error');
			});

		}

		$scope.checkUrl = function checkUrl(url){

			$scope.testurl = {url: url}



			$http({method: 'POST', url: '/cms/category/url', data: $scope.testurl}).
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

		$scope.deleteCategory = function deleteCategory(id,index,primary){

			$http({method: 'DELETE' , url: '/cms/category/'+id }).
			success(function(data){

				if(primary == 'event')
				$scope.categories.event.splice(index,1)
				else if(primary == 'workshop')
				$scope.categories.workshop.splice(index,1)
				else
				$scope.categories.page.splice(index,1)

				console.log('deleted')
			}).
			error(function(data){
				console.log('error')
			});
		}


}])