var app = angular.module('goals.controller', ['app.controller', 'camera.services']);

var goalsController = function($scope, $state, $rootScope, $ionicModal, $ionicViewService, $ionicLoading, $timeout, cameraService){
  var _this = this;
  // _this.images = [];
  this.items = '';
  this.item = '';
  this.lastPhoto = [];
  this.goals = JSON.parse(localStorage.getItem('goalAr'));
  this.camera = cameraService;
  this.photo = false;

	$ionicModal.fromTemplateUrl('js/states/goal/add-goal.html', function(modal) {
	  $scope.addDialog = modal;
	}, {
	  scope: $scope,
	  animation: 'slide-in-up',
	});

  $scope.$on('$destroy', function() {
    $scope.addDialog.remove();
  });


  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  $timeout(function () {
    $ionicLoading.hide();
    _this.loaded();
  }, 1200);

  this.loaded = function(){
    $('.all-content').fadeIn();
    $('.all-content').animo( { animation: 'fadeInRight', duration: 0.4 });
  }

  this.showAddChangeDialog = function(action) {
    $scope.action = action;
    $scope.addDialog.show();
  }

  this.leaveAddChangeDialog = function(newItem) {
    

    if(_this.goals){
      

      console.log('test');

    }else{
      goalAr = [];
      goalAr.push(newItem);
      localStorage.setItem('goalAr', JSON.stringify(goalAr));
    }


    $scope.addDialog.hide();
    _this.goals = JSON.parse(localStorage.getItem('goalAr'));
    $state.go($state.current, {}, {reload: true});


  }


  this.addItem = function(form) {
    var newItem = {};
    // Add values from form to object
    newItem.title = form.title.$modelValue;
    newItem.description = form.description.$modelValue;
    
    if(_this.lastPhoto){
      newItem.url = _this.lastPhoto[_this.lastPhoto.length-1];  
    }
    
    // If this is the first item it will be the default item
    if (newItem.title.length == 0) {
      newItem.useAsDefault = true;
    } else {
      // Remove old default entry from list 
      if (newItem.useAsDefault) {
        
      }
  	}

    _this.leaveAddChangeDialog(newItem);

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

goalsController.$inject = ['$scope', '$state', '$rootScope', '$ionicModal', '$ionicViewService', '$ionicLoading', '$timeout', 'cameraService'];
app.controller('GoalsCtrl', goalsController);