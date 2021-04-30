/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const volunteers = require("../../models/volunteers");
const teams = require("../../models/teams");
const areas = require("../../models/areas");
const teamVolunteers = require("../../models/team-volunteers");
const areaVolunteers = require("../../models/area-volunteers");
const UpdateVolunteerOrganizer = require("../../interactors/update-volunteer-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const teamsCreated = [];
const areasCreated = [];
let volunteerCreatedWithArea = {};

describe("UpdateVolunteerOrganizer", () => {
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
    volunteerCreatedWithArea = await volunteers.Model.create(
      {
        name: "Volunteer Created",
        address: "Base Street, 24",
        city: "Sao Paulo",
        state: "SP",
        country: "Brazil",
        occupation: "Software Engineer",
        birthDate: "1990-01-01",
        hireDate: "2020-01-01",
        phone: 5511999999999,
        email: "volunteer_created@example.com",
        additionalInfo: "no more info",
        areas: [
          {
            name: "Existent Area",
            description: "Very cool",
            areaVolunteers: {},
          },
        ],
      },
      {
        include: areas.Model,
      }
    );
  });

  describe("When context passed is correct", () => {
    it("updates the volunteer with new teams and areas", async () => {
      const teamIds = teamsCreated.map((team) => team.id);
      const areaIds = areasCreated.map((area) => area.id);
      const newName = "New name for volunteer";
      const newAdditionalInfo = "Another info";
      const context = {
        volunteer: volunteerCreatedWithArea,
        volunteerInfo: {
          name: newName,
          additionalInfo: newAdditionalInfo,
        },
        teamIds,
        areaIds,
      };

      const res = await UpdateVolunteerOrganizer.run(context);
      const teamsRelationFromDatabase = await teamVolunteers.Model.findAll();
      const areasRelationFromDatabase = await areaVolunteers.Model.findAll();
      const volunteersFromDatabase = await volunteers.Model.findAll({
        include: [areas.Model, teams.Model],
      });

      expect(res.volunteer.dataValues).to.have.own.property("teamIds");
      expect(res.volunteer.dataValues).to.have.own.property("areaIds");
      expect(volunteersFromDatabase.length).to.eq(1);
      expect(volunteersFromDatabase[0].name).to.eq(newName);
      expect(volunteersFromDatabase[0].additionalInfo).to.eq(newAdditionalInfo);
      expect(res.volunteer.dataValues.teamIds).to.have.same.members(teamIds);
      expect(res.volunteer.dataValues.areaIds).to.have.same.members(areaIds);
      expect(teamsRelationFromDatabase.length).to.eq(teamIds.length);
      expect(areasRelationFromDatabase.length).to.eq(areaIds.length);
      expect(
        volunteersFromDatabase[0].areas.map((area) => area.id)
      ).to.have.same.members(areaIds);
      expect(
        volunteersFromDatabase[0].teams.map((team) => team.id)
      ).to.have.same.members(teamIds);
    });
  });

  describe("When teamIds doesn't exist", () => {
    it("doesn't update the areas", async () => {
      const teamIds = teamsCreated.map((team) => team.id + 6);
      const areaIds = areasCreated.map((area) => area.id);
      const newName = "New name for volunteer";
      const newAdditionalInfo = "Another info";
      const context = {
        volunteer: volunteerCreatedWithArea,
        volunteerInfo: {
          name: newName,
          additionalInfo: newAdditionalInfo,
        },
        teamIds,
        areaIds,
      };

      await UpdateVolunteerOrganizer.run(context).catch(async (err) => {
        expect(err).to.be.an("error");
        const teamsRelationFromDatabase = await teamVolunteers.Model.findAll();
        const areasRelationFromDatabase = await areaVolunteers.Model.findAll();
        const volunteersFromDatabase = await volunteers.Model.findAll({
          include: areas.Model,
        });

        expect(volunteersFromDatabase.length).to.eq(1);
        expect(teamsRelationFromDatabase.length).to.eq(0);
        expect(areasRelationFromDatabase.length).to.eq(1);
        expect(
          volunteersFromDatabase[0].areas.map((area) => area.id)
        ).to.have.same.members(
          volunteerCreatedWithArea.areas.map((area) => area.id)
        );
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
