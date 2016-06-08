angular
  .module('app')
  .controller('AuthLoginController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.user = {
    };

    $scope.login = function() {
      AuthService.login($scope.user.email, $scope.user.password)
      .then(function(review) {
        $state.go('all-books');
      });
    };
  }])
  .controller('AuthLogoutController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    AuthService.logout()
      .then(function() {

      });
  }])
  .controller('SignUpController', ['$scope', 'AuthService', '$state',
      function($scope, AuthService, $state) {
    $scope.user = {

    };

    $scope.register = function() {
      AuthService.register($scope.user)
        .then(function() {
          $state.transitionTo('sign-up-success');
        });
    };
  }]);
