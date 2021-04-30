const Interactor = require("interactor");
const CreateArea = require("./create-area");
const SetVolunteersForArea = require("./set-volunteers-for-area");

module.exports = class CreateAreaOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [CreateArea, SetVolunteersForArea];
  }
};
