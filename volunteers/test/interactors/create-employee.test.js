/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const CreateVolunteer = require("../../interactors/create-volunteer");
const volunteers = require("../../models/volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const baseVolunteer = {
  name: "Base volunteer",
  address: "Base Street, 24",
  city: "Sao Paulo",
  state: "SP",
  country: "Brazil",
  occupation: "Software Engineer",
  birthDate: "1990-01-01",
  hireDate: "2020-01-01",
  phone: 5511999999999,
  email: "first@example.com",
  additionalInfo: "no more info",
};

describe("CreateVolunteer", () => {
  before(async () => {
    await volunteers.Model.destroy({ where: {} });
    await volunteers.Model.create(baseVolunteer);
  });

  describe("When context passed is correct", () => {
    it("creates an volunteer", async () => {
      const context = {
        name: "Correct example",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "correct@example.com",
        additionalInfo: "no more info",
      };

      const res = await CreateVolunteer.run({ volunteerInfo: context });
      const volunteerFromDatabase = await volunteers.Model.findOne({
        where: {
          email: context.email,
        },
      });

      expect(res).to.have.own.property("volunteer");
      expect(res.volunteer.id).to.eq(volunteerFromDatabase.id);
      expect(volunteerFromDatabase.email).to.eq(context.email);
      expect(volunteerFromDatabase.name).to.eq(context.name);
    });
  });

  describe("When email from context is already in use", () => {
    it("doesn't create an volunteer", async () => {
      const context = baseVolunteer;
      const initialVolunteers = await volunteers.Model.findAll();

      const res = await CreateVolunteer.run({ volunteerInfo: context })
        .then((result) => result)
        .catch((error) => error);

      const volunteersFromDatabase = await volunteers.Model.findAll();

      expect(res).to.be.an("error");
      expect(volunteersFromDatabase.length).to.eq(initialVolunteers.length);
    });
  });

  after(async () => {
    await volunteers.Model.destroy({ where: {} });
  });
});
