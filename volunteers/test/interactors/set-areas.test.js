/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const SetAreas = require("../../interactors/set-areas");
const volunteers = require("../../models/volunteers");
const areas = require("../../models/areas");
const areaVolunteers = require("../../models/area-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteer = {};
let areasCreated = [];

describe("SetAreas", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    const newAreas = [];
    volunteer = await volunteers.Model.create({
      name: "Base volunteer",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      birthDate: "1990-01-01",
      phone: 5511999999999,
      email: "add_area_test@example.com",
      additionalInfo: "no more info",
    });
    newAreas.push(
      await areas.Model.create({
        name: "Area 1",
        description: "Area 1 very cool",
      })
    );
    newAreas.push(
      await areas.Model.create({
        name: "Area 2",
        description: "Area 2 not so cool",
      })
    );
    areasCreated = newAreas;
  });

  describe("When context passed is correct", () => {
    it("adds areas to volunteer", async () => {
      const context = {
        volunteer,
        areaIds: [areasCreated[0].id],
      };

      const res = await SetAreas.run(context);
      const relationsFromDatabase = await areaVolunteers.Model.findAll();

      expect(res.volunteer.dataValues).to.have.own.property("areaIds");
      expect(res.volunteer.dataValues.areaIds).to.have.same.members([
        areasCreated[0].id,
      ]);
      expect(relationsFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 area", () => {
    it("add all the areas", async () => {
      const context = {
        volunteer,
        areaIds: areasCreated.map((area) => area.id),
      };

      const res = await SetAreas.run(context);
      const relationsFromDatabase = await areaVolunteers.Model.findAll();

      expect(res.volunteer.dataValues).to.have.own.property("areaIds");
      expect(res.volunteer.dataValues.areaIds).to.have.same.members(
        areasCreated.map((area) => area.id)
      );
      expect(relationsFromDatabase.length).to.eq(areasCreated.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add areas", async () => {
      const context = {
        volunteer,
        areaIds: [],
      };

      const res = await SetAreas.run(context);
      const relationsFromDatabase = await areaVolunteers.Model.findAll();

      expect(res.volunteer.dataValues).to.have.own.property("areaIds");
      expect(res.volunteer.dataValues.areaIds).to.have.same.members([]);
      expect(relationsFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
