const Interactor = require("interactor");
const teams = require("../models/teams");

module.exports = class DestroyTeam extends Interactor {
  async run(context) {
    return teams.Model.destroy({ where: { id: this.context.id } })
      .then(() => {
        context.success = true;
      })
      .catch((error) => {
        context.error = error;
        return Promise.reject(error);
      });
  }
};
