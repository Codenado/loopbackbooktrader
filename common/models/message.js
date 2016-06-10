module.exports = function (Message) {
    Message.beforeRemote('create', function (context, user, next) {
        context.args.data.senderId = context.req.accessToken.userId;
        console.log(context.args.data)
        next();
    });

};