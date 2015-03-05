var app = angular.module('movies.controller', []);

var moviesController = function($scope){
	var _this = this;
	var currentStart = 0;
  this.items = [];
	this.addItems = function() {
    for (var i = currentStart; i < currentStart+20; i++) {
      _this.items.push("Item " + i)
      console.log('test');
    }

    currentStart += 20
  }

  _this.addItems();
};

moviesController.$inject = ['$scope'];
app.controller('MoviesCtrl', moviesController);