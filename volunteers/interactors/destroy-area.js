const Interactor = require("interactor");
const areas = require("../models/areas");

module.exports = class DestroyArea extends Interactor {
  async run(context) {
    return areas.Model.destroy({ where: { id: this.context.id } })
      .then(() => {
        context.success = true;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }
};
