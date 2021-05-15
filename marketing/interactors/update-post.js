const Interactor = require("interactor");

module.exports = class UpdatePost extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return context.post
      .update(context.postInfo)
      .then((result) => {
        context.post = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }
};
