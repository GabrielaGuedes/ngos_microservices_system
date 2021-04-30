const filterVolunteersWithAreaId = (volunteers, areaId) => {
  if (!areaId) return volunteers;

  return volunteers.filter(
    (vol) => vol.areas.findIndex((area) => area.id.toString() === areaId) !== -1
  );
};

const filterVolunteersWithTeamId = (volunteers, teamId) => {
  if (!teamId) return volunteers;

  return volunteers.filter(
    (vol) => vol.teams.findIndex((team) => team.id.toString() === teamId) !== -1
  );
};

const filterArrayWithVolunteerId = (array, volunteerId) => {
  if (!volunteerId) return array;

  return array.filter(
    (a) =>
      a.volunteers.findIndex(
        (volunteer) => volunteer.id.toString() === volunteerId
      ) !== -1
  );
};

module.exports = {
  filterVolunteersWithAreaId,
  filterVolunteersWithTeamId,
  filterArrayWithVolunteerId,
};
