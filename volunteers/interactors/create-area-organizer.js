const Interactor = require("interactor");
const CreateArea = require("./create-area");
const SetEmployeesForArea = require("./set-employees-for-area");

module.exports = class CreateAreaOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [CreateArea, SetEmployeesForArea];
  }
};
