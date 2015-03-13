var app = angular.module('results.controller', ['app.controller']);

var resultsController = function(){
  var _this = this;
  _this.results = JSON.parse(localStorage.getItem('dailyData'));

  this.dateScroller = function(){     
    $('#demo').mobiscroll().date({
        invalid: { daysOfWeek: [0, 6], daysOfMonth: ['5/1', '12/24', '12/25'] },
        theme: 'android-ics',
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
				init: function(elm, inst) {
					var s = inst.settings;
					$('.dw', elm).removeClass('dwbg').addClass('ui-overlay-shadow ui-corner-all ui-body-a');
					$('.dwb-s a', elm).attr('data-role', 'button').attr('data-theme', s.jqmSet);
					$('.dwb-c a', elm).attr('data-role', 'button').attr('data-theme', s.jqmCancel);
					$('.dwwb', elm).attr('data-role', 'button').attr('data-theme', s.jqmClickPick);
					$('.dwv', elm).addClass('ui-header ui-bar-' + s.jqmHeader);
					$('.dwwr', elm).addClass('ui-body-' + s.jqmBody);
					$('.dwpm .dww', elm).addClass('ui-body-' + s.jqmWheel);
					if (s.display != 'inline')
					$('.dw', elm).addClass('pop in');
					elm.trigger('create');
					// Hide on overlay click
					$('.dwo', elm).click(function() { inst.hide(); });
				}
			}
		})(jQuery);  
  }

_this.dateScroller();  

};


resultsController.$inject = [];
app.controller('ResultsCtrl', resultsController);