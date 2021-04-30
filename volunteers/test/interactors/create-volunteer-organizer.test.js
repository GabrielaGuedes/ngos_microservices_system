/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const teams = require("../../models/teams");
const areas = require("../../models/areas");
const teamVolunteers = require("../../models/team-volunteers");
const areaVolunteers = require("../../models/area-volunteers");
const CreateVolunteerOrganizer = require("../../interactors/create-volunteer-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const teamsCreated = [];
const areasCreated = [];

const volunteerInfo = {
  name: "Base volunteer",
  address: "Base Street, 24",
  city: "Sao Paulo",
  state: "SP",
  country: "Brazil",
  occupation: "Software Engineer",
  birthDate: "1990-01-01",
  hireDate: "2020-01-01",
  phone: 5511999999999,
  email: "create_volunteer_organizer@example.com",
  additionalInfo: "no more info",
};

describe("CreateVolunteerOrganizer", () => {
  beforeEach(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });

    teamsCreated.push(
      await teams.Model.create({
        name: "Team 1",
        description: "Team 1 very cool",
      })
    );
    teamsCreated.push(
      await teams.Model.create({
        name: "Team 2",
        description: "Team 2 not so cool",
      })
    );
    areasCreated.push(
      await areas.Model.create({
        name: "Area 1",
        description: "Area 1 very cool",
      })
    );
    areasCreated.push(
      await areas.Model.create({
        name: "Area 2",
        description: "Area 2 not so cool",
      })
    );
  });

  describe("When context passed is correct", () => {
    it("creates volunteer with teams and areas", async () => {
      const teamIds = teamsCreated.map((team) => team.id);
      const areaIds = areasCreated.map((area) => area.id);
      const context = {
        volunteerInfo,
        teamIds,
        areaIds,
      };

      const res = await CreateVolunteerOrganizer.run(context);
      const teamsRelationFromDatabase = await teamVolunteers.Model.findAll();
      const areasRelationFromDatabase = await areaVolunteers.Model.findAll();
      const volunteersFromDatabase = await volunteers.Model.findAll();

      expect(res.volunteer.dataValues).to.have.own.property("teamIds");
      expect(res.volunteer.dataValues).to.have.own.property("areaIds");
      expect(volunteersFromDatabase.length).to.eq(1);
      expect(res.volunteer.id).to.eq(volunteersFromDatabase[0].id);
      expect(res.volunteer.dataValues.teamIds).to.have.same.members(teamIds);
      expect(res.volunteer.dataValues.areaIds).to.have.same.members(areaIds);
      expect(teamsRelationFromDatabase.length).to.eq(teamIds.length);
      expect(areasRelationFromDatabase.length).to.eq(areaIds.length);
    });
  });

  describe("When teamIds doesn't exist", () => {
    it("doesn't create volunteer", async () => {
      const teamIds = teamsCreated.map((team) => team.id + 6);
      const areaIds = areasCreated.map((area) => area.id);
      const context = {
        volunteerInfo,
        teamIds,
        areaIds,
      };

      await CreateVolunteerOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const teamsRelationFromDatabase = await teamVolunteers.Model.findAll();
        const areasRelationFromDatabase = await areaVolunteers.Model.findAll();
        const volunteersFromDatabase = await volunteers.Model.findAll();

        expect(volunteersFromDatabase.length).to.eq(0);
        expect(teamsRelationFromDatabase.length).to.eq(0);
        expect(areasRelationFromDatabase.length).to.eq(0);
      });
    });
  });

  describe("When areaIds doesn't exist", () => {
    it("doesn't create volunteer", async () => {
      const teamIds = teamsCreated.map((team) => team.id);
      const areaIds = areasCreated.map((area) => area.id + 6);
      const context = {
        volunteerInfo,
        teamIds,
        areaIds,
      };

      await CreateVolunteerOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const teamsRelationFromDatabase = await teamVolunteers.Model.findAll();
        const areasRelationFromDatabase = await areaVolunteers.Model.findAll();
        const volunteersFromDatabase = await volunteers.Model.findAll();

        expect(volunteersFromDatabase.length).to.eq(0);
        expect(teamsRelationFromDatabase.length).to.eq(0);
        expect(areasRelationFromDatabase.length).to.eq(0);
      });
    });
  });

  after(async () => {
    await teamVolunteers.Model.destroy({ where: {} });
    await areaVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
  });
});
