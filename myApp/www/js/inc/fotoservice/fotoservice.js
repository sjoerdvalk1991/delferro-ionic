var module = angular.module('camera.services', []);

module.factory('cameraService', function($q) {
 
  var cameraService = {};

    cameraService.getPicture = function(options) {
      var q = $q.defer();
            
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }

    return cameraService;
})
