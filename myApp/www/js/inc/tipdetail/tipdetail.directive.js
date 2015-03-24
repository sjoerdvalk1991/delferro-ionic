	var module = angular.module('tipdetail.directive', ['tipdetail.controller']);

	module.directive('tipdetail', function() {
	  return{
	  	restrict: 'E',
	  	templateUrl: 'js/inc/tipdetail/tipdetail.html'
	  };
	});