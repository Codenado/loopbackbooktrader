angular
    .module('app')
    .controller('MessagesController', ['$scope', 'Message', '$rootScope', function ($scope
        , Message, $rootScope) {
        $scope.messages = getSent()


        console.log($scope.messages)

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