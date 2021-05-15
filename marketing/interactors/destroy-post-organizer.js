const Interactor = require("interactor");
const RemoveFilesFromPost = require("./remove-files-from-post");
const DestroyPost = require("./destroy-post");

module.exports = class DestroyPostOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [RemoveFilesFromPost, DestroyPost];
  }
};
