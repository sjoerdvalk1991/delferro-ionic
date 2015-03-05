var app = angular.module('data.controller', []);

var dataController = function($scope, $ionicPopup, $filter){
  var _this = this;

  this.inputa = 0;
  this.inputb = 0;
  this.inputc = 0;

  this.practise = [
    { text: "Oefeningen gedaan", checked: false }
  ];
  this.consequent = [  
    { text: "Consequent geweest", checked: false }
  ];

  if(localStorage.getItem('dailyData')){
    dailySession = JSON.parse(localStorage.getItem('dailyData'));
    console.log(dailySession);
    _this.inputa = dailySession[0][0].value;
    _this.inputb = dailySession[0][1].value;
    _this.inputc = dailySession[0][2].value;
    _this.practise[0].checked = dailySession[0][3].value;
    _this.consequent[0].checked = dailySession[0][4].value;
     var date = new Date();
     console.log(date);
  }else{

  }  
  
  $scope.showAlertSaved = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Pas op',
     template: 'Melding'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

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
  	_this.inputa++;
  	if(_this.inputa == 3){
  		$scope.showAlert();
  	}	
  }

  this.decreaseA = function(){
    if(_this.inputa >= 0){
  	 _this.inputa--;
    }
  }

  this.increaseB = function(){
    _this.inputb++;
    if(_this.inputb == 3){
      $scope.showAlert();
    } 
  }

  this.decreaseB = function(){
    if(_this.inputa >= 0){
      _this.inputb--;
    }  
  }


  this.increaseC = function(){
    _this.inputc++;
    if(_this.inputb == 3){
      $scope.showAlert();
    } 
  }

  this.decreaseC = function(){
    _this.inputc--;
  }

  this.practiseChecker = function(){
    var checkValue = _this.practise[0].checked;
    if(checkValue == true){
      $scope.showAlertPractise();
    }
  }

  this.consequentChecker = function(){
    var checkValue = _this.consequent[0].checked;
    if(checkValue == true){
     
      $scope.showAlertPractise();
    }
  }

  this.dayresultSaver = function(){
    if(!localStorage.getItem('dailyData')){  
      var savedData = [];
      var stutters = this.inputa;
      var dailyData = [
        {text: 'Stotteren', value: _this.inputa},
        {text: 'Stoppen', value: _this.inputb},
        {text: 'Uitdagingen', value:  _this.inputc},
        {text: 'Oefeningen', value:  _this.practise[0].checked},
        {text: 'Consequent', value:  _this.consequent[0].checked}
      ];  
      savedData.push(dailyData);
      localStorage.setItem('dailyData', JSON.stringify(savedData));
      $scope.showAlertSaved();
    }else{

    }  

  };


};  

dataController.$inject = ['$scope', '$ionicPopup', '$filter'];
app.controller('DataCtrl', dataController);