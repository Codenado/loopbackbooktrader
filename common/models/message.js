module.exports = function (Message) {
    Message.beforeRemote('create', function (context, user, next) {
        context.args.data.senderId = context.req.accessToken.userId;
        next();
    });

    Message.beforeRemote('trade', function (context, user, next) {
        console.log('hello')
        next();
    });

    Message.trade = function (message, cb) {
        Message.findOne({
                where: {
                    id: "575eef0ff572e5f00103f38d"
                }
                , include: {
                    relation: 'senderBook', // include the owner object
                    scope: { // further filter the owner object
                        fields: ['title', 'pages', 'ownerId'] // only show two fields
                    }
                }
            }
            , function (e, message) {
                message.senderBook.title = 'tiger'
                    //                books[0].ownerId = 'george'
                    //                books[0].save()
                message.senderBook.update({
                    ownerId: "tiger"
                })
                response = message
                cb(null, response)

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
                , type: 'object'

            }
            , returns: {
                arg: 'profile'
                , type: 'json'
            }
        }
    );

};