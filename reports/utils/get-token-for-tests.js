const chai = require("chai");

exports.getTokenForTests = async () => {
  const res = await chai
    .request(`http://localhost:${process.env.AUTHENTICATION_PORT}`)
    .post("/api/login")
    .send({
      email: "test@example.com",
      password: "password1234",
    });

  return res.body.token;
};
