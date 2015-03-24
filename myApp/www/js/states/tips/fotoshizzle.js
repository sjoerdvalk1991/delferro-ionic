//----------------------//
 // //     CAMERA PART      //
 // //----------------------//


 //  this.urlForImage = function(imageName) {
 //    var name = imageName.substr(imageName.lastIndexOf('/') + 1);
 //    var trueOrigin = cordova.file.dataDirectory + name;
 //    return trueOrigin;
 //  }

 //  this.idCheck = function(id){
 //    var i = 0;
 //    for (; i < _this.items.length; i++) {
 //      if(_this.items[i].id == id){
 //         _this.item = _this.items[i];
 //         console.log(_this.item);
 //      }else{

 //      }
 //    }
 //    _this.showAddChangeDialog2(); 
 //  }

 //  this.addImage = function(){
 //  	var options = {
 //  		destinationType : Camera.DestinationType.FILE_URI,
 //  		sourceType : Camera.PictureSourcType.CAMERA,
 //  		allowEdit : false,
 //  		encodingType: Camera.encodingType.JPEG,
 //  		popopverOptions: CameraPopoverOptions,
 //  	};

 //  	$cordovaCamera.getPicture(options).then(function(imageData){
 //  		onImageSuccess(imageData);

 //  		function onImageSuccesss(fileURI){
 //  			createFileEntry(fileURI);
 //  		}

 //  		function createFileEntry(fileURI) {
 //  			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
 //  		}

 //  		function copyFile(fileEntry){
 //  			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/')+ 1);
 //  			var newName = makeid() + name;
  		
 //  			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
 //  				fileEntry.copyTo(
 //  					fileSystem2,
 //  					newName,
 //  					onCopySucces,
 //  					fail	
 //  				);
 //  			},	
 //  			fail);
 //  		}

 //  		function onCypSuccess(entry){
 //  			$scope.$apply(function(){
 //  				_this.images.push(entry.nativeURL);
 //  			});
 //  		}

 //  		function fail(error){
 //  			console.log('fail' + error.code);
 //  		}

 //  		function makeid(){
 //  			var text = "";
 //  			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 //  		}

 //  		for (var i=0; i < 5; i++) {
	// 			text += possible.charAt(Math.floor(Math.random() * possible.length));
	// 		}
	// 		return text;

 //  	}, function(err) {
	// 	console.log(err); 
	// 	});
 //  }