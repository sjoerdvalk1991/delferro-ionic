var app = angular.module('result.controller', ['app.controller']);

var resultController = function(params){
  var _this = this;
  this.result = {};

  _this.resultCheck = function(params){
  	var results = JSON.parse(localStorage.getItem('dailyData'));
    var i = 0;
    for (; i < results.length; i++) {
      if(results[i].date == params.date){
        	return results[i];
      }
    }
  }

  this.result = _this.resultCheck(params);
  console.log(_this.result);

};  


resultController.$inject = ['$stateParams'];
app.controller('ResultCtrl', resultController);