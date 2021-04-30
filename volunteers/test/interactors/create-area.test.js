/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const CreateArea = require("../../interactors/create-area");
const areas = require("../../models/areas");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const baseArea = {
  name: "Base area",
  description: "cool area",
};

describe("CreateArea", () => {
  before(async () => {
    await areas.Model.destroy({ where: {} });
    await areas.Model.create(baseArea);
  });

  describe("When context passed is correct", () => {
    it("creates an area", async () => {
      const context = {
        name: "Correct area example",
        description: "",
      };

      const res = await CreateArea.run({ areaInfo: context });
      const areaFromDatabase = await areas.Model.findOne({
        where: {
          name: context.name,
        },
      });

      expect(res).to.have.own.property("area");
      expect(res.area.id).to.eq(areaFromDatabase.id);
      expect(areaFromDatabase.name).to.eq(context.name);
      expect(areaFromDatabase.description).to.eq(context.description);
    });
  });

  describe("When name from context is already in use", () => {
    it("doesn't create an area", async () => {
      const context = baseArea;
      const initialAreas = await areas.Model.findAll();

      const res = await CreateArea.run({ areaInfo: context })
        .then((result) => result)
        .catch((error) => error);

      const areasFromDatabase = await areas.Model.findAll();

      expect(res).to.be.an("error");
      expect(areasFromDatabase.length).to.eq(initialAreas.length);
    });
  });

  after(async () => {
    await areas.Model.destroy({ where: {} });
  });
});
