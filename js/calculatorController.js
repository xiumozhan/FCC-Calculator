"use strict";

calculatorApp.controller('calculatorController', ['$scope', function($scope) {
    var result = 0;
    $scope.inputSequence = '';
    var inputSequence = '';
    $scope.selectedInput = '';
    $scope.current = 0;
    var op = /[*+\-/]/;
    var ops = /[*+\-/]/g;

    $scope.clearAll = function() {
        result = 0;
        $scope.inputSequence = '';
        $scope.selectedInput = '';
        $scope.current = 0;
        inputSequence = '';
    };

    $scope.clearLast = function() {
        $scope.inputSequence = $scope.inputSequence.slice(0, -1);
        inputSequence = inputSequence.slice(0, -1);
    };

    $scope.getValue = function(element) {
        $scope.selectedInput = element.currentTarget.value;
        $scope.inputSequence += $scope.selectedInput;
        inputSequence += $scope.selectedInput;
        // console.log($scope.inputSequence);
    };

    $scope.$watch('inputSequence', function(newInput, oldInput) {
        if(!op.test($scope.selectedInput)) {
            if($scope.current === '0' || $scope.current === 'Syntax Error' || $scope.current === 'Math Error' || op.test(oldInput.slice(-1))) {
                $scope.current = $scope.selectedInput;
            } else {
                $scope.current += $scope.selectedInput;
            }
        } else {
            $scope.current = $scope.selectedInput;
        }
        console.log($scope.current);
    });

    $scope.computeInput = function() {
        var consecutiveOperators = /([*+\-/.])\1+/g;
        var consecutiveDecimalPoints = /[.][0-9]*[.]/g;
        var startWithOperator = /^[*+\-/.]+/;
        var endWithOperator = /[*+\-/.]$/;
        var divideByZero = /(\/0)/g;
        var hasConsecutiveOperators = consecutiveOperators.test(inputSequence);
        var isStartWithOperator = startWithOperator.test(inputSequence);
        var isEndWithOperators = endWithOperator.test(inputSequence);
        var isDivideByZero = divideByZero.test(inputSequence);
        var hasConsecutiveDecimalPoints = consecutiveDecimalPoints.test(inputSequence);
        if(hasConsecutiveOperators || isStartWithOperator || isEndWithOperators || hasConsecutiveDecimalPoints) {
            result = 'Syntax Error';
            $scope.current = result;
            result = 0;
            inputSequence = '';
            // $scope.selectedInput = '';
        } else if (isDivideByZero) {
            result = 'Math Error';
            $scope.current = result;
            result = 0;
            inputSequence = '';
            // $scope.selectedInput = '';
        } else {
            var inputArray = inputSequence.split(op);
            var operators = inputSequence.match(ops);
            console.log(inputArray);
            console.log(operators);

        }
    };
}]);
