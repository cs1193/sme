var app = angular.module('manageuser',[]);

app.controller('userController',['$scope','$http','$filter',function userController($scope,$http,$filter){
	$scope.email = 'ajaiy@in.com'
    $scope.assigned = {event: 999, workshop: 999}

    $scope.getUserList = function getUserList(){
    	
    	$http({method: 'GET', url: '/manage/user/list'}).
    	success(function(data){
    		$scope.users = data.users;
            $scope.all_events = data.events;
            $scope.all_workshops = data.workshops;
    	}).
    	error(function(data){
    		console.log(data)
    	})

    }

    $scope.getUserList()

   
    $scope.editEnable = function editEnable(id,index){
    	$scope.currentEdit = $scope.users[index]

    	$('#editEnable').modal()

    }

    $scope.assignEnable = function assignEnable(id,index){
        
        $scope.currentAssign = $scope.users[index]

        $('#assignEnable').modal()

    }

    $scope.saveAssign = function saveAssign(id){

        console.log(id)
        console.log($scope.assigned)

        $scope.tempAssign = {id: id}

            $scope.tempAssign.event = $scope.assigned.event
            $scope.tempAssign.workshop = $scope.assigned.workshop
     

        $http({method: 'POST', url: '/manage/user', data: $scope.tempAssign}).
        success(function(){
            $('#editAssign').modal('hide')
        }).
        error(function(){
            console.log('assign error')
        })

    }

    $scope.updateUser = function updateUser(){

    	$http({method: 'PUT' , url: '/manage/user/update',data: $scope.currentEdit}).
    	success(function(){
    		$('#editEnable').modal('hide')
    	}).
    	error(function(){

    	})
    }

    $scope.deleteEnable = function deleteEnable(id,index){
    	$scope.currentDelete = $scope.users[index]
    	$scope.currentDelete.ind = index 
    	$('#deleteEnable').modal()
    }

    $scope.deleteUser = function deleteUser(){
    	$http({method: 'DELETE' , url: '/manage/user/delete/'+$scope.currentDelete.id}).
    	success(function(data){
    		$('#deleteEnable').modal('hide')
    		$scope.users.splice($scope.currentDelete.ind,1)
    	}).
    	error(function(data){

    	});
    }
}]);

