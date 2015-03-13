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
    var w = 300;
    var h = 300;
    var r = h/2;
    var color = d3.scale.category20().range(["#d62728","#98df8a", "#2ca02c"]);
    var data =[ 

      {"label":"Stotteren "+_this.result.stutter, "value":_this.result.stutter}, 
      {"label":"Stoppen "+_this.result.stop, "value":_this.result.stop}, 
      {"label":"Uitdagingen "+_this.result.challenge, "value":_this.result.challenge}
    
    ];

    var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
    var pie = d3.layout.pie().value(function(d){return d.value;});

// declare an arc generator function
    var arc = d3.svg.arc().outerRadius(r);

    // select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
        .attr("fill", function(d, i){
            return color(i);
        })
        .attr("d", function (d) {
            // log the result of the arc generator to show how cool it is :)
            return arc(d);
        });

    // add the text
    arcs.append("svg:text").attr("transform", function(d){
          d.innerRadius = 0;
          d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
        return data[i].label;}
        );
      
  }

  this.result = _this.resultCheck(params);
  this.drawChart();
};  


resultController.$inject = ['$stateParams'];
app.controller('ResultCtrl', resultController);