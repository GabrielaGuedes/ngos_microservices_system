const Interactor = require("interactor");
const UpdateVolunteer = require("./update-volunteer");
const SetAreas = require("./set-areas");
const SetTeams = require("./set-teams");

module.exports = class UpdateVolunteerOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [UpdateVolunteer, SetAreas, SetTeams];
  }
};
