const Interactor = require("interactor");
const files = require("../models/files");

module.exports = class SetFilesToPost extends Interactor {
  async run(context) {
    this.context.oldFiles = await context.post.getFiles();

    return files.Model.bulkCreate(
      context.filePaths.map((path) => ({ ...path, postId: context.post.id }))
    )
      .then(() => {
        context.post.dataValues.files = context.filePaths;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async rollback() {
    await this.context.post.setFiles(this.context.oldFiles);
  }
};
