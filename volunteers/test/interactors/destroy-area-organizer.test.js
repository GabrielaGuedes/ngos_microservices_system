/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const DestroyAreaOrganizer = require("../../interactors/destroy-area-organizer");
const areas = require("../../models/areas");
const volunteers = require("../../models/volunteers");
const areaVolunteers = require("../../models/area-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let areaWithVolunteers = {};
let areaWithNothing = {};

describe("DestroyAreaOrganizer", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });

    areaWithVolunteers = await areas.Model.create(
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
            birthDate: "1990-01-01",
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
            birthDate: "1990-01-01",
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

    areaWithNothing = await areas.Model.create({
      name: "Area without volunteers",
      description: "no more info",
    });
  });

  describe("When area has volunteers", () => {
    it("removes relations and destroys area", async () => {
      const context = {
        id: areaWithVolunteers.id,
      };

      const res = await DestroyAreaOrganizer.run(context);
      const volunteerRelationsFromDatabase = await areaVolunteers.Model.findAll(
        {
          where: { areaId: areaWithVolunteers.id },
        }
      );
      const areaFromDatabase = await areas.Model.findAll({
        where: { name: areaWithVolunteers.name },
      });

      expect(res.volunteerIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(volunteerRelationsFromDatabase.length).to.eq(0);
      expect(areaFromDatabase).to.eql([]);
    });
  });

  describe("When area has nothing", () => {
    it("destroys area", async () => {
      const context = {
        id: areaWithNothing.id,
      };

      const res = await DestroyAreaOrganizer.run(context);
      const areaFromDatabase = await areas.Model.findAll({
        where: { name: areaWithNothing.name },
      });

      expect(res.success).to.eql(true);
      expect(areaFromDatabase).to.eql([]);
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
  });
});
