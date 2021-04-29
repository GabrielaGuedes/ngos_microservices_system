const Interactor = require("interactor");

module.exports = class UpdateTeam extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return context.team
      .update(context.teamInfo)
      .then((result) => {
        context.team = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }
};
