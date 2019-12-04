function NgUploadFile($http) {

    return {
        restrict: 'E',
        require: '?ngModel',
        templateUrl: '/scripts/ng-upload-file.html',
        replace: true,
        scope: {},
        link: function (scope, element, attrs, ngModelController) {

            scope.items = [];

            var input = element.find('input[type="file"]');
            input.on('change', changed);

            function changed($event) {
                scope.$apply(function () {

                    var form = new FormData();
                    for (var i = 0; i < $event.target.files.length; i++) {
                        form.append('file-' + i, $event.target.files[i]);
                    }

                    var request = {
                        method: 'POST',
                        url: '/Home/Upload',
                        data: form,
                        headers: { 'Content-Type': undefined },
                        transformRequest: angular.identity
                    };

                    $http(request).then(callback);
                })
            }

            function callback(response) {
                scope.items = response.data.Items.map(v => ({ name: v }));
            }

            ngModelController.$formatters.push(function (modelValue) {
                if (modelValue == null) {
                    return [];
                }
                return modelValue.map(v => ({ name: v }));
            });

            ngModelController.$parsers.push(function (viewValue) {
                if (viewValue == null) {
                    return [];
                }
                return viewValue.map(v => v.name);
            });

            ngModelController.$render = function () {
                scope.items = ngModelController.$viewValue;
            }

            scope.$watch('items', function () {
                ngModelController.$setViewValue(scope.items);
            });
        }
    }
}