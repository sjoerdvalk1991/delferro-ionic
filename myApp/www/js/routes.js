var app = angular.module('starter', [
  'ionic',
  'app.controller',
  'goals.controller',
  'score.controller',
  'tips.controller',
  'tip.controller',
  'results.controller',
  'result.controller',
  'overview.controller',
  'movies.controller',
  'movie.controller',
  'data.controller',
  'feed.controller',
  'tip.services',
  'camera.services',
  'pickadate',
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

    .state('app.tips', {
      url:"/tips",
      views: {
        'menuContent' :{
          templateUrl: "js/states/tips/tips.html"
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

    .state('app.tip', {
      url:"/tip/:title",
      views: {
        'menuContent' :{
          templateUrl: "js/states/tips/tip.html"
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

    .state('app.feed',{
      url:"/feed",
      views: {
        'menuContent' : {
          templateUrl: "js/states/feed/feed.html"
        }
      }
    })

    .state('app.overview', {
      url:"/overview/:date",
      views: {
        'menuContent' : {
          templateUrl: "js/states/results/resultsoverview.html"
        }
      }
    })

    .state('app.movie', {
      url:"/movie/:value",
      views: {
        'menuContent' : {
          templateUrl: "js/states/movies/movie.html"
        }
      }
    })

    .state('app.goals', {
      url:"/goals",
      views: {
        'menuContent' : {
          templateUrl: "js/states/goal/goal.html"
        }
      }
    }) 

    .state('app.score', {
      url:"/score",
      views: {
        'menuContent' : {
          templateUrl: "js/states/score/score.html"
        }
      }
    }) 

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/data');
});

