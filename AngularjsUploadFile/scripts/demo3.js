/**
 * 示例1 直接绑定到 input
 */
var app3 = angular.module('app3', []);

app3.directive('clock', function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        template: '<div><p>HH:mm:ss = {{HH}}:{{mm}}:{{ss}}</p><p>HH = <input type="text" ng-model="HH" /></p><p>mm = <input type="text" ng-model="mm" /></p><p>ss = <input type="text" ng-model="ss" /></p></div >',
        scope: {
        },
        link: function (scope, element, attrs, ngModelController) {
            scope.HH = 1;
            scope.mm = 2;
            scope.ss = 3;

            // 将modelValue转换为viewModel
            //也就是将ng-model="xxx"里面的xxx，转换为directive里面的值
            ngModelController.$formatters.push(function (modelValue) {
                var items = modelValue.split('-');
                return {
                    a: items[0],
                    b: items[1],
                    c: items[2],
                }
            });

            // 将viewValue转化成modelValue
            //也就是将 directive里面的值转化为 ng-model="xxx"里面的xxx
            ngModelController.$parsers.push(function (viewValue) {

                var a = viewValue.a;
                var b = viewValue.b;
                var c = viewValue.c;

                return a + '-' + b + '-' + c;
            });

            // $render用于将viewValue渲染到指令的模板中
            ngModelController.$render = function () {
                scope.HH = ngModelController.$viewValue.a;
                scope.mm = ngModelController.$viewValue.b;
                scope.ss = ngModelController.$viewValue.c;
            };

            //监控指令模版里面的变量，当发生变化的时候，需要更新$viewValue
            scope.$watch('HH + mm + ss', function () {
                // $setViewValue用于更新viewValue
                ngModelController.$setViewValue({
                    a: scope.HH,
                    b: scope.mm,
                    c: scope.ss
                });
            });
        }
    }
})

app3.controller('controller3', function ($scope) {

    $scope.time = '11-22-33';
})

