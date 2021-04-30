/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const areas = require("../../models/areas");
const areaVolunteers = require("../../models/area-volunteers");
const DestroyArea = require("../../interactors/destroy-area");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let areaWithRelation = {};
let areaToBeDestroyed = {};

describe("DestroyArea", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    areaWithRelation = await areas.Model.create(
      {
        name: "Area with relations",
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

    areaToBeDestroyed = await areas.Model.create({
      name: "Area to be destroyed",
      description: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("destroys the area", async () => {
      const context = {
        id: areaToBeDestroyed.id,
      };

      const res = await DestroyArea.run(context);
      const areasFromDatabase = await areas.Model.findAll({
        where: { name: areaToBeDestroyed.name },
      });

      expect(res.success).to.eql(true);
      expect(areasFromDatabase).to.eql([]);
    });
  });

  describe("When area has relations", () => {
    it("cant destroy the area", async () => {
      const context = {
        id: areaWithRelation.id,
      };

      await DestroyArea.run(context).catch(async (err) => {
        const areaFromDatabase = await areas.Model.findOne({
          where: { name: areaWithRelation.name },
        });

        expect(err).to.be.an("error");
        expect(areaFromDatabase.id).to.eq(areaWithRelation.id);
      });
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
