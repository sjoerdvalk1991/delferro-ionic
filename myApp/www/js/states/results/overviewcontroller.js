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
  	var dataArray = [];
  	g = 0;	
  	for (; g < weekData.length; g++) {
     	weekData[g].date = dateArray[g].date;
     	dailyNumber = {
     		date: weekData[g].date,
     		total: weekData[g].stutter
     	}
     	dataArray.push(dailyNumber);
    }

    _this.drawGraph(dataArray); 
    console.log(weekData); 	
  }

  this.drawGraph = function(dataArray){
  	var data = dataArray;
		  var margin = {top: 40, right: 40, bottom: 40, left:40},
		    width = 300,
		    height = 200;

		var x = d3.time.scale()
		    .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
		    .rangeRound([0, width - margin.left - margin.right]);

		var y = d3.scale.linear()
		    .domain([0, d3.max(data, function(d) { return d.total; })])
		    .range([height - margin.top - margin.bottom, 0]);

		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient('bottom')
		    .ticks(d3.time.days, 1)
		    .tickFormat(d3.time.format('%a %d'))
		    .tickSize(0)
		    .tickPadding(8);

		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient('left')
		    .tickPadding(8);

		var svg = d3.select('#visualisation').append('svg')
		    .attr('class', 'chart')
		    .attr('width', width)
		    .attr('height', height)
		  .append('g')
		    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

		svg.selectAll('.chart')
		    .data(data)
		  .enter().append('rect')
		    .attr('class', 'bar')
		    .attr('x', function(d) { return x(new Date(d.date)); })
		    .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.total)) })
		    .attr('width', 10)
		    .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.total) });

		svg.append('g')
		    .attr('class', 'x axis')
		    .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
		    .call(xAxis)
		    .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)" 
                });

		svg.append('g')
		  .attr('class', 'y axis')
		  .call(yAxis);
	}
	  
  this.catchWeek(params);
};

overviewController.$inject = ['$rootScope', '$scope', '$ionicPopup', '$stateParams'];
app.controller('OverviewCtrl', overviewController);