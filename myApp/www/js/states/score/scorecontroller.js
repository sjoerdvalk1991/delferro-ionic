var app = angular.module('score.controller', ['app.controller']);

var scoreController = function($scope, $state, $rootScope, $timeout, $ionicLoading){
	var _this = this;
	
	this.score = {};

	this.getPoints = function(){

 	

		if(localStorage.getItem('dailyPoints')){  

			var points = JSON.parse(localStorage.getItem('dailyPoints'));

			return points;

		}else{
			return 0;
		}	

		
	}

	this.countUp = function(){
		console.log('test');
		for (var i = 0; i < _this.score; i++) {
			$scope.$apply(function () {
				_this.score--;
			});	
		};

		$('.line').animate({top: '50%'});
	 	$('.line').animate({top: '40%'});
	}

	this.score = _this.getPoints();

}

scoreController.$inject = ['$scope', '$state', '$rootScope', '$timeout'];
app.controller('ScoreCtrl', scoreController);