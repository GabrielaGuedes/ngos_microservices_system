const Interactor = require("interactor");
const UpdateArea = require("./update-area");
const SetVolunteersForArea = require("./set-volunteers-for-area");

module.exports = class UpdateAreaOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [UpdateArea, SetVolunteersForArea];
  }
};
