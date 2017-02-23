"use strict";

calculatorApp.controller('calculatorController', ['$scope', function($scope) {
    var result = 0;
    $scope.inputSequence = '';
    // var inputSequence = '';
    $scope.selectedInput = '';
    $scope.current = '0';
    var op = /[*+\-/]/;
    var ops = /[*+\-/]/g;

    $scope.clearAll = function() {
        result = 0;
        $scope.inputSequence = '';
        $scope.selectedInput = '';
        $scope.current = '0';
        // inputSequence = '';
    };

    $scope.clearLast = function() {
        // $scope.inputSequence = $scope.inputSequence.slice(0, -1);
        // inputSequence = inputSequence.slice(0, -1);
    };

    $scope.getValue = function(element) {
        $scope.selectedInput = element.currentTarget.value;
        $scope.inputSequence += $scope.selectedInput;
        // inputSequence += $scope.selectedInput;
        // console.log($scope.inputSequence);
    };

    $scope.$watch('inputSequence', function(newInput, oldInput) {
        if(newInput.length > oldInput.length) {
            if (!op.test($scope.selectedInput)) {
                if($scope.current === '0' || $scope.current === 'Syntax Error' || $scope.current === 'Math Error' || op.test(oldInput.slice(-1))) {
                    $scope.current = $scope.selectedInput;
                } else {
                    $scope.current += $scope.selectedInput;
                }
            } else {
                $scope.current = $scope.selectedInput;
            }
        }
        // else if (newInput.length < oldInput.length) {
        //     if(!op.test($scope.current)) {
        //         $scope.current = $scope.current.slice(0, -1);
        //         if($scope.current.length === 0) {
        //             if()
        //             $scope.current = '0';
        //         }
        //     } else {
        //         if(op.test(newInput.slice(-1))) {
        //             $scope.current = newInput.slice(-1);
        //         }
        //     }
        // }
        console.log($scope.current);
    });

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
        if (hasConsecutiveOperators || isStartWithOperator || isEndWithOperators || hasConsecutiveDecimalPoints) {
            result = 'Syntax Error';
            $scope.current = result;
            result = 0;
            $scope.inputSequence = '';
            // $scope.selectedInput = '';
        } else if (isDivideByZero) {
            result = 'Math Error';
            $scope.current = result;
            result = 0;
            $scope.inputSequence = '';
            // $scope.selectedInput = '';
        } else {
            var inputArray = $scope.inputSequence.split(op);
            var operators = $scope.inputSequence.match(ops);
            var hasDecimalPoint = /[\.]/;
            console.log(inputArray);
            console.log(operators);
            result = hasDecimalPoint.test(inputArray[0]) === true? parseFloat(inputArray[0]): parseInt(inputArray[0]);
            if(operators !== null) {
                for(var i = 0 ; i < operators.length; i++) {
                    var rightValue = hasDecimalPoint.test(inputArray[i + 1]) === true? parseFloat(inputArray[i + 1]): parseInt(inputArray[i + 1]);
                    if(operators[i] === '+') {
                        result += rightValue;
                    } else if (operators[i] === '-') {
                        result -= rightValue;
                    } else if (operators[i] === '*') {
                        result *= rightValue;
                    } else {
                        result /= rightValue;
                    }
                    result = Number(result.toFixed(4));
                }
            }

            $scope.current = result;
        }
    };
}]);
