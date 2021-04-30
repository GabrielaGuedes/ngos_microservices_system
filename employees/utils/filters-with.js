const filterEmployeesWithAreaId = (employees, areaId) => {
  if (!areaId) return employees;

  return employees.filter(
    (emp) => emp.areas.findIndex((area) => area.id.toString() === areaId) !== -1
  );
};

const filterEmployeesWithTeamId = (employees, teamId) => {
  if (!teamId) return employees;

  return employees.filter(
    (emp) => emp.teams.findIndex((team) => team.id.toString() === teamId) !== -1
  );
};

module.exports = {
  filterEmployeesWithAreaId,
  filterEmployeesWithTeamId,
};
