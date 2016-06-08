angular
  .module('app')
  .controller('AllBookssController', ['$scope', 'Book',  function($scope,
      Book) {
    $scope.tacks = Book.find();
  }])
  .controller('AddBookController', ['$scope', 'Book',
      '$state', function($scope, Book, $state) {
    $scope.action = 'Add';

    $scope.book = {};
    $scope.isDisabled = false;



    $scope.submitForm = function() {
      Tack
        .create({
          title: $scope.book.name,
          description: $scope.book.description,
          pages: $scope.book.pages
        })
        .$promise
        .then(function() {
          $state.go('all-books');
        });
    };
  }])
  .controller('MemberController', ['$scope', 'Member', '$rootScope', '$stateParams', 'Book',
      function($scope, Tacker, $rootScope, $stateParams, Book) {
    $scope.tacker = Tacker.find({
      filter: {
        where: {
          username: $stateParams.id
        },
        include:
          'books'
        }
    });
  }]);
