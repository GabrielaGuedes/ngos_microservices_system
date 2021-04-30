const Interactor = require("interactor");
const DestroyArea = require("./destroy-area");
const RemoveVolunteersFromArea = require("./remove-volunteers-from-area");

module.exports = class DestroyAreaOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [RemoveVolunteersFromArea, DestroyArea];
  }
};
