const baseUrl = process.env.REACT_APP_EMPLOYEES_SERVER_API;

export const EMPLOYEES_ROUTES = {
  employees: baseUrl + "/employees",
  teams: baseUrl + "/teams",
  areas: baseUrl + "/areas",
};
