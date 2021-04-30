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

const filterArrayWithEmployeeId = (array, employeeId) => {
  if (!employeeId) return array;

  return array.filter(
    (a) =>
      a.employees.findIndex(
        (employee) => employee.id.toString() === employeeId
      ) !== -1
  );
};

module.exports = {
  filterEmployeesWithAreaId,
  filterEmployeesWithTeamId,
  filterArrayWithEmployeeId,
};
