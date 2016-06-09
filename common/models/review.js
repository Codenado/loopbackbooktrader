module.exports = function (Review) {
    Review.beforeRemote('create', function (context, user, next) {
        context.args.data.date = Date.now();
        context.args.data.memberId = context.req.accessToken.userId;
        console.log(context.args.data)
        next();
    });
};