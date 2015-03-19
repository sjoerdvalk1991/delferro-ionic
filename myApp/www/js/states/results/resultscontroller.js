var app = angular.module('results.controller', ['app.controller', 'pickadate']);

var resultsController = function($scope, $ionicModal){
  var _this = this;
  _this.results = JSON.parse(localStorage.getItem('dailyData'));
     
  $ionicModal.fromTemplateUrl('js/states/results/date.html', 
      function(modal) {
          $scope.datemodal = modal;
      },
      {
      // Use our scope for the scope of the modal to keep it simple
      scope: $scope, 
      // The animation we want to use for the modal entrance
      animation: 'slide-in-up'
      }
  );

  this.opendateModal = function() {
    $scope.datemodal.show();
  };


  this.closedateModal = function(modal) {
    console.log(modal);
    $scope.datemodal.hide();
    $scope.datepicker = modal;
  
    var i = 0;
    for (; i < _this.results.length; i++) {
      if(_this.results[i].date == date){
          return results[i];
      }
    }
  };    

};



resultsController.$inject = ['$scope', '$ionicModal'];
app.controller('ResultsCtrl', resultsController);