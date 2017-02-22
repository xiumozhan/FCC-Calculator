"use strict";

calculatorApp.controller('calculatorController', ['$scope', function($scope) {
    $scope.result = 0;
    $scope.inputSequence = '';
    $scope.selectedInput = '';

    $scope.clearAll = function() {
        $scope.result = 0;
        $scope.inputSequence = '';
    };

    $scope.clearLast = function() {
        $scope.inputSequence = $scope.inputSequence.slice(0, -1);
    };

    $scope.getValue = function(element) {
        $scope.selectedInput = element.currentTarget.value;
    };
}]);
