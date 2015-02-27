var app = angular.module('result.controller', []);

var resultController = function(){
  var _this = this;

  this.result = function(){
  	{"JSON": "Hello, World"};
  }

};  


resultController.$inject = [];
app.controller('ResultCtrl', resultController);