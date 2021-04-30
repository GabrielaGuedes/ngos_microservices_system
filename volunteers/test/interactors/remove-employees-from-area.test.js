/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveVolunteersFromArea = require("../../interactors/remove-volunteers-from-area");
const areas = require("../../models/areas");
const volunteers = require("../../models/volunteers");
const areaVolunteers = require("../../models/area-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let areaCreatedWithVolunteers = {};
let areaCreatedWithoutVolunteers = {};

describe("RemoveVolunteersFromArea", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });

    areaCreatedWithVolunteers = await areas.Model.create(
      {
        name: "Area with volunteers",
        description: "Just a cool area",
        volunteers: [
          {
            name: "Base volunteer 1",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
            phone: 5511999999999,
            email: "volunteer_1@example.com",
            additionalInfo: "no more info",
          },
          {
            name: "Base volunteer 2",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
            phone: 5511999999999,
            email: "volunteer_2@example.com",
            additionalInfo: "no more info",
          },
        ],
      },
      {
        include: volunteers.Model,
      }
    );

    areaCreatedWithoutVolunteers = await areas.Model.create({
      name: "Area without volunteers",
      description: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("remove volunteers from area", async () => {
      const context = {
        id: areaCreatedWithVolunteers.id,
      };

      const res = await RemoveVolunteersFromArea.run(context);
      const relationsFromDatabase = await areaVolunteers.Model.findAll();
      const areaFromDatabase = await areas.Model.findOne({
        where: { name: areaCreatedWithVolunteers.name },
        include: volunteers.Model,
      });

      expect(res.volunteerIds).to.eql([]);
      expect(relationsFromDatabase.length).to.eq(0);
      expect(areaFromDatabase.volunteers).to.eql([]);
    });
  });

  describe("When area has no volunteers", () => {
    it("just does nothing", async () => {
      const context = {
        id: areaCreatedWithoutVolunteers.id,
      };

      const res = await RemoveVolunteersFromArea.run(context);
      const areaFromDatabase = await areas.Model.findOne({
        where: { name: areaCreatedWithoutVolunteers.name },
        include: volunteers.Model,
      });

      expect(res.volunteerIds).to.eql([]);
      expect(areaFromDatabase.volunteers).to.eql([]);
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
  });
});
