var app = angular.module('cms',['textAngular']);

app.controller('eventController',['$scope','$http','$filter',function eventController($scope,$http,$filter){

	
	$scope.tabs = []
	$scope.newTab = null
	$scope.newTabShow = false
	$scope.new_event = {'category_id': 999}

	$scope.urlUnique = true;

	$http({method: 'GET' , url: '/cms/events'}).
		success(function(data){
			$scope.events = data
			console.log($scope.events)
		}).
		error(function(data){
			console.log('error')
		});

		$scope.postEvent = function postEvent(){

			$scope.new_event.tabs = []
			$scope.intro_tab = {'title': "Introduction", 'content': ""}

			$scope.new_event.tabs.push($scope.intro_tab)
			

			$http({method:'POST', url:'/cms/event', data: $scope.new_event}).
			success(function(data, status, headers, config){
				$scope.events.push(data);
				$scope.new_event = {}
				$('.cmsTab a[href="#all"]').tab('show')
			}).
			error(function(data){
				console.log('error');
			});

		}

		$scope.deleteEvent = function deleteEvent(id,index){
			$http({method: 'DELETE' , url: '/cms/event/'+id }).
			success(function(data){
				$scope.events.splice(index,1) 
				console.log('deleted')
			}).
			error(function(data){
				console.log('error')
			});
		}

		$scope.editEnable = function editEnable(id,index){

			$('.cmsTab a[href = "#edit"]').tab('show');


			$scope.editEvent = $scope.events[index]
			$scope.currentIndex = index


			$http({method: 'GET', url: '/cms/events/'+id}).
			success(function(data){
				$scope.editEvent.imageUrl = data.image_url
				
			}).
			error(function(data){

				console.log('image url failed.')

			})



			if($scope.editEvent.tabs)
			{

				$scope.editEvent.tabs = JSON.parse($scope.editEvent.tabs)
				$scope.editEvent.meta = JSON.parse($scope.editEvent.meta)
				$scope.tabs = $scope.editEvent.tabs
			}
			else
			{
				$scope.editEvent.tabs = []
			}


			console.log($scope.newTab)
			console.log($scope.tabs)
			console.log($scope.editEvent)

		}


		$scope.updateEvent = function updateEvent(){
			$http({method: 'PUT', url:'/cms/event/', data: $scope.editEvent}).
			success(function(data, status, headers, config){
				$scope.events[$scope.currentIndex] = data
				$scope.editEvent = {}
				$('.cmsTab a[href = "#all"]').tab('show')

				console.log('updated')

			}).
			error(function(data){
				console.log('error')
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
				$scope.editEvent.tabs.push($scope.newTab)
				console.log($scope.newTab)
				}
				else if (test === 'delete')
				{
					console.log($scope.editEvent.tabs[tabindex])
					$scope.editEvent.tabs.splice(tabindex,1)
				}
				else
				{

				}
			
			$http({method: 'PUT', url: '/cms/event/', data: $scope.editEvent}).
			success(function(data, status, headers, config){
				$scope.events[$scope.currentIndex].tabs = $scope.editEvent.tabs
				$scope.newTab = {}
				console.log('tabs updated')
			}).
			error(function(data){
				console.log('error tabs')
			})
	
		}

		$scope.checkUrl = function checkUrl(url){

			$scope.testurl = {url: url}



			$http({method: 'POST', url: '/cms/event/url', data: $scope.testurl}).
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

		$scope.saveMeta = function saveMeta(){

			$http({method: 'PUT', url: '/cms/event/', data: $scope.editWorkshop}).
			success(function(data, status, headers, config){
				$scope.events[$scope.currentIndex].meta = $scope.editWorkshop.meta
				console.log('meta updated')
			}).
			error(function(data){
				console.log('error tabs')
			})

		}

	}]);

