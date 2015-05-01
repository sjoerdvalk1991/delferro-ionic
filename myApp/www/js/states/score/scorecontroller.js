var app = angular.module('score.controller', ['app.controller']);

var scoreController = function($scope, $state, $rootScope, $timeout){
	var _this = this;
	
	this.score = {};

	this.getPoints = function(){

 	

		if(localStorage.getItem('dailyPoints')){  

			var points = JSON.parse(localStorage.getItem('dailyPoints'));

			return points;

		}else{
			return 0;
		}	

		
	};

	this.animateLine = function(){
		console.log('test');
		$scope.$apply(function () {	
			$('.line').show();
			$('.line').animo({ 
		    animation: 'fadeInDown', duration: 1.5}, function() {
	        $('.line').animo( { animation: 'fadeOutUp', duration: 1.3 }, function(){
	      })
	    });
	  });     
	}

	this.score = _this.getPoints();

	$timeout(function () {
		_this.animateLine();
	}, 2200);	

}

scoreController.$inject = ['$scope', '$state', '$rootScope', '$timeout'];
app.controller('ScoreCtrl', scoreController);