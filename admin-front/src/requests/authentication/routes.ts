const baseUrl = process.env.REACT_APP_AUTHENTICATION_SERVER_API;

export const AUTHENTICATION_ROUTES = {
  selfRegister: baseUrl + "/can-self-register",
  login: baseUrl + "/login",
  redefinePassword: baseUrl + "/redefine-password",
  registerUser: baseUrl + "/register-user",
  signup: baseUrl + "/signup",
};
