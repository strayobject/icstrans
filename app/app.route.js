var icsTransRoutes = angular.module('icsTransRoutes', ['ngRoute']);

icsTransRoutes.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/components/morse/morseView.html',
        controller: 'morseCtrl'
      })
      .when('/morse', {
        templateUrl: 'app/components/morse/morseView.html',
        controller: 'morseCtrl'
      })
      .when('/semaphore', {
        templateUrl: 'app/components/semaphore/semaphoreView.html',
        controller: 'semaphoreCtrl'
      })
      .when('/flag', {
        templateUrl: 'app/components/flag/flagView.html',
        controller: 'flagCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);