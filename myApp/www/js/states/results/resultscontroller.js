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
      animation: 'slide-in-down'
      }
  );

  this.opendateModal = function() {
    $scope.datemodal.show();
  };


  this.closedateModal = function(modal) {
    $scope.datemodal.hide();
    var day = modal.substr(8,2);
    var month = modal.substr(5, 2);
    var year = modal.substr(0, 4);

    var date = day+'-'+month+'-'+year;
    $scope.datepicker = date;
    var i = 0;
    for (; i < _this.results.length; i++) {
      if(_this.results[i].date == date){
          var result = _this.results[i];
         _this.results = [];
          _this.results.push(result);  
      }
    }
  };    

};



resultsController.$inject = ['$scope', '$ionicModal'];
app.controller('ResultsCtrl', resultsController);