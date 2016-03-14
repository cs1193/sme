//= require angular-file-upload
var app = angular.module('cms',['angularFileUpload']);

app.controller('sliderController',[ '$scope', '$http', '$timeout', '$upload', function sliderController($scope, $http, $timeout, $upload) {
	$scope.fileReaderSupported = window.FileReader != null;
	$scope.uploadRightAway = false;
	$scope.modelName = '';

	$http({method: 'GET' , url: '/cms/sliders'}).
	success(function(data){
		$scope.imageFiles = data
		console.log($scope.imageFiles)
	}).
	error(function(data){
		console.log('error')
	});

	$scope.deleteImage = function deleteImage(id,index) {
		$http({method: 'DELETE', url: '/cms/slider/'+id}).
		success(function(data){
			$scope.imageFiles.splice(index,1)
			
		}).
		error(function(data){
			console.log('delete error')
		})
	}
	$scope.hasUploader = function(index) {
		return $scope.upload[index] != null;
	};

	
	$scope.onFileSelect = function($files) {
		$scope.selectedFiles = [];
		$scope.progress = [];
		if ($scope.upload && $scope.upload.length > 0) {
			for (var i = 0; i < $scope.upload.length; i++) {
				if ($scope.upload[i] != null) {
					$scope.upload[i].abort();
				}
			}
		}
		$scope.upload = [];
		$scope.uploadResult = [];
		console.log($files[0].name)
		$scope.selectedFiles = $files;
		$scope.dataUrls = [];
		for ( var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if (window.FileReader && $file.type.indexOf('image') > -1) {
			  	var fileReader = new FileReader();
		        fileReader.readAsDataURL($files[i]);
		        function setPreview(fileReader, index) {
		            fileReader.onload = function(e) {
		                $timeout(function() {
		                	$scope.dataUrls[index] = e.target.result;
		                });
		            }
		        }
		        setPreview(fileReader, i);
			}
			$scope.progress[i] = -1;
			if ($scope.uploadRightAway) {
				$scope.start(0);
			}
		}
	}
	
	$scope.start = function(index) {
		$scope.progress[index] = 0;
		$scope.modelData = {modelName : $scope.modelName }
		console.log($scope.modelData)
		console.log($scope.selectedFiles)
			$scope.upload[index] = $upload.upload({
				url : '/cms/slider',
				method: 'POST',
				
				data: $scope.modelData,
				/* formDataAppender: function(fd, key, val) {
					if (angular.isArray(val)) {
                        angular.forEach(val, function(v) {
                          fd.append(key, v);
                        });
                      } else {
                        fd.append(key, val);
                      }
				}, */
				file: $scope.selectedFiles[index],
				fileFormDataName: 'myFile'
			}).then(function(response) {
				$scope.uploadResult.push(response.data.result);
			 	
			 	$scope.imageFiles.push(response.data)
			 	
			}, null, function(evt) {
				$scope.progress[index] = parseInt(100.0 * evt.loaded / evt.total);


			});

	}
}]);
