var app = angular.module('app.controller', []);

var appController = function($scope, $ionicModal, $timeout, $location, $q){

  var _this = this;
  // Form data for the login modal
  this.loginData = {};

  this.hasMenu = true;

  this.practise = [
    { text: "Oefeningen melding", checked: false }
  ];

  if(localStorage.getItem('practisewarning')){
    _this.practise[0].checked = JSON.parse(localStorage.getItem('practisewarning'));  
  }

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    _this.modal = modal;
  });

  // Triggered in the login modal to close it
 this.closeLogin = function() {
    _this.modal.hide();
  };

  // Open the login modal
  this.login = function() {
    _this.modal.show();
  };

  // Perform the login action when the user submits the login form
  this.doLogin = function() {
    console.log('Doing login', this.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      _this.closeLogin();
    }, 1000);
  };

  this.warning = function(){
    if(!localStorage.getItem('practisewarning')){
      var checkValue = _this.practise[0].checked;
      if(checkValue === true){
        localStorage.setItem('practisewarning', JSON.stringify(checkValue));
      }
    }else{
      localStorage.removeItem('practisewarning');  
    }  
  }
}
appController.$inject = ['$scope', '$ionicModal', '$timeout','$location'];
app.controller('AppCtrl', appController);