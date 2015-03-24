var app = angular.module('tip.controller', ['app.controller']);

var tipController = function($scope, $rootScope, params){
  var _this = this;
  this.tips = {};
  this.items = '';


   this.getItemsSuccess = function(data){
    _this.items = data;
      // http://jimhoskins.com/2012/12/17/angularjs-and-apply.html 
    $scope.$apply(); 
    _this.tipCheck(params);
  };

  this.getItems = function(){
    dataStore.getAll(_this.getItemsSuccess,_this.errorCallback);
    
  };

  this.errorCallback = function(){
    console.log('error'); 
  };

  this.initCallback = function(){
    _this.getItems();
  };

  this.tipCheck = function(params){
  	console.log(params);
  	var items = _this.items;
    var i = 0;
    for (; i < items.length; i++) {
      if(items[i].title == params.title){
        	_this.tips = items[i];
      }
    }
  }

  var dataStore = new IDBStore('todos', _this.initCallback);
}
tipController.$inject = ['$scope', '$rootScope', '$stateParams'];
app.controller('TipCtrl', tipController);  