angular
    .module('app')
    .factory('AuthService', ['Member', '$q', '$rootScope', "Message", function (User, $q
        , $rootScope, Message) {
        function login(username, password) {
            return User
                .login({
                    username: username
                    , password: password
                })
                .$promise
                .then(function (response) {
                    getEmail()
                    $rootScope.currentUser = {
                        id: response.user.username
                        , tokenId: response.id
                        , recieved: getEmail()
                    };
                });
        }

        function logout() {
            return User
                .logout()
                .$promise
                .then(function () {
                    $rootScope.currentUser = null;
                });
        }

        function register(userSpecs) {
            return User
                .create({
                    email: userSpecs.email
                    , password: userSpecs.password
                    , username: userSpecs.username
                    , about: userSpecs.about
                })
                .$promise;
        }

        function getEmail(username) {
            return Message.find({
                filter: {
                    where: {
                        recipientId: username
                    }

                }
            })
        }

        return {
            login: login
            , logout: logout
            , register: register
        };
            }]);