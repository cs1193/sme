var app = angular.module('cms',['textAngular']);

app.controller('workshopController',['$scope','$http','$filter',function workshopController($scope,$http,$filter){

	$scope.workshops = [];
	$scope.newTab = null
	$scope.newTabShow = false
	$scope.new_workshop = {'category_id': 999}

	$scope.urlUnique = true;


		$http({method: 'GET' , url: '/cms/workshops'}).
				success(function(data){
					$scope.workshops = data
					console.log($scope.workshops)
				}).
				error(function(data){
					console.log('error')
				});

		$scope.postWorkshop = function postWorkshop(){

			$scope.new_workshop.tabs = []
			$scope.intro_tab = {'title': "Introduction", 'content': ""}

			$scope.new_workshop.tabs.push($scope.intro_tab)
			

			$http({method:'POST', url:'/cms/workshop', data: $scope.new_workshop}).
			success(function(data, status, headers, config){
				$scope.workshops.push(data);
				$scope.new_workshop = {}
				$('.cmsTab a[href="#all"]').tab('show')
			}).
			error(function(data){
				console.log('error');
			});

		}

		$scope.deleteWorkshop = function deleteWorkshop(id,index){
			$http({method: 'DELETE' , url: '/cms/workshop/'+id }).
			success(function(data){
				$scope.workshops.splice(index,1) 
				console.log('deleted')
			}).
			error(function(data){
				console.log('error')
			});
		}

		$scope.editEnable = function editEnable(id,index){

			$('.cmsTab a[href = "#edit"]').tab('show');


			$scope.editWorkshop = $scope.workshops[index]
			$scope.currentIndex = index


			$http({method: 'GET', url: '/cms/workshops/'+id}).
			success(function(data){
				$scope.editWorkshop.imageUrl = data.image_url
				
			}).
			error(function(data){

				console.log('image url failed.')

			})



			if($scope.editWorkshop.tabs)
			{

				$scope.editWorkshop.tabs = JSON.parse($scope.editWorkshop.tabs)
				$scope.editWorkshop.meta = JSON.parse($scope.editWorkshop.meta)
				$scope.tabs = $scope.editWorkshop.tabs
			}
			else
			{
				$scope.editWorkshop.tabs = []
			}


			console.log($scope.newTab)
			console.log($scope.tabs)
			console.log($scope.editWorkshop)

		}

		$scope.tabEditor = function tabEditor(){

			for (tab in $scope.editWorkshop.tabs) {
    			            

    		}
		}

		$scope.updateWorkshop = function updateWorkshop(){
			$http({method: 'PUT', url:'/cms/workshop/', data: $scope.editWorkshop}).
			success(function(data, status, headers, config){
				$scope.workshops[$scope.currentIndex] = data
				$scope.editWorkshop = {}
				$('.cmsTab a[href = "#all"]').tab('show')

				console.log('updated')

			}).
			error(function(data){
				console.log('error')
			})
		}

		$scope.saveMeta = function saveMeta(){

			$http({method: 'PUT', url: '/cms/workshop/', data: $scope.editWorkshop}).
			success(function(data, status, headers, config){
				$scope.workshops[$scope.currentIndex].tabs = $scope.editWorkshop.tabs
				console.log('meta updated')
			}).
			error(function(data){
				console.log('error tabs')
			})

		}

		$scope.tabShow = function tabShow(){
 			
 			$('.allTabs a[href = "#new"]').tab('show')
			console.log("newtab")

		}

		$scope.activeTab = function activeTab(){
 			
 			$('.allTabs a[href = "#new"]').tab('show')
			console.log("newtab")

		}

		$scope.saveTab = function saveTab(test,tabindex){

				console.log($scope.newTab)
				if(test == true)
				{
				$scope.editWorkshop.tabs.push($scope.newTab)
				console.log($scope.newTab)
				}
				else if (test === 'delete')
				{
					console.log($scope.editWorkshop.tabs[tabindex])
					$scope.editWorkshop.tabs.splice(tabindex,1)
				}
				else
				{

				}
			
			$http({method: 'PUT', url: '/cms/workshop/', data: $scope.editWorkshop}).
			success(function(data, status, headers, config){
				$scope.workshops[$scope.currentIndex].tabs = $scope.editWorkshop.tabs
				$scope.newTab = {}
				console.log('tabs updated')
			}).
			error(function(data){
				console.log('error tabs')
			})
	
		}

		$scope.checkUrl = function checkUrl(url){

			$scope.testurl = {url: url}



			$http({method: 'POST', url: '/cms/workshop/url', data: $scope.testurl}).
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
