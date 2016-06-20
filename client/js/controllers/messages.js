angular
    .module('app')
    .controller('MessagesController', ['$scope', 'Message', '$rootScope', function ($scope
        , Message, $rootScope) {
        $scope.messages = getSent()

        function getSent() {
            return Message.find({
                filter: {
                    where: {
                        senderId: $rootScope.currentUser.id
                    }
                }
            })
        }

        function getRecived() {
            return Message.find({
                filter: {
                    where: {
                        recipientId: $rootScope.currentUser.id
                    }
                }
            })
        }
    }])
    .controller('DeleteMessageController', ['$scope', 'Message', '$state', '$stateParams'
                                            , function ($scope, Message, $state, $stateParams) {
            Message
                .deleteById({
                    id: $stateParams.id
                })
                .$promise
                .then(function () {
                    $state.go('messages');
                });
  }])