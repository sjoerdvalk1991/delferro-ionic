var app = angular.module('goals.controller', ['app.controller', 'tip.services', 'camera.services']);

var goalsController = function($scope, $state, $rootScope, $ionicModal, $ionicViewService, $ionicLoading, cameraService){
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

  $scope.$on('$destroy', function() {
    $scope.addDialog.remove();
  });

  this.showAddChangeDialog = function(action) {
    $scope.action = action;
    $scope.addDialog.show();
  }

  this.leaveAddChangeDialog = function() {
    $scope.addDialog.hide();
    $state.go($state.current, {}, {reload: true});
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
        
      }
  	}
  }

  this.deleteItem = function(){
  	
  }	
 

  this.getPhoto = function() {
    console.log('Getting camera');
    _this.camera.getPicture().then(function(imageURI) {
      _this.lastPhoto.push(imageURI);
    }, function(err) {
      console.err(err);
    }, {
      quality: 75,
      targetWidth: 320,
      targetHeight: 320,
      saveToPhotoAlbum: false
    });
    var length = _this.lastPhoto.length;
    _this.imagePlus(length); 
    
  }

};

goalsController.$inject = ['$scope', '$state', '$rootScope', '$ionicModal', '$ionicViewService', '$ionicLoading', 'cameraService'];
app.controller('GoalsCtrl', goalsController);