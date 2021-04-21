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
