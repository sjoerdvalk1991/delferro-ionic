var app = angular.module('tips.controller', ['app.controller', 'tip.services', 'camera.services']);

var tipsController = function($scope, $ionicModal, $ionicViewService, $ionicLoading, cameraService){
  var _this = this;
  // _this.images = [];
  this.items = '';
  this.item = '';
  this.lastPhoto = [];
  this.camera = cameraService;
  this.photo = false;

	$ionicModal.fromTemplateUrl('js/states/tips/add-change-tip.html', function(modal) {
	  $scope.addDialog = modal;
	}, {
	  scope: $scope,
	  animation: 'slide-in-up',
	});

  this.getItemsSuccess = function(data){
    _this.items = data;
      // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html 
    $scope.$apply(); 
  };

  this.getItems = function(){
    dataStore.getAll(_this.getItemsSuccess,_this.errorCallback);
    console.log('getItems'); 
  };

  this.errorCallback = function(){
    console.log('error'); 
  };

  this.initCallback = function(){
    _this.getItems();
  };

  this.showAddChangeDialog = function(action) {
    $scope.action = action;
    $scope.addDialog.show();
  }

  this.leaveAddChangeDialog = function() {
    $scope.addDialog.hide();
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
    if (newItem.title.length == 0) {
      newItem.useAsDefault = true;
    } else {
      // Remove old default entry from list 
      if (newItem.useAsDefault) {
        removeDefault();
      }
    }
    if(_this.lastPhoto.length > 0){
      dataStore.put({'timeStamp': new Date().getTime(),'title' : form.title.$modelValue, 'text' : form.description.$modelValue, 'url' : _this.lastPhoto[_this.lastPhoto.length-1] });
      _this.initCallback();

      this.leaveAddChangeDialog();
      _this.photo = false;
    }
  };  

  
  var dataStore = new IDBStore('todos', _this.initCallback);

  this.getPhoto = function() {
    console.log('Getting camera');
    _this.camera.getPicture().then(function(imageURI) {
      console.log(imageURI);
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
    _this.lastPhoto.push(imageURI);
  }
};

tipsController.$inject = ['$scope', '$ionicModal', '$ionicViewService', '$ionicLoading', 'cameraService'];
app.controller('TipsCtrl', tipsController);