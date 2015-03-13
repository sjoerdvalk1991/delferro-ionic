var app = angular.module('result.controller', ['app.controller']);

var resultController = function(params){
  var _this = this;
  this.result = {};
  this.results = JSON.parse(localStorage.getItem('dailyData'));

  this.resultCheck = function(params){
  	var results = JSON.parse(localStorage.getItem('dailyData'));
    var i = 0;
    for (; i < results.length; i++) {
      if(results[i].date == params.date){
        	return results[i];
      }
    }
  }

  this.drawChart = function(){
    var svg = dimple.newSvg("#bar", 320, 320);
    var data = [];
    data.push(_this.result);
    var chart = new dimple.chart(svg, data);
    chart.setBounds(20, 20, 300, 300)
    chart.addMeasureAxis("p", "stop");
    var ring = chart.addSeries("stop", dimple.plot.pie);
    ring.innerRadius = "50%";
    chart.draw();
  }

  this.result = _this.resultCheck(params);
  this.drawChart();
};  


resultController.$inject = ['$stateParams'];
app.controller('ResultCtrl', resultController);