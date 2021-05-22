const fetch = require("node-fetch");

const loginParams = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: process.env.LOGIN_EMAIL,
    password: process.env.LOGIN_PASSWORD,
  }),
};

exports.getAuthorizedRequest = async (url) =>
  fetch(process.env.LOGIN_URL, loginParams)
    .then((result) => result.json())
    .then(async (result) => {
      if (!result.token) throw Error("Unauthorized");

      const getParams = {
        method: "GET",
        headers: { "x-access-token": result.token },
      };
      return fetch(url, getParams);
    });
