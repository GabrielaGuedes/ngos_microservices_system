/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const areas = require("../../models/areas");
const areaVolunteers = require("../../models/area-volunteers");
const DestroyVolunteer = require("../../interactors/destroy-volunteer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteerWithRelation = {};
let volunteerToBeDestroyed = {};

describe("DestroyVolunteer", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    volunteerWithRelation = await volunteers.Model.create(
      {
        name: "Base volunteer With relation",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "with_relation@example.com",
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

    volunteerToBeDestroyed = await volunteers.Model.create({
      name: "Base volunteer to be destroyed",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "to_be_destroyed@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("destroys the volunteer", async () => {
      const context = {
        id: volunteerToBeDestroyed.id,
      };

      const res = await DestroyVolunteer.run(context);
      const volunteerFromDatabase = await volunteers.Model.findAll({
        where: { email: volunteerToBeDestroyed.email },
      });

      expect(res.success).to.eql(true);
      expect(volunteerFromDatabase).to.eql([]);
    });
  });

  describe("When volunteer has relations", () => {
    it("cant destroy the volunteer", async () => {
      const context = {
        id: volunteerWithRelation.id,
      };

      await DestroyVolunteer.run(context).catch(async (err) => {
        const volunteerFromDatabase = await volunteers.Model.findOne({
          where: { email: volunteerWithRelation.email },
        });

        expect(err).to.be.an("error");
        expect(volunteerFromDatabase.id).to.eq(volunteerWithRelation.id);
      });
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
