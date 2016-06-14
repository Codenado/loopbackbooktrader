module.exports = function (Book) {
    Book.beforeRemote('create', function (context, user, next) {
        context.args.data.ownerId = context.req.accessToken.userId;
        next();
    });

    Book.trade = function (message, cb) {

        Book.find({
                where: {
                    or: [{
                        title: 'something'
                        }, {
                        title: 'muh book'
                        }]
                }


            }
            , function (e, books) {

//                books[0].ownerId = 'george'
    //                books[0].save()
                response = books
                cb(null, response)

            })



        function findBooks(title) {
            return Book.findOne()
        }

    }



    Book.remoteMethod(
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