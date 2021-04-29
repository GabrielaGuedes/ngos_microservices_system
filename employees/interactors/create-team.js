const Interactor = require("interactor");
const Team = require("../models/teams");

module.exports = class CreateTeam extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return Team.Model.create(context.teamInfo)
      .then((result) => {
        context.team = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }

  async rollback() {
    if (this.context.team) {
      await Team.Model.destroy({
        where: {
          id: this.context.team.id,
        },
      });
    }
  }
};
