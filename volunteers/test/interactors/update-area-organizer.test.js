/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const areas = require("../../models/areas");
const areaVolunteers = require("../../models/area-volunteers");
const UpdateAreaOrganizer = require("../../interactors/update-area-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteersCreated = [];
let areaCreatedWithVolunteers = {};

describe("UpdateAreaOrganizer", () => {
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
    areaCreatedWithVolunteers = await areas.Model.create(
      {
        name: "Area 1",
        description: "Area 1 very cool",
        volunteers: [
          {
            name: "Base volunteer For area 1",
            address: "Base Street, 24",
            city: "Sao Paulo",
            state: "SP",
            country: "Brazil",
            occupation: "Software Engineer",
            birthDate: "1990-01-01",
            hireDate: "2020-01-01",
            phone: 5511999999999,
            email: "volunteer_for_area_1@example.com",
            additionalInfo: "no more info",
          },
        ],
      },
      {
        include: volunteers.Model,
      }
    );
  });

  describe("When context passed is correct", () => {
    it("updates the area with new volunteers", async () => {
      const volunteerIds = volunteersCreated.map((volunteer) => volunteer.id);
      const newDescription = "Brand new description here";
      const context = {
        area: areaCreatedWithVolunteers,
        areaInfo: {
          description: newDescription,
        },
        volunteerIds,
      };

      const res = await UpdateAreaOrganizer.run(context);
      const areasRelationFromDatabase = await areaVolunteers.Model.findAll();
      const areasFromDatabase = await areas.Model.findAll({
        include: volunteers.Model,
      });

      expect(res.area.dataValues).to.have.own.property("volunteerIds");
      expect(areasFromDatabase.length).to.eq(1);
      expect(areasFromDatabase[0].description).to.eq(newDescription);
      expect(res.area.dataValues.volunteerIds).to.have.same.members(
        volunteerIds
      );
      expect(areasRelationFromDatabase.length).to.eq(volunteerIds.length);
      expect(
        areasFromDatabase[0].volunteers.map((emp) => emp.id)
      ).to.have.same.members(volunteerIds);
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
