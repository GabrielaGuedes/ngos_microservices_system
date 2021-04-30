/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveAreasFromVolunteer = require("../../interactors/remove-areas-from-volunteer");
const volunteers = require("../../models/volunteers");
const areas = require("../../models/areas");
const areaVolunteers = require("../../models/area-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteerCreatedWithAreas = {};
let volunteerCreatedWithoutAreas = {};

describe("RemoveAreasFromVolunteer", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    volunteerCreatedWithAreas = await volunteers.Model.create(
      {
        name: "Base volunteer",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        birthDate: "1990-01-01",
        phone: 5511999999999,
        email: "remove_areas_test@example.com",
        additionalInfo: "no more info",
        areas: [
          {
            name: "Area 1",
            description: "Area 1 very cool",
          },
          {
            name: "Area 2",
            description: "Area 2 not so cool",
          },
        ],
      },
      {
        include: areas.Model,
      }
    );

    volunteerCreatedWithoutAreas = await volunteers.Model.create({
      name: "Base volunteer without area",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      birthDate: "1990-01-01",
      phone: 5511999999999,
      email: "without_areas@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("remove areas from volunteer", async () => {
      const context = {
        id: volunteerCreatedWithAreas.id,
      };

      const res = await RemoveAreasFromVolunteer.run(context);
      const relationsFromDatabase = await areaVolunteers.Model.findAll();
      const volunteerFromDatabase = await volunteers.Model.findOne({
        where: { email: volunteerCreatedWithAreas.email },
        include: areas.Model,
      });

      expect(res.areaIds).to.eql([]);
      expect(relationsFromDatabase.length).to.eq(0);
      expect(volunteerFromDatabase.areas).to.eql([]);
    });
  });

  describe("When volunteer has no areas", () => {
    it("just does nothing", async () => {
      const context = {
        id: volunteerCreatedWithoutAreas.id,
      };

      const res = await RemoveAreasFromVolunteer.run(context);
      const volunteerFromDatabase = await volunteers.Model.findOne({
        where: { email: volunteerCreatedWithoutAreas.email },
        include: areas.Model,
      });

      expect(res.areaIds).to.eql([]);
      expect(volunteerFromDatabase.areas).to.eql([]);
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
