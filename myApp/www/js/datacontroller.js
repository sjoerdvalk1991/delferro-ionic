var app = angular.module('data.controller', []);

var dataController = function($scope, $ionicPopup){
  var _this = this;

  this.input = 0;
  
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Pas op',
     template: 'Je hebt een slordige dag'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

  this.increase = function(){
  	_this.input++;
  	if(_this.input == 3){
  		$scope.showAlert();
  	}	
  }

  this.decrease = function(){
  	_this.input--;
  }

};  


dataController.$inject = ['$scope', '$ionicPopup'];
app.controller('DataCtrl', dataController);