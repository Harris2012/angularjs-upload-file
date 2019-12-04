/**
 * 示例2 定义新的directive
 */
var app2 = angular.module('app2', []);

app2.directive("ngUploadFile", NgUploadFile);

app2.controller('controller2', function ($scope) {

    $scope.apples = [];

    $scope.count = 0;

    $scope.add = function () {

        $scope.count++;
        var items = [];
        for (var i = 0; i < $scope.count; i++) {
            items.push(i);
        }
        $scope.apples = items;
    }
});
