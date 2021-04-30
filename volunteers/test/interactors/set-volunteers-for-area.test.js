/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const SetVolunteersForArea = require("../../interactors/set-volunteers-for-area");
const volunteers = require("../../models/volunteers");
const areas = require("../../models/areas");
const areaVolunteers = require("../../models/area-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let area = {};
let volunteersCreated = [];

describe("SetVolunteersForArea", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    const newVolunteers = [];
    area = await areas.Model.create({
      name: "Area 1",
      description: "Area 1 very cool",
    });
    newVolunteers.push(
      await volunteers.Model.create({
        name: "Base volunteer 1",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "set_volunteer_for_area_test_1@example.com",
        additionalInfo: "no more info",
      })
    );
    newVolunteers.push(
      await volunteers.Model.create({
        name: "Base volunteer 2",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "set_volunteer_for_area_test_2@example.com",
        additionalInfo: "no more info",
      })
    );
    volunteersCreated = newVolunteers;
  });

  describe("When context passed is correct", () => {
    it("adds volunteers to area", async () => {
      const context = {
        area,
        volunteerIds: [volunteersCreated[0].id],
      };

      const res = await SetVolunteersForArea.run(context);
      const relationsFromDatabase = await areaVolunteers.Model.findAll();

      expect(res.area.dataValues).to.have.own.property("volunteerIds");
      expect(res.area.dataValues.volunteerIds).to.have.same.members([
        volunteersCreated[0].id,
      ]);
      expect(relationsFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 volunteer", () => {
    it("add all the volunteers", async () => {
      const context = {
        area,
        volunteerIds: volunteersCreated.map((volunteer) => volunteer.id),
      };

      const res = await SetVolunteersForArea.run(context);
      const relationsFromDatabase = await areaVolunteers.Model.findAll();

      expect(res.area.dataValues).to.have.own.property("volunteerIds");
      expect(res.area.dataValues.volunteerIds).to.have.same.members(
        volunteersCreated.map((volunteer) => volunteer.id)
      );
      expect(relationsFromDatabase.length).to.eq(volunteersCreated.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add volunteers", async () => {
      const context = {
        area,
        volunteerIds: [],
      };

      const res = await SetVolunteersForArea.run(context);
      const relationsFromDatabase = await areaVolunteers.Model.findAll();

      expect(res.area.dataValues).to.have.own.property("volunteerIds");
      expect(res.area.dataValues.volunteerIds).to.have.same.members([]);
      expect(relationsFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
  });
});
