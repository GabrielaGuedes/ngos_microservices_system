/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const areas = require("../../models/areas");
const areaVolunteers = require("../../models/area-volunteers");
const CreateAreaOrganizer = require("../../interactors/create-area-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteersCreated = [];

const areaInfo = {
  name: "Area 1",
  description: "Area 1 very cool",
};

describe("CreateAreaOrganizer", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    const newVolunteers = [];
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
        email: "create_area_organizer_1@example.com",
        additionalInfo: "no more info",
      })
    );
    newVolunteers.push(
      await volunteers.Model.create({
        name: "Base volunteer",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "create_area_organizer_2@example.com",
        additionalInfo: "no more info",
      })
    );
    volunteersCreated = newVolunteers;
  });

  describe("When context passed is correct", () => {
    it("creates area with volunteers", async () => {
      const volunteerIds = volunteersCreated.map((volunteer) => volunteer.id);
      const context = {
        areaInfo,
        volunteerIds,
      };

      const res = await CreateAreaOrganizer.run(context);
      const areasRelationFromDatabase = await areaVolunteers.Model.findAll();
      const areasFromDatabase = await areas.Model.findAll();

      expect(res.area.dataValues).to.have.own.property("volunteerIds");
      expect(areasFromDatabase.length).to.eq(1);
      expect(res.area.id).to.eq(areasFromDatabase[0].id);
      expect(res.area.dataValues.volunteerIds).to.have.same.members(
        volunteerIds
      );
      expect(areasRelationFromDatabase.length).to.eq(volunteerIds.length);
    });
  });

  describe("When volunteerIds doesn't exist", () => {
    it("doesn't create area", async () => {
      const volunteerIds = volunteersCreated.map(
        (volunteer) => volunteer.id + 6
      );
      const context = {
        areaInfo,
        volunteerIds,
      };

      await CreateAreaOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const areasRelationFromDatabase = await areaVolunteers.Model.findAll();
        const areasFromDatabase = await areas.Model.findAll();

        expect(areasFromDatabase.length).to.eq(0);
        expect(areasRelationFromDatabase.length).to.eq(0);
      });
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
