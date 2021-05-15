const Interactor = require("interactor");
const posts = require("../models/posts");

module.exports = class UpdatePost extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return posts.Model.destroy({ where: { id: context.id } })
      .then(() => {
        context.success = true;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }
};
