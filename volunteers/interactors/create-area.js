const Interactor = require("interactor");
const Area = require("../models/areas");

module.exports = class CreateArea extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  async run(context) {
    return Area.Model.create(context.areaInfo)
      .then((result) => {
        context.area = result;
      })
      .catch((err) => {
        context.error = err;
        return Promise.reject(err);
      });
  }

  async rollback() {
    if (this.context.area) {
      await Area.Model.destroy({
        where: {
          id: this.context.area.id,
        },
      });
    }
  }
};
