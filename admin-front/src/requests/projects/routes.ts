const baseUrl = process.env.REACT_APP_PROJECTS_SERVER_API;

export const PROJECTS_ROUTES = {
  projects: baseUrl + "/projects",
  totalIncomeExpected: baseUrl + "/total-expected/income",
  totalCostExpected: baseUrl + "/total-expected/cost",
};
