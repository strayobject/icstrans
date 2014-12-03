var iccTransControllers = angular.module('iccTransControllers', []);

iccTransControllers.controller('morseCtrl', [
    '$scope', 
    '$http', 
    function($scope, $http) {
        $http.get('/data/morse.json')
        .success(function(data) {
            $scope.code = data;
        })
        .error(function() {
            // do sth
        });

        $scope.icoTrans = {
            phrase: ""
        }
    }
]);