var icsTransControllers = angular.module('icsTransControllers', []);

icsTransControllers.controller('mainCtrl', [
  '$scope', '$location', '$http',
  function ($scope, $location, $http) {
    $scope.phrase   = '';
    $scope.title    = '';
    $scope.options  = {};
    $scope.year = (new Date).getFullYear();

    $scope.isActive = function(item) {
      return item.path === $location.path();
    };
    $scope.links = [
     {path: '/morse', label: 'Morse'},
     {path: '/flag', label: 'Flag'},
     {path: '/semaphore', label: 'Semaphore'}
    ];

    $scope.phonetic = true;
    $scope.showPhonetic = function (state) {
      $scope.phonetic = state;
      $scope.options.phonetic = state;
    };

    $http.get('/data/phonetic.json')
      .success(function (data) {
        $scope.phoneticCode = data;
      })
      .error(function () {

      }).then(function() {
        $scope.options = {
          phonetic: $scope.phonetic,
          phoneticCode: $scope.phoneticCode
        };
      });

    $('article').css({'min-height': (window.innerHeight - 270) + 'px'});

    $http.get('changelog')
      .success(function (data) {
        $scope.version = data.substring(0,5);
      })
      .error(function () {

      });
  }
]);

icsTransControllers.controller('morseCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $http.get('/data/morse.json')
      .success(function (data) {
        $scope.code = data;
        $scope.options.code = data;
      })
      .error(function () {
        // do sth
      });
    $scope.$parent.title = 'Morse Code';
    $scope.page = 'morse';
  }
]);

icsTransControllers.controller('semaphoreCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $http.get('/data/semaphore.json')
      .success(function (data) {
        $scope.code = data;
        $scope.options.code = data;
      })
      .error(function () {
        // do sth
      });
    $scope.$parent.title = 'Semaphore Code';
    $scope.page = 'semaphore';
  }
]);

icsTransControllers.controller('flagCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $http.get('/data/flag.json')
      .success(function (data) {
        $scope.code = data;
        $scope.options.code = data;
      })
      .error(function () {
        // do sth
      });
    $scope.$parent.title = 'Flag Code';
    $scope.page = 'flag';
  }
]);