angular
    .module('app').filter("averageReview", function () {
        return function (book) {
            var number = 0
            $.each(book.reviews, function (i, review) {
                number += review.rating
            })
            return number / book.reviews.length * 10;
        }
    }).filter("inbox", ['$rootScope', function ($rootScope) {
        return function () {
            if ($rootScope.currentUser) {
                return $rootScope.currentUser.recieved.length
            }
        }
    }])
    .controller('AllBooksController', ['$scope', 'Book', 'Member', function ($scope
        , Book, Member) {
        $scope.books = Book.find({
            filter: {
                include: 'reviews'
            }
        })
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
                , include: 'reviews'
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
    .controller('BookController', ['$scope', 'Book', '$stateParams', '$http', '$rootScope', 'Review', 'Message', function ($scope
        , Book, $stateParams, $http, $rootScope, Review, Message) {
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
                    , include: 'reviews'
                }

            });
        }

        $scope.sendMessage = function () {
            Message.create({
                text: $scope.message.text
                , recipientId: $scope.book.ownerId
                , senderBookId: $scope.message.senderBook
                , recipientBookId: $scope.book.title

            })
            $scope.message = {}
        }
    }])
    .controller('MemberController', ['$scope', 'Member', '$rootScope', '$stateParams', '$http', function ($scope, Member, $rootScope, $stateParams, $http) {
        console.log($rootScope.recivied)
        $http.get("/api/members/getProfile?username=" + $stateParams.id)
            .then(function (response) {
                $scope.member = response.data.profile;
            })

  }]);