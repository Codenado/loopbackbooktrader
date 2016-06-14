module.exports = function (Member) {
    Member.getProfile = function (username, cb) {

        Member.findOne({
            where: {
                username: username
            }
            , include: 'books'
            , fields: {
                email: false
            }
        }, function (err, instance) {
            var response = instance

            cb(null, response);
        })


    }



    Member.remoteMethod(
        'getProfile', {
            http: {
                path: '/getProfile'
                , verb: 'get'
            }
            , accepts: {
                arg: 'username'
                , type: 'string'
                , http: {
                    source: 'query'
                }
            }
            , returns: {
                arg: 'profile'
                , type: 'json'
            }
        }
    );
};