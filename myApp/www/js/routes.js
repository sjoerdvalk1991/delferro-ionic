var app = angular.module('starter', [
  'ionic',
  'app.controller',
  'results.controller',
  'result.controller',
  'movies.controller',
  'data.controller',
 ]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "js/inc/menu/menu.html",
    })

    .state('app.browse', {
      url: "/results",
      views: {
        'menuContent' :{
          templateUrl: "js/states/results/results.html",
        }
      }
    })

    .state('app.movies', {
      url:"/movies",
      views: {
        'menuContent' :{
          templateUrl: "js/states/movies/movies.html",
        }
      }
    })

    .state('app.result', {
      url:"/result/:date",
      views: {
        'menuContent' :{
          templateUrl: "js/states/results/result.html"
        }
      }  
    })

    .state('app.data', {
      url:"/data",
      views: {
        'menuContent' : {
          templateUrl: "js/states/data/data.html"
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/data');
});

