const Interactor = require("interactor");
const volunteers = require("../models/volunteers");

module.exports = class DestroyVolunteer extends Interactor {
  async run(context) {
    return volunteers.Model.destroy({ where: { id: this.context.id } })
      .then(() => {
        context.success = true;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }
};
