var app = angular.module('tips.controller', ['app.controller', 'tip.services']);

var tipsController = function($scope, $ionicModal, ListFactory, $cordovaCamera, $cordovaFile){
  var _this = this;
  _this.images = [];
  _this.items = '';
  _this.item = '';
  _this.tipList = ListFactory.getList();	  

	$ionicModal.fromTemplateUrl('js/states/tips/add-change-tip.html', function(modal) {
	  $scope.addDialog = modal;
	}, {
	  scope: $scope,
	  animation: 'slide-in-up',
	});

  $ionicModal.fromTemplateUrl('js/states/tips/open-tip.html', function(detail) {
    $scope.addDialog2 = detail;
    $scope.addDialog2.searchText = "---";
  }, {
    scope: $scope,
    animation: 'slide-in-up',
    // searchText = _this.item,
  });

  _this.getItemsSuccess = function(data){
    _this.items = data;
      // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html 
    console.log(_this.items);
    $scope.$apply(); 
  };

  _this.getItems = function(){
    dataStore.getAll(_this.getItemsSuccess,_this.errorCallback);
    console.log('getItems'); 
  };

  _this.errorCallback = function(){
    console.log('error'); 
  };

  this.initCallback = function(){
    _this.getItems();
  };

  this.showAddChangeDialog = function(action) {
    $scope.action = action;
    $scope.addDialog.show();
  }

  this.showAddChangeDialog2 = function(action) {
    
    $scope.action = action;
    $scope.addDialog2.show();

  }

  this.leaveAddChangeDialog = function() {
      // Remove dialog 
    $scope.addDialog.remove();
    // Reload modal template to have cleared form
    $ionicModal.fromTemplateUrl('js/states/tips/add-change-tip.html', function(modal) {
      $scope.addDialog = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });
  }

  this.saveEmpty = function(form) {
    $scope.form = angular.copy(form);
  }

  this.addItem = function(form) {
    var newItem = {};
    // Add values from form to object
    newItem.title = form.title.$modelValue;
    newItem.description = form.description.$modelValue;
    // If this is the first item it will be the default item
    if (_this.tipList.length == 0) {
      newItem.useAsDefault = true;
    } else {
      // Remove old default entry from list 
      if (newItem.useAsDefault) {
        removeDefault();
      }
    }
    // Save new list in scope and factory
    _this.tipList.push(newItem);
    dataStore.put({'timeStamp': new Date().getTime(),'title' : form.title.$modelValue, 'text' : form.description.$modelValue});
    console.log(dataStore);
    ListFactory.setList(_this.tipList);
    _this.getItems();
    this.leaveAddChangeDialog();
  };  

 var dataStore = new IDBStore('todos', _this.initCallback);


 //----------------------//
 //     CAMERA PART      //
 //----------------------//


  this.urlForImage = function(imageName) {
    var name = imageName.substr(imageName.lastIndexOf('/') + 1);
    var trueOrigin = cordova.file.dataDirectory + name;
    return trueOrigin;
  }

  this.idCheck = function(id){
    var i = 0;
    for (; i < _this.items.length; i++) {
      if(_this.items[i].id == id){
         _this.item = _this.items[i];
         console.log(_this.item);
      }else{

      }
    }
    _this.showAddChangeDialog2(); 
  }

  this.addImage = function(){
  	var options = {
  		destinationType : Camera.DestinationType.FILE_URI,
  		sourceType : Camera.PictureSourcType.CAMERA,
  		allowEdit : false,
  		encodingType: Camera.encodingType.JPEG,
  		popopverOptions: CameraPopoverOptions,
  	};

  	$cordovaCamera.getPicture(options).then(function(imageData){
  		onImageSuccess(imageData);

  		function onImageSuccesss(fileURI){
  			createFileEntry(fileURI);
  		}

  		function createFileEntry(fileURI) {
  			window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
  		}

  		function copyFile(fileEntry){
  			var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/')+ 1);
  			var newName = makeid() + name;
  		
  			window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
  				fileEntry.copyTo(
  					fileSystem2,
  					newName,
  					onCopySucces,
  					fail	
  				);
  			},	
  			fail);
  		}

  		function onCypSuccess(entry){
  			$scope.$apply(function(){
  				_this.images.push(entry.nativeURL);
  			});
  		}

  		function fail(error){
  			console.log('fail' + error.code);
  		}

  		function makeid(){
  			var text = "";
  			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  		}

  		for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;

  	}, function(err) {
		console.log(err); 
		});
  }

};

tipsController.$inject = ['$scope', '$ionicModal', 'ListFactory', '$cordovaCamera', '$cordovaFile'];
app.controller('TipsCtrl', tipsController);