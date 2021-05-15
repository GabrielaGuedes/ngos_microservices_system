const Interactor = require("interactor");
const files = require("../models/files");
const posts = require("../models/posts");

module.exports = class RemoveFilesFromPost extends Interactor {
  async run(context) {
    await this.savePost();
    await this.saveOldFiles();

    return files.Model.destroy({ where: { postId: this.context.post.id } })
      .then(() => {
        context.fileIds = [];
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }

  async savePost() {
    this.context.post = await posts.Model.findOne({
      where: { id: this.context.id },
    });
  }

  async saveOldFiles() {
    this.context.oldFiles = this.context.post.files;
  }

  async rollback() {
    await this.context.post.addFiles(this.context.oldFiles);
  }
};
