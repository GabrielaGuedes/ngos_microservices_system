const baseUrl = process.env.REACT_APP_VOLUNTEERS_SERVER_API;

export const VOLUNTEERS_ROUTES = {
  volunteers: baseUrl + "/volunteers",
  teams: baseUrl + "/teams",
  areas: baseUrl + "/areas",
};
