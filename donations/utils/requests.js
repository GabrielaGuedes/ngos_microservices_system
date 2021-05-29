const fetch = require("node-fetch");

exports.getRequest = (url) => fetch(url);

exports.postRequest = (url, values = {}, headers = {}) => {
  headers.append("Content-Type", "application/json");

  const init = {
    method: "POST",
    headers,
    body: JSON.stringify(values),
  };

  return fetch(url, init);
};

const loginParams = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: process.env.LOGIN_EMAIL,
    password: process.env.LOGIN_PASSWORD,
  }),
};

exports.authorizedRequest = async (url, method, body = {}) =>
  fetch(process.env.LOGIN_URL, loginParams)
    .then((result) => result.json())
    .then(async (result) => {
      if (!result.token) throw Error("Unauthorized");

      const params = {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": result.token,
        },
        body: JSON.stringify(body),
      };
      if (method === "GET") delete params.body;

      return fetch(url, params);
    });
