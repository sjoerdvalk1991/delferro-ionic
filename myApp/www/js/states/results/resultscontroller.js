var app = angular.module('results.controller', ['app.controller']);

var resultsController = function(){
  var _this = this;
  _this.results = JSON.parse(localStorage.getItem('dailyData'));	  
};


resultsController.$inject = [];
app.controller('ResultsCtrl', resultsController);