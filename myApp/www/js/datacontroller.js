var app = angular.module('data.controller', []);

var dataController = function($scope, $ionicPopup){
  var _this = this;

  this.inputs = 0;
  this.inputb = 0;
  
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Pas op',
     template: 'Je hebt een slordige dag'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

  this.increases = function(){
  	_this.inputs++;
  	if(_this.inputs == 3){
  		$scope.showAlert();
  	}	
  }

  this.decreases = function(){
  	_this.inputs--;
  }

  this.increaseb = function(){
    _this.inputb++;
    if(_this.inputb == 3){
      $scope.showAlert();
    } 
  }

  this.decreaseb = function(){
    _this.inputb--;
  }

};  


dataController.$inject = ['$scope', '$ionicPopup'];
app.controller('DataCtrl', dataController);