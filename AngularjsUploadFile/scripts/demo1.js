/**
 * 示例1 直接绑定到 input
 */
var app1 = angular.module('app1', []);

app1.directive('input', function () {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            ngChange: '&',
            type: '@'
        },
        link: function (scope, element, attrs) {
            if (scope.type.toLowerCase() != 'file') {
                return;
            }
            element.bind('change', function () {
                let files = element[0].files;
                scope.ngModel = files;
                scope.$apply();
                scope.ngChange();
            });
        }
    }
})

app1.controller('controller1', function ($scope) {

    $scope.doFileChange = function () {
        console.log("doFileChange:", $scope.items);
    }

    $scope.doSubmit = function () {
        console.log("Submit File:", $scope.items);
    }
})

