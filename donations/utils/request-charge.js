const { Headers } = require("node-fetch");
const { postRequest } = require("./requests");

const headers = () => {
  const header = new Headers();
  header.append("Authorization", process.env.PAYMENT_GATEWAY_TOKEN);
  header.append("x-api-version", "4.0");
  header.append("x-idempotency-key", "");

  return header;
};

exports.charge = (body) =>
  postRequest(process.env.PAYMENT_GATEWAY_URL, body, headers());
