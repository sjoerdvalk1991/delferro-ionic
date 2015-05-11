var app = angular.module('score.controller', ['app.controller']);

var scoreController = function($scope, $state, $rootScope, $timeout, $ionicLoading){
	var _this = this;

	this.score = {};
	this.lineWidth = 0;

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

		function hideSilverButton(){
      $('.silver-section').animo( {
    	animation: 'fadeOutRight', duration: 0.5}, function() {
      	$('.silver-section').hide();
    	});
    };

		function stopAnimate(){
				$('.line').animate({top: '40%'});
      	$('.score-p').hide();
      	$('.silver').css("display", "inline-block");
      	$('.line').stop(true);
      	$('.line').css("top", "40%");

      	hideSilverButton();


  	}

		$('#countdown')
			.prop('number', _this.score)
	  	.animateNumber(
		    {
		      number: 0,
		      numberStep: function(now, tween) {
		        var target = $(tween.elem),
	            rounded_now = Math.round(now);
	            $('.line').animate({top: '50%'});
	            $scope.$apply(); {
	            	_this.lineWidth = (_this.lineWidth +  0.1);
	            }
	            	console.log(_this.lineWidth);
	 						$('.line').animate({top: '40%'});
		        target.text(now === tween.end ? stopAnimate() : rounded_now);

		      }
		    },
		    4000,
		    'linear'
	  	)





	}

	this.score = _this.getPoints();

}

scoreController.$inject = ['$scope', '$state', '$rootScope', '$timeout'];
app.controller('ScoreCtrl', scoreController);