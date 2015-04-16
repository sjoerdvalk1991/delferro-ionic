var app = angular.module('data.controller', ['app.controller', 'camera.services']);

var dataController = function($rootScope, $scope, $ionicPopup, $filter, pointService){
  var _this = this;

  this.stutter = 0;
  this.stop = 0;
  this.challenge = 0;
  this.points = 0;
  this.pointService = pointService;
  this.today = {};

  this.practise = [
    { text: "Oefeningen gedaan", checked: false }
  ];
  this.consequent = [  
    { text: "Consequent geweest", checked: false }
  ];

  this.theDate = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = dd+'-'+mm+'-'+yyyy;
    return today;
  }  

  this.today = this.theDate();

  if(localStorage.getItem('dailyData')){
    dailySession = JSON.parse(localStorage.getItem('dailyData'));
    var count = dailySession.length;
    dailyData = dailySession[count-1];
    if(dailyData.date == _this.today){
      _this.stutter = dailyData.stutter;
      _this.stop = dailyData.stop;
      _this.challenge = dailyData.challenge;
      _this.practise[0].checked = dailyData.practise;
      _this.consequent[0].checked = dailyData.consequent;
    }else{

    }  
  }else{

  }

  $scope.showPractise = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Zet hem op!',
     template: 'Heb je de oefeningen al gedaan?'
   });
   alertPopup.then(function(res) {
     console.log('Warning 0');
   });
  };  

  if(localStorage.getItem('practisewarning')){
    $scope.showPractise();
  }
  
  $scope.showAlertSaved = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Opgeslagen',
     template: 'De resultaten zijn succesvol opgeslagen'
   });
   alertPopup.then(function(res) {
     console.log('warning 1');
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


  this.increase = function(type){
    if(type == 'stotteren'){
     _this.stutter++;
    }else if(type == 'stoppen'){
      _this.stop++;
      $('.pt-10').show();
      $('.pt-10').animo( { 
        animation: 'fadeInUp', duration: 1.4}, function() {
        $('.pt-10').animo( { animation: 'fadeOutUpBig', duration: 1.3 }, function(){
          $('.pt-10').hide();
          
        }, pointIncrease());
      });

      function pointIncrease(){
        $scope.$apply(function () {
          _this.points = _this.stop * 10;
        });
        
          $('.score').animo( {  animation: 'tada', duration: 0.8 });
      }  

    }else if(type == 'uitdaging'){   
      _this.challenge++;
    }else{
      
    }	
  }

  this.decrease = function(type){
    if((type == 'stotteren') && (_this.stutter >= 0)){
  	 _this.stutter--;
    }else if((type == 'stoppen')&&(_this.stop >= 0)){
      _this.stop--;
    }else if((type == 'uitdaging')&&(_this.challenge >= 0)){   
      _this.challenge--;
    }else{

    }   
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

      var dailyData = {
        'date': _this.today,
        'stutter' : _this.stutter,
        'stop': _this.stop,
        'challenge': _this.challenge,
        'practise': _this.practise[0].checked,
        'consequent': _this.consequent[0].checked,
      }
      
      savedData.push(dailyData);
      localStorage.setItem('dailyData', JSON.stringify(savedData));
      $scope.showAlertSaved();
    }else{
      var dailySession = JSON.parse(localStorage.getItem('dailyData'));
      var dailyCount = dailySession[(dailySession.length -1)];
      console.log(dailyCount.date, _this.today);
      if(dailyCount.date === _this.today){
        dailySession.splice(-1, 1);

        var dailyData = {
          'date': _this.today,
          'stutter' : _this.stutter,
          'stop': _this.stop,
          'challenge': _this.challenge,
          'practise': _this.practise[0].checked,
          'consequent': _this.consequent[0].checked,
        }
        
        dailySession.push(dailyData);
        localStorage.setItem('dailyData', JSON.stringify(dailySession));
        $scope.showAlertSaved();  
      }else{

        var dailyData = {
          'date': _this.today,
          'stutter' : _this.stutter,
          'stop': _this.stop,
          'challenge': _this.challenge,
          'practise': _this.practise[0].checked,
          'consequent': _this.consequent[0].checked,
        }
        
        dailySession.push(dailyData);
        localStorage.setItem('dailyData', JSON.stringify(dailySession));
      }
    }
  }    
};  

dataController.$inject = ['$rootScope', '$scope', '$ionicPopup', '$filter', 'pointService'];
app.controller('DataCtrl', dataController);