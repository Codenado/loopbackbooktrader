angular
  .module('app')
  .controller('AllBooksController', ['$scope', 'Book',  function($scope,
      Book) {
    $scope.books = Book.find();
  }])
    .controller('SearchController', ['$scope', 'Book', '$stateParams', function($scope,
      Book, $stateParams) {
  $scope.books = Book.find({
        filter: {
            where: {
            title: {"regexp": $stateParams.q}
        },
        include:
          'owner'
        }});
        console.log($stateParams)
  }])
  .controller('AddBookController', ['$scope', 'Book',
      '$state', function($scope, Book, $state) {
    $scope.action = 'Add';

    $scope.book = {};
    $scope.isDisabled = false;



    $scope.submitForm = function() {
        console.log($scope.book)
      Book
        .create({
          title: $scope.book.title,
          description: $scope.book.description,
          pages:  $scope.book.pages
        })
        .$promise
        .then(function() {
          
          $state.go('all-books');
        });
    };
  }])
  .controller('BookController', ['$scope', 'Book', '$stateParams',  function($scope,
      Book, $stateParams) {
    $scope.book = Book.findOne({
        filter: {
            where: {
            title: $stateParams.title
        },
        include:
          'owner'
        }});
      console.log($scope.book)
     // console.log($stateParams.title)
  }])    


  .controller('MemberController', ['$scope', 'Member', '$rootScope', '$stateParams', '$http',
      function($scope, Member, $rootScope, $stateParams, $http) {
         console.log($stateParams.id)
   $http.get("/api/members/getProfile?username=" + $stateParams.id)
    .then(function(response) {
        $scope.member = response.data.profile;
        console.log($scope.member)
   })
  
  }]);
