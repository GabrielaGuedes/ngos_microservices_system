const Interactor = require("interactor");
const RemoveFilesFromPost = require("./remove-files-from-post");
const SetFilesToPost = require("./set-files-to-post");
const UpdatePost = require("./update-post");

module.exports = class UpdatePostOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [RemoveFilesFromPost, SetFilesToPost, UpdatePost];
  }
};
