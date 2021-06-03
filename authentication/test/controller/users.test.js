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

    it("Returns a validate error", async () => {
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

  describe("When there is already someone registered", () => {
    before(async () => {
      await User.Model.deleteMany({});
      await new User.Model({
        name: "First Example User",
        email: "example@test.com",
        password: "pass1234",
      }).save();
    });

    it("Returns unauthorized", async () => {
      const userInfo = {
        name: "Second Example User",
        email: "second_example@test.com",
        password: "pass1234",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/signup")
        .send(userInfo);

      const users = await User.Model.find();

      res.should.have.status(401);
      expect(users.length).to.eql(1);
      expect(users[0].name).to.eql("First Example User");
      expect(res.error.text).to.include("ask");
      expect(res.error.text).to.include("admin");
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

describe("/POST Redefine Password", () => {
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
    it("Redefines the password", async () => {
      const userInfo = {
        oldPassword: "password1234",
        newPassword: "password",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put("/api/redefine-password")
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
        .put("/api/redefine-password")
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
        .put("/api/redefine-password")
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
        .put("/api/redefine-password")
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
        .put("/api/redefine-password")
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
        .put("/api/redefine-password")
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

describe("/POST Register user", () => {
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
    it("Creates a new user", async () => {
      const userInfo = {
        name: "New Example Name",
        email: "new_example@test.com",
        password: "password123",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/register-user")
        .set("x-access-token", token)
        .send(userInfo);

      const user = await User.Model.find();

      res.should.have.status(200);
      expect(user.length).to.eql(2);
      expect(res.body.email).to.eq(userInfo.email);
      expect(res.body.name).to.eq(userInfo.name);
      expect(res.body.message).to.eq("Success");
    });
  });

  describe("When body is missing password and token is passed", () => {
    it("Returns a validate error", async () => {
      const userInfo = {
        name: "New Example Name",
        email: "new_example@test.com",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/register-user")
        .set("x-access-token", token)
        .send(userInfo);

      const user = await User.Model.find();

      res.should.have.status(400);
      expect(user.length).to.eql(1);
      expect(res.text).to.include("password");
    });
  });

  describe("When params are correct, but email is already being used", () => {
    it("Returns an error", async () => {
      const userInfo = {
        name: "New Example Name",
        email: "new_example@test.com",
        password: "password123",
      };

      await new User.Model(userInfo).save();

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/register-user")
        .set("x-access-token", token)
        .send(userInfo);

      const user = await User.Model.find();

      res.should.have.status(500);
      expect(user.length).to.eql(2);
      expect(res.text).to.include("email");
      expect(res.text).to.include("unique");
    });
  });

  describe("When body is correct, but token is not passed", () => {
    it("Returns unauthorized", async () => {
      const userInfo = {
        name: "New Example Name",
        email: "new_example@test.com",
        password: "password123",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/register-user")
        .send(userInfo);

      const user = await User.Model.find();

      res.should.have.status(401);
      expect(user.length).to.eql(1);
      expect(res.text).to.include("No");
      expect(res.text).to.include("token");
      expect(res.text).to.include("provided");
    });
  });

  describe("When body is correct, but token is wrong", () => {
    it("Returns an error", async () => {
      const userInfo = {
        name: "New Example Name",
        email: "new_example@test.com",
        password: "password123",
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/register-user")
        .set("x-access-token", "wrong token")
        .send(userInfo);

      const user = await User.Model.find();

      res.should.have.status(500);
      expect(user.length).to.eql(1);
      expect(res.text).to.include("Failed");
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/GET Can self register", () => {
  describe("When it already has a user", () => {
    before(async () => {
      await User.Model.deleteMany({});
      await new User.Model({
        name: "Example User",
        email: "example@test.com",
        password: "password1234",
      }).save();
    });

    it("Returns false", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/can-self-register");

      res.should.have.status(200);
      expect(res.body.canSelfRegister).to.eq(false);
    });
  });
  describe("When it doesnt have a user", () => {
    before(async () => {
      await User.Model.deleteMany({});
    });

    it("Returns true", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/can-self-register");

      res.should.have.status(200);
      expect(res.body.canSelfRegister).to.eq(true);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
