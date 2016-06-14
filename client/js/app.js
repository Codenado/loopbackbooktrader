angular
    .module('app', [
    'ui.router', 'lbServices'
  ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider
        , $urlRouterProvider) {
        $stateProvider
            .state('add-book', {
                url: '/add-book'
                , templateUrl: 'views/book-form.html'
                , controller: 'AddBookController'
                , authenticate: true
            })
            .state('all-books', {
                url: '/all-books'
                , templateUrl: 'views/all-books.html'
                , controller: 'AllBooksController'
            })
            .state('book', {
                url: '/book/:title'
                , templateUrl: 'views/book.html'
                , controller: 'BookController'
            })
            .state('search', {
                url: '/search?q'
                , templateUrl: 'views/search.html'
                , controller: 'SearchController'
            })
            .state('forbidden', {
                url: '/forbidden'
                , templateUrl: 'views/forbidden.html'
            , })
            .state('login', {
                url: '/login'
                , templateUrl: 'views/login.html'
                , controller: 'AuthLoginController'
            })
            .state('logout', {
                url: '/logout'
                , controller: 'AuthLogoutController'
            })
            .state('member', {
                url: '/u/:id'
                , templateUrl: 'views/member.html'
                , controller: 'MemberController'
            })
            .state('sign-up', {
                url: '/sign-up'
                , templateUrl: 'views/sign-up.html'
                , controller: 'SignUpController'
            , })
            .state('sign-up-success', {
                url: '/sign-up/success'
                , templateUrl: 'views/sign-up-success.html'
            })
            .state('messages', {
                url: '/u/:id/messages'
                , templateUrl: 'views/messages.html'
                , controller: 'MessagesController'
            });
        $urlRouterProvider.otherwise('all-books');
  }])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            // redirect to login page if not logged in
            if (next.authenticate && !$rootScope.currentUser) {
                event.preventDefault(); //prevent current page from loading
                $state.go('forbidden');
            }
        });
  }]);