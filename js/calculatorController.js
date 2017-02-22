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
        $scope.inputSequence += $scope.selectedInput;
        console.log($scope.inputSequence);
    };

    $scope.computeInput = function() {
        var consecutiveOperators = /([*+\-/.])\1+/g;
        var consecutiveDecimalPoints = /[.][0-9]*[.]/g;
        var startWithOperator = /^[*+\-/.]+/;
        var endWithOperator = /[*+\-/.]$/;
        var divideByZero = /(\/0)/g;
        var hasConsecutiveOperators = consecutiveOperators.test($scope.inputSequence);
        var isStartWithOperator = startWithOperator.test($scope.inputSequence);
        var isEndWithOperators = endWithOperator.test($scope.inputSequence);
        var isDivideByZero = divideByZero.test($scope.inputSequence);
        var hasConsecutiveDecimalPoints = consecutiveDecimalPoints.test($scope.inputSequence);
        if(hasConsecutiveOperators || isStartWithOperator || isEndWithOperators || hasConsecutiveDecimalPoints) {
            $scope.result = 'Syntax Error';
        } else if (isDivideByZero) {
            $scope.result = 'Math Error';
        } else {
            var op = /[*+\-/]/;
            var ops = /[*+\-/]/g;
            var inputArray = $scope.inputSequence.split(op);
            var operators = $scope.inputSequence.match(ops);
            console.log(inputArray);
            console.log(operators);
        }
    };
}]);
