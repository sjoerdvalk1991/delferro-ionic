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
      templateUrl: "templates/menu.html",
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/results",
      views: {
        'menuContent' :{
          templateUrl: "templates/results.html",
        }
      }
    })

    .state('app.movies', {
      url:"/movies",
      views: {
        'menuContent' :{
          templateUrl: "templates/movies.html",
        }
      }
    })

    .state('app.result', {
      url:"/result",
      views: {
        'menuContent' :{
          templateUrl: "templates/result.html"
        }
      }  
    })

    .state('app.data', {
      url:"/data",
      views: {
        'menuContent' : {
          templateUrl: "templates/data.html"
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/results');
});

