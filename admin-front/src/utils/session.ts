import Cookies from "universal-cookie";

const cookies = new Cookies();
const COOKIE_NAME = "accessToken";

export const startSession = (accessToken: string) => {
  cookies.set(COOKIE_NAME, accessToken, { path: "/" });
  window.location.href = "/";
};

export const endSession = () => {
  cookies.remove(COOKIE_NAME);
  window.location.href = "/login";
};

export const isUserLoggedIn = () => Boolean(cookies.get(COOKIE_NAME));
