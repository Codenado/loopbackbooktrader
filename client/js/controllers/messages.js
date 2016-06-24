angular
    .module('app')
    .controller('MessagesController', ['$scope', 'Message', '$rootScope', '$http', function ($scope
        , Message, $rootScope, $http) {
        $scope.messages = getRecived()

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

        $scope.trade = function (message) {
            console.log(message)
            $http.post('/api/messages/trade', {
                message: message.id
            })
            $scope.messages = getRecived()
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