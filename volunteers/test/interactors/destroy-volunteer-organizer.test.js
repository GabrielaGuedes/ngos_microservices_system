/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const DestroyVolunteerOrganizer = require("../../interactors/destroy-volunteer-organizer");
const volunteers = require("../../models/volunteers");
const areas = require("../../models/areas");
const teams = require("../../models/teams");
const areaVolunteers = require("../../models/area-volunteers");
const teamVolunteers = require("../../models/team-volunteers");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let volunteerWithAreasAndTeams = {};
let volunteerWithAreas = {};
let volunteerWithTeams = {};
let volunteerWithNothing = {};

describe("DestroyVolunteerOrganizer", () => {
  beforeEach(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });

    volunteerWithAreasAndTeams = await volunteers.Model.create(
      {
        name: "Base volunteer With Areas and Teams",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        birthDate: "1990-01-01",
        phone: 5511999999999,
        email: "areas_and_teams@example.com",
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
        teams: [
          {
            name: "Team 1",
            description: "Team 1 very cool",
          },
          {
            name: "Team 2",
            description: "Team 2 not so cool",
          },
        ],
      },
      {
        include: [areas.Model, teams.Model],
      }
    );

    volunteerWithAreas = await volunteers.Model.create(
      {
        name: "Base volunteer With Areas",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        birthDate: "1990-01-01",
        phone: 5511999999999,
        email: "areas@example.com",
        additionalInfo: "no more info",
        areas: [
          {
            name: "Area 11",
            description: "Area 1 very cool",
          },
          {
            name: "Area 22",
            description: "Area 2 not so cool",
          },
        ],
      },
      {
        include: areas.Model,
      }
    );

    volunteerWithTeams = await volunteers.Model.create(
      {
        name: "Base volunteer With Teams",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        birthDate: "1990-01-01",
        phone: 5511999999999,
        email: "teams@example.com",
        additionalInfo: "no more info",
        teams: [
          {
            name: "Team 11",
            description: "Team 1 very cool",
          },
          {
            name: "Team 22",
            description: "Team 2 not so cool",
          },
        ],
      },
      {
        include: teams.Model,
      }
    );

    volunteerWithNothing = await volunteers.Model.create({
      name: "Base volunteer with nothing",
      address: "Base Street, 24",
      city: "Sao Paulo",
      state: "SP",
      country: "Brazil",
      birthDate: "1990-01-01",
      phone: 5511999999999,
      email: "with_nothing@example.com",
      additionalInfo: "no more info",
    });
  });

  describe("When volunteer has teams and areas", () => {
    it("removes relations and destroys volunteer", async () => {
      const context = {
        id: volunteerWithAreasAndTeams.id,
      };

      const res = await DestroyVolunteerOrganizer.run(context);
      const areaRelationsFromDatabase = await areaVolunteers.Model.findAll({
        where: { volunteerId: volunteerWithAreasAndTeams.id },
      });
      const teamRelationsFromDatabase = await teamVolunteers.Model.findAll({
        where: { volunteerId: volunteerWithAreasAndTeams.id },
      });
      const volunteerFromDatabase = await volunteers.Model.findAll({
        where: { email: volunteerWithAreasAndTeams.email },
      });

      expect(res.areaIds).to.eql([]);
      expect(res.teamIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(areaRelationsFromDatabase.length).to.eq(0);
      expect(teamRelationsFromDatabase.length).to.eq(0);
      expect(volunteerFromDatabase).to.eql([]);
    });
  });

  describe("When volunteer has teams", () => {
    it("removes relations and destroys volunteer", async () => {
      const context = {
        id: volunteerWithTeams.id,
      };

      const res = await DestroyVolunteerOrganizer.run(context);
      const teamRelationsFromDatabase = await teamVolunteers.Model.findAll({
        where: { volunteerId: volunteerWithTeams.id },
      });
      const volunteerFromDatabase = await volunteers.Model.findAll({
        where: { email: volunteerWithTeams.email },
      });

      expect(res.teamIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(teamRelationsFromDatabase.length).to.eq(0);
      expect(volunteerFromDatabase).to.eql([]);
    });
  });

  describe("When volunteer has areas", () => {
    it("removes relations and destroys volunteer", async () => {
      const context = {
        id: volunteerWithAreas.id,
      };

      const res = await DestroyVolunteerOrganizer.run(context);
      const areaRelationsFromDatabase = await areaVolunteers.Model.findAll({
        where: { volunteerId: volunteerWithAreas.id },
      });
      const volunteerFromDatabase = await volunteers.Model.findAll({
        where: { email: volunteerWithAreas.email },
      });

      expect(res.areaIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(areaRelationsFromDatabase.length).to.eq(0);
      expect(volunteerFromDatabase).to.eql([]);
    });
  });

  describe("When volunteer has nothing", () => {
    it("destroys volunteer", async () => {
      const context = {
        id: volunteerWithNothing.id,
      };

      const res = await DestroyVolunteerOrganizer.run(context);
      const volunteerFromDatabase = await volunteers.Model.findAll({
        where: { email: volunteerWithNothing.email },
      });

      expect(res.success).to.eql(true);
      expect(volunteerFromDatabase).to.eql([]);
    });
  });

  after(async () => {
    await areaVolunteers.Model.destroy({ where: {} });
    await teamVolunteers.Model.destroy({ where: {} });
    await volunteers.Model.destroy({ where: {} });
    await areas.Model.destroy({ where: {} });
    await teams.Model.destroy({ where: {} });
  });
});
