/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const User = require("../../models/users");
require("../../config/db");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);
describe("/POST Sign up", () => {
  describe("When body is correct", () => {
    before(async () => {
      await User.Model.deleteMany({});
    });

    it("Creates a new user already logged in", async () => {
      const userInfo = {
        name: "Example Name",
        email: "example@test.com",
        password: "password123",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/signup")
        .send(userInfo);

      const user = await User.Model.find();

      res.should.have.status(200);
      expect(user.length).to.eql(1);
      expect(res.body.token).to.not.eq(undefined);
      expect(res.body.auth).to.eq(true);
    });
  });

  describe("When body is missing password", () => {
    before(async () => {
      await User.Model.deleteMany({});
    });

    it("Returns an validate error", async () => {
      const userInfo = {
        name: "Example Name",
        email: "example@test.com",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/signup")
        .send(userInfo);

      const user = await User.Model.find();

      res.should.have.status(400);
      expect(res.error.text).to.include("password");
      expect(user.length).to.eql(0);
      expect(res.body).to.not.have.own.property("auth");
      expect(res.body).to.not.have.own.property("token");
    });
  });

  describe("When email is already being used", () => {
    beforeEach(async () => {
      await User.Model.deleteMany({});
      await new User.Model({
        name: "First Example User",
        email: "example@test.com",
        password: "pass1234",
      }).save();
    });

    it("Returns an error", async () => {
      const userInfo = {
        name: "Second Example User",
        email: "example@test.com",
        password: "pass1234",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/signup")
        .send(userInfo);

      const users = await User.Model.find();

      res.should.have.status(500);
      expect(users.length).to.eql(1);
      expect(users[0].name).to.eql("First Example User");
      expect(res.error.text).to.include("email");
      expect(res.error.text).to.include("unique");
      expect(res.body).to.not.have.own.property("auth");
      expect(res.body).to.not.have.own.property("token");
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/POST Login", () => {
  before(async () => {
    await User.Model.deleteMany({});
    await new User.Model({
      name: "Example User",
      email: "example@test.com",
      password: "password1234",
    }).save();
  });

  describe("When body is correct", () => {
    it("Logs in", async () => {
      const userInfo = {
        email: "example@test.com",
        password: "password1234",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/login")
        .send(userInfo);

      res.should.have.status(200);
      expect(res.body.token).to.not.eq(undefined);
      expect(res.body.auth).to.eq(true);
    });
  });

  describe("When password is wrong", () => {
    it("Returns not authorized", async () => {
      const userInfo = {
        email: "example@test.com",
        password: "wrong password",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/login")
        .send(userInfo);

      res.should.have.status(401);
      expect(res.body).to.not.have.own.property("auth");
      expect(res.body).to.not.have.own.property("token");
      expect(res.error.text).to.include("Invalid");
    });
  });

  describe("When password is missing", () => {
    it("Returns not authorized", async () => {
      const userInfo = {
        email: "example@test.com",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/login")
        .send(userInfo);

      res.should.have.status(401);
      expect(res.body).to.not.have.own.property("auth");
      expect(res.body).to.not.have.own.property("token");
      expect(res.error.text).to.include("Invalid");
    });
  });

  describe("When user doesnt exist", () => {
    it("Returns bad request", async () => {
      const userInfo = {
        email: "not_existent_example@test.com",
        password: "password1234",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/login")
        .send(userInfo);

      res.should.have.status(400);
      expect(res.body).to.not.have.own.property("auth");
      expect(res.body).to.not.have.own.property("token");
      expect(res.error.text).to.include("found");
    });
  });

  describe("When email is missing", () => {
    it("Returns bad request", async () => {
      const userInfo = {
        email: "not_existent_example@test.com",
        password: "password1234",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/login")
        .send(userInfo);

      res.should.have.status(400);
      expect(res.body).to.not.have.own.property("auth");
      expect(res.body).to.not.have.own.property("token");
      expect(res.error.text).to.include("found");
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/POST Reset Password", () => {
  let token = "";
  beforeEach(async () => {
    await User.Model.deleteMany({});
    await new User.Model({
      name: "Example User",
      email: "example@test.com",
      password: "password1234",
    }).save();

    const res = await chai
      .request(`http://localhost:${process.env.TEST_PORT}`)
      .post("/api/login")
      .send({
        email: "example@test.com",
        password: "password1234",
      });

    token = res.body.token;
  });

  describe("When body is correct and token is passed", () => {
    it("Resets the password", async () => {
      const userInfo = {
        oldPassword: "password1234",
        newPassword: "password",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/reset-password")
        .set("x-access-token", token)
        .send(userInfo);

      res.should.have.status(200);
      expect(res.text).to.include("Success");
    });
  });

  describe("When body is correct but token is not passed", () => {
    it("Returns not authorized", async () => {
      const userInfo = {
        oldPassword: "password1234",
        newPassword: "password",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/reset-password")
        .send(userInfo);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
    });
  });

  describe("When body is correct but token is wrong", () => {
    it("Returns error", async () => {
      const userInfo = {
        oldPassword: "password1234",
        newPassword: "password",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/reset-password")
        .set("x-access-token", "wrongToken")
        .send(userInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When body is missing oldPassword but token is correct", () => {
    it("Returns not authorized", async () => {
      const userInfo = {
        newPassword: "password",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/reset-password")
        .set("x-access-token", token)
        .send(userInfo);

      res.should.have.status(401);
      expect(res.error.text).to.include("Invalid");
    });
  });

  describe("When body is missing newPassword but token is correct", () => {
    it("Returns error", async () => {
      const userInfo = {
        oldPassword: "password1234",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/reset-password")
        .set("x-access-token", token)
        .send(userInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("Error");
    });
  });

  describe("When body is missing newPassword and token is wrong", () => {
    it("Returns error", async () => {
      const userInfo = {
        oldPassword: "password1234",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/reset-password")
        .set("x-access-token", "wrongToken")
        .send(userInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
