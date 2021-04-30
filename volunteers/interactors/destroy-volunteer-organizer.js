const Interactor = require("interactor");
const DestroyVolunteer = require("./destroy-volunteer");
const RemoveAreasFromVolunteer = require("./remove-areas-from-volunteer");
const RemoveTeamsFromVolunteer = require("./remove-teams-from-volunteer");

module.exports = class DestroyVolunteerOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [
      RemoveAreasFromVolunteer,
      RemoveTeamsFromVolunteer,
      DestroyVolunteer,
    ];
  }
};
