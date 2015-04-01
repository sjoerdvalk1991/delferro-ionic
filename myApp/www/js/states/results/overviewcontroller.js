var app = angular.module('overview.controller', ['app.controller']);

var overviewController = function($rootScope, $scope, $ionicPopup, params){
  var _this = this;

  this.catchWeek = function(params){
  	console.log(params);
  	var results = JSON.parse(localStorage.getItem('dailyData'));
  	var i = 0;
    for (; i < results.length; i++) {
      if(results[i].date == params.date){
 					var equal = i;
      }
    }
    if(equal > 3){
    	var weekData = results.splice((equal - 3), 7); 
    }else{
    	var weekData = results.splice(equal, 7); 
    }
    j = 0;

    dateArray = [];
    for (; j < weekData.length; j++) {
     	var date = weekData[j].date;
     	dateFormat(date);
    }
    function dateFormat(date){
    	var year = date.substr(6,4);
  		var month = date.substr(3,2);
  		var day = date.substr(0,2);
  		dailyDate = {
  			date: year+'-'+month+'-'+day
  		}
 
  		dateArray.push(dailyDate);
  	}

  	g = 0;	
  	for (; g < weekData.length; g++) {
     	weekData[g].date = dateArray[g].date;
    }
  	
    console.log(weekData);
    _this.drawGraph(weekData);  	
  }

  this.drawGraph = function(weekData){
  	var arrData = weekData;
  	var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

		var parseDate = d3.time.format("%Y-%m-%d").parse;


		var x = d3.time.scale()
	    .range([0, width])

		var y = d3.scale.linear()
	    .range([height, 0]);

		var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

		var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

		var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.stutter); });

		var svg = d3.select("body").append("svg")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		  var data = arrData.map(function(d) {
	      return {
	        date: parseDate(d[0]),
	        stutter: d[1]
	      };
		      
		  });

	  console.log(data);


	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  y.domain(d3.extent(data, function(d) { return d.stutter; }));

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Price ($)");

	  svg.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line);
	};

  this.catchWeek(params);
};

overviewController.$inject = ['$rootScope', '$scope', '$ionicPopup', '$stateParams'];
app.controller('OverviewCtrl', overviewController);