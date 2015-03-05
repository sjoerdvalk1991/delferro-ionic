var app = angular.module('data.controller', []);

var dataController = function($scope, $ionicPopup, $filter){
  var _this = this;

  this.inputs = 0;
  this.inputb = 0;

  this.practise = [
    { text: "Oefeningen gedaan", checked: false }
  ];
  this.consequent = [  
    { text: "Consequent geweest", checked: false }
  ];
  
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Pas op',
     template: 'Melding'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

  $scope.showAlertPractise = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Super',
     template: 'Je bent op de goede weg'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };


  this.increaseA = function(){
  	_this.inputs++;
  	if(_this.inputs == 3){
  		$scope.showAlert();
  	}	
  }

  this.decreaseA = function(){
  	_this.inputs--;
  }

  this.increaseB = function(){
    _this.inputb++;
    if(_this.inputb == 3){
      $scope.showAlert();
    } 
  }

  this.decreaseB = function(){
    _this.inputb--;
  }


  this.increaseB = function(){
    _this.inputb++;
    if(_this.inputb == 3){
      $scope.showAlert();
    } 
  }

  this.decreaseB = function(){
    _this.inputb--;
  }

  this.practiseChecker = function(){
    var numChecked = (_this.practise, function(text) {
      return text.checked
      console.log('test');
    });

    if(numChecked === true){
      $scope.showAlertPractise();
    }
  }  
};  

dataController.$inject = ['$scope', '$ionicPopup', '$filter'];
app.controller('DataCtrl', dataController);