/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const UpdateArea = require("../../interactors/update-area");
const areas = require("../../models/areas");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let createdArea = {};
let existentArea = {};

describe("UpdateArea", () => {
  beforeEach(async () => {
    await areas.Model.destroy({ where: {} });
    createdArea = await areas.Model.create({
      name: "Base area",
      description: "First area created",
    });
    existentArea = await areas.Model.create({
      name: "Existent area",
      description: "this was already in the database",
    });
  });

  describe("When context passed is correct", () => {
    it("updates an area", async () => {
      const newName = "New name for area";
      const newDescription = "Another info";
      const context = {
        area: createdArea,
        areaInfo: {
          name: newName,
          description: newDescription,
        },
      };

      const res = await UpdateArea.run(context);
      const areaFromDatabase = await areas.Model.findOne({
        where: {
          name: createdArea.name,
        },
      });

      expect(res).to.have.own.property("area");
      expect(res.area.name).to.eq(areaFromDatabase.name);
      expect(areaFromDatabase.name).to.eq(newName);
      expect(res.area.description).to.eq(areaFromDatabase.description);
      expect(areaFromDatabase.description).to.eq(newDescription);
    });
  });

  describe("When name from context is already in use", () => {
    it("doesn't update area", async () => {
      const newDescription = "Another info";
      const repeatedName = existentArea.name;
      const context = {
        area: createdArea,
        areaInfo: {
          description: newDescription,
          name: repeatedName,
        },
      };

      await UpdateArea.run(context).catch(async (error) => {
        const areaFromDatabase = await areas.Model.findOne({
          where: { description: newDescription },
        });

        expect(error).to.be.an("error");
        expect(areaFromDatabase).to.eq(null);
      });
    });
  });

  after(async () => {
    await areas.Model.destroy({ where: {} });
  });
});
