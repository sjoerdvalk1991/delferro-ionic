var module = angular.module('savedResultController.directive', ['savedResultController.controller']);

module.directive('savedResultController', function() {
  return{
  	restrict: 'E',
  	templateUrl: 'templates/saved-result.html'
  };
});