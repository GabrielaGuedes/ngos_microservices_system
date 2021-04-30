const Interactor = require("interactor");

module.exports = class UpdateArea extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return context.area
      .update(context.areaInfo)
      .then((result) => {
        context.area = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }
};
