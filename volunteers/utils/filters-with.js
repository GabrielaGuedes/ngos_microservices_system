const filterVolunteersWithAreaId = (volunteers, areaId) => {
  if (!areaId) return volunteers;

  return volunteers.filter(
    (emp) => emp.areas.findIndex((area) => area.id.toString() === areaId) !== -1
  );
};

const filterVolunteersWithTeamId = (volunteers, teamId) => {
  if (!teamId) return volunteers;

  return volunteers.filter(
    (emp) => emp.teams.findIndex((team) => team.id.toString() === teamId) !== -1
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
