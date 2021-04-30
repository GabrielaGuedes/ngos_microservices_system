/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const UpdateVolunteer = require("../../interactors/update-volunteer");
const volunteers = require("../../models/volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let createdVolunteer = {};
let existentVolunteer = {};

describe("UpdateVolunteer", () => {
  beforeEach(async () => {
    await volunteers.Model.destroy({ where: {} });
    createdVolunteer = await volunteers.Model.create({
      name: "Base volunteer",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "created@example.com",
      additionalInfo: "no more info",
    });
    existentVolunteer = await volunteers.Model.create({
      name: "Existent volunteer",
      address: "Existent Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      occupation: "Software Engineer",
      birthDate: "1990-01-01",
      hireDate: "2020-01-01",
      phone: 5511999999999,
      email: "existent@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("updates an volunteer", async () => {
      const newName = "New name for volunteer";
      const newAdditionalInfo = "Another info";
      const context = {
        volunteer: createdVolunteer,
        volunteerInfo: {
          name: newName,
          additionalInfo: newAdditionalInfo,
        },
      };

      const res = await UpdateVolunteer.run(context);
      const volunteerFromDatabase = await volunteers.Model.findOne({
        where: {
          email: createdVolunteer.email,
        },
      });

      expect(res).to.have.own.property("volunteer");
      expect(res.volunteer.name).to.eq(volunteerFromDatabase.name);
      expect(volunteerFromDatabase.name).to.eq(newName);
      expect(res.volunteer.additionalInfo).to.eq(
        volunteerFromDatabase.additionalInfo
      );
      expect(volunteerFromDatabase.additionalInfo).to.eq(newAdditionalInfo);
    });
  });

  describe("When email from context is already in use", () => {
    it("doesn't update volunteer", async () => {
      const newName = "New name for volunteer";
      const newAdditionalInfo = "Another info";
      const repeatedEmail = existentVolunteer.email;
      const context = {
        volunteer: createdVolunteer,
        volunteerInfo: {
          name: newName,
          additionalInfo: newAdditionalInfo,
          email: repeatedEmail,
        },
      };

      await UpdateVolunteer.run(context).catch(async (error) => {
        const volunteerFromDatabase = await volunteers.Model.findOne({
          where: { name: newName },
        });

        expect(error).to.be.an("error");
        expect(volunteerFromDatabase).to.eq(null);
      });
    });
  });

  after(async () => {
    await volunteers.Model.destroy({ where: {} });
  });
});
