var app = angular.module('savedresult.controller', ['collection.service']);



savedResultController.$inject = ['$stateParams', 'collectService', '$q', '$scope', '$ionicPopup', '$state'];
app.controller('SavedResultCtrl', savedResultController);
