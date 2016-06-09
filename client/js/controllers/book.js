angular
    .module('app')
    .controller('AllBooksController', ['$scope', 'Book', function ($scope
        , Book) {
        $scope.books = Book.find(filter: {
            where: {
                title: $stateParams.title
            }
            , include: ['owner', 'reviews']
        });

  }])
    .controller('SearchController', ['$scope', 'Book', '$stateParams', function ($scope
        , Book, $stateParams) {
        $scope.books = Book.find({
            filter: {
                where: {
                    title: {
                        "regexp": $stateParams.q
                    }
                }
                , include: ['owner', 'reviews']
            }
        });

  }])
    .controller('AddBookController', ['$scope', 'Book', '$state', function ($scope, Book, $state) {
        $scope.action = 'Add';

        $scope.book = {};
        $scope.isDisabled = false;

        $scope.submitForm = function () {

            Book
                .create({
                    title: $scope.book.title
                    , description: $scope.book.description
                    , pages: $scope.book.pages
                })
                .$promise
                .then(function () {

                    $state.go('all-books');
                });
        };
  }])
    .controller('BookController', ['$scope', 'Book', '$stateParams', '$http', '$rootScope', 'Review', function ($scope
        , Book, $stateParams, $http, $rootScope, Review) {
        $scope.range = function (n) {
            return new Array(n);
        };
        getBook()
        $scope.getMyBooks = function () {
            $http.get("/api/members/getProfile?username=" + $rootScope.currentUser.id)
                .then(function (response) {
                    $scope.myBooks = response.data.profile.books;
                })
        }
        $scope.addReview = function () {
            Review.create({
                comments: $scope.review.comments
                , rating: $scope.review.rating
                , bookId: $scope.book.title
            })
            getBook()
            $scope.review = {}
        }



        function getBook() {
            $scope.book = Book.findOne({
                filter: {
                    where: {
                        title: $stateParams.title
                    }
                    , include: ['owner', 'reviews']
                }
            });
        }

  }])


.controller('MemberController', ['$scope', 'Member', '$rootScope', '$stateParams', '$http', function ($scope, Member, $rootScope, $stateParams, $http) {
    console.log($stateParams.id)
    $http.get("/api/members/getProfile?username=" + $stateParams.id)
        .then(function (response) {
            $scope.member = response.data.profile;
        })

  }]);