const Interactor = require("interactor");
const CreateVolunteer = require("./create-volunteer");
const SetAreas = require("./set-areas");
const SetTeams = require("./set-teams");

module.exports = class CreateVolunteerOrganizer extends Interactor {
  // eslint-disable-next-line class-methods-use-this
  organize() {
    return [CreateVolunteer, SetAreas, SetTeams];
  }
};
