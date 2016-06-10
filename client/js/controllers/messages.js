angular
    .module('app')
    .controller('MessagesController', ['$scope', 'Message', '$rootScope', function ($scope
        , Message, $rootScope) {
        $scope.sent = getSent()
        $scope.recived = getRecived()

        console.log($scope.recived)
        console.log($scope.sent)

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