module.exports = function (Message) {
    Message.beforeRemote('create', function (context, user, next) {
        context.args.data.senderId = context.req.accessToken.userId;
        next();
    });

    //    Message.beforeRemote('trade', function (context, user, next) {
    //        next();
    //    });

    Message.trade = function (message, cb) {
        Message.findOne({
                where: {
                    id: message
                }
                , include: ['senderBook', 'recipientBook']

                //                , include: {
                //                    relation: ['senderBook', 'recientBook'], // include the owner object
                //                    scope: { // further filter the owner object
                //                        fields: ['title', 'pages', 'ownerId'] // only show two fields
                //                    },


            }
            , function (e, message) {
                console.log(message)
                message.senderBook.update({
                    ownerId: message.recipientId
                })
                message.recipientBook.update({
                    ownerId: message.senderId
                })
                response = 'trade complete'
                cb(null, response)
                message.delete()
            })

    }

    Message.remoteMethod(
        'trade', {
            http: {
                path: '/trade'
                , verb: 'post'
            }
            , accepts: {
                arg: 'message'
                , type: 'string'
            }
            , returns: {
                arg: 'profile'
                , type: 'json'
            }
        }
    );

};