var app = angular.module('tips.controller', ['app.controller', 'tip.services']);

var tipsController = function($scope, $ionicModal, ListFactory){
  var _this = this;
  	_this.tipList = ListFactory.getList();	  

		$ionicModal.fromTemplateUrl('js/states/tips/add-change-tip.html', function(modal) {
		  $scope.addDialog = modal;
		}, {
		  scope: $scope,
		  animation: 'slide-in-up'
		});
	
	 	this.showAddChangeDialog = function(action) {
	    $scope.action = action;
	    $scope.addDialog.show();
	  };

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
    };

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
	      ListFactory.setList(_this.tipList);
	      // Close dialog
	      this.leaveAddChangeDialog();
	    };	

};

tipsController.$inject = ['$scope', '$ionicModal', 'ListFactory'];
app.controller('TipsCtrl', tipsController);