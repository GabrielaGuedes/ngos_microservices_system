const Interactor = require("interactor");
const DestroyArea = require("./destroy-area");
const RemoveEmployeesFromArea = require("./remove-employees-from-area");

module.exports = class DestroyAreaOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [RemoveEmployeesFromArea, DestroyArea];
  }
};
