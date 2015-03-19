var app = angular.module('results.controller', ['app.controller']);

var resultsController = function(){
  var _this = this;
  _this.results = JSON.parse(localStorage.getItem('dailyData'));

  this.dateScroller = function(){     
    $('#demo').mobiscroll().date({
        invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] },
        theme: '	',
        display: 'inline',
        mode: 'scroller',
        dateOrder: 'dd mm yy',
        dateFormat : "dd-mm-yy"
    });

    (function ($) {

			$.scroller.themes.jqm = {
				defaults: {
					jqmBody: 'c',
					jqmHeader:'b',
					jqmWheel: 'd',
					jqmClickPick: 'c',
					jqmSet: 'b',
					jqmCancel: 'c'
				},
				
			}
		})(jQuery);  
  }

_this.dateScroller();  

};


resultsController.$inject = [];
app.controller('ResultsCtrl', resultsController);