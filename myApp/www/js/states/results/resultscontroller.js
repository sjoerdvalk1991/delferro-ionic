var app = angular.module('results.controller', ['app.controller', 'pickadate']);

var resultsController = function($scope, $ionicModal, $ionicLoading, $timeout){
  var _this = this;
  _this.results = JSON.parse(localStorage.getItem('dailyData')).reverse();
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

  this.opendateModal = function() {
    $scope.datemodal.show();
  };

  this.dateFix = function(){
    dateArray = [];
    j = 0;
    for (; j < _this.results.length; j++) {
      var date = _this.results[j].date;
      dateFormat(date);
    }
    function dateFormat(date){
      var year = date.substr(6,4);
      var month = date.substr(3,2);
      var day = date.substr(0,2);
      dailyDate = {
        date: year+'-'+month+'-'+day
      }
      var day = moment(dailyDate.date, "yyyy-MM-DD");
      // console.log(day);
      dateArray.push(day);
    }
    
      // console.log(dateArray);
      localStorage.setItem('calenderData', JSON.stringify(dateArray));
    
  }

  this.dateFix();

  

  this.closedateModal = function(modal) {
    $scope.datemodal.hide();
    var day = modal.substr(8,2);
    var month = modal.substr(5, 2);
    var year = modal.substr(0, 4);

    var date = day+'-'+month+'-'+year;
    $scope.datepicker = date;
    var i = 0;
    var c = 0;
    for (; i < _this.results.length; i++) {
      if(_this.results[i].date == date){
          var result = _this.results[i];
        _this.results = [];
        c++;
        _this.results.push(result);
        $scope.datepicker = 'Heel goed op deze dag heeft u het schema ingevuld';

      }
    }if (c == 0){
      $scope.datepicker = 'Het schema is op deze datum niet ingevuld';
      _this.results = JSON.parse(localStorage.getItem('dailyData')).reverse();
    }

  };


  
};

resultsController.$inject = ['$scope', '$ionicModal', '$ionicLoading', '$timeout'];
app.controller('ResultsCtrl', resultsController);