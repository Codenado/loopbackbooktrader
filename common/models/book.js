module.exports = function(Book) {
    Book.beforeRemote('create', function(context, user, next) {
    context.args.data.ownerId = context.req.accessToken.userId;
    next();
  });

};
