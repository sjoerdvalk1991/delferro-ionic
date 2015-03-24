var app = angular.module('tipdetail.controller', ['app.controller']);

var tipdetailController = function(){
	console.log('test');
};

tipdetailController.$inject = [];
app.controller('TipdetailCtrl', tipdetailController);