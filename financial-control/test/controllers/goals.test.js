/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");

const Goal = require("../../models/goals");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let goals = [];
let token = "";

const setTokenAndGoals = async () => {
  token = await getTokenForTests();

  const goalsArray = [];
  goalsArray.push(
    await Goal.Model.create({
      goalValue: 1000.0,
      currentValue: 20.0,
      deadline: "2022-01-01",
      reached: false,
      description: "Our first goal",
    })
  );
  goalsArray.push(
    await Goal.Model.create({
      goalValue: 10.0,
      currentValue: 20.0,
      deadline: "2022-01-02",
      reached: true,
      description: "Our second goal",
    })
  );
  goalsArray.push(
    await Goal.Model.create({
      goalValue: 1000.0,
      currentValue: 20000.0,
      deadline: "2022-01-03",
      reached: false,
      description: "Our third goal",
    })
  );
  goalsArray.push(
    await Goal.Model.create({
      goalValue: 100.0,
      currentValue: 0.0,
      deadline: "2021-01-01",
      reached: false,
      description: "Our fourth goal",
    })
  );
  goalsArray.push(
    await Goal.Model.create({
      goalValue: 100.0,
      currentValue: 200.0,
      deadline: "2022-02-01",
      reached: true,
      description: "Our fifth goal",
    })
  );
  goalsArray.push(
    await Goal.Model.create({
      goalValue: 1.0,
      currentValue: 0.0,
      deadline: "2022-02-01",
      reached: false,
      description: "Our sixth goal",
    })
  );
  goals = goalsArray;
};

const cleanTable = async () => {
  await Goal.Model.destroy({ where: {} });
};

describe("/GET Goals", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndGoals();
  });

  describe("When token is valid", () => {
    it("returns all goals ordered by deadline asc", async () => {
      const sortedGoalsDates = goals.map((t) => t.deadline).sort();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/goals")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(goals.length);
      expect(res.body.map((t) => t.deadline)).to.eql(sortedGoalsDates);
      expect(res.body[0].deadline).to.eql(sortedGoalsDates[0]);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/goals")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid and filtered by reached", () => {
    it("returns only reached goals", async () => {
      const filteredGoals = goals.filter((t) => t.reached);
      const sortedFilteredGoalsDates = filteredGoals
        .map((t) => t.deadline)
        .sort();

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/goals")
        .query({ reached: true })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(sortedFilteredGoalsDates.length);
      expect(res.body.map((t) => t.deadline)).to.eql(sortedFilteredGoalsDates);
      expect(res.body[0].deadline).to.eql(sortedFilteredGoalsDates[0]);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/GET :id Goals", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndGoals();
  });

  describe("When token is valid", () => {
    it("returns the requested goal", async () => {
      const { id } = goals[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/goals/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.id).to.eq(goals[1].id);
      expect(res.body.deadline).to.eq(goals[1].deadline);
      expect(res.body.goalValue).to.eq(goals[1].goalValue);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const { id } = goals[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/goals/${id}`)
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but id is invalid", () => {
    it("returns error", async () => {
      const { id } = goals[1] + 5000;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/goals/${id}`)
        .set("x-access-token", token);

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error).to.not.eq(null);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/POST Goals", () => {
  let baseGoal = {};
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndGoals();
    baseGoal = {
      goalValue: 10000.0,
      currentValue: 200.0,
      deadline: "2022-01-12",
      reached: false,
      description: "Our base goal",
    };
  });

  describe("When token is valid and body correct", () => {
    it("returns the goal created", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/goals/")
        .set("x-access-token", token)
        .send(baseGoal);
      const goalFromDatabase = await Goal.Model.findOne({
        where: { description: baseGoal.description },
      });

      res.should.have.status(200);
      expect(res.body.deadline).to.eq(baseGoal.deadline);
      expect(res.body.goalValue).to.eq(baseGoal.goalValue);
      expect(res.body.description).to.eq(baseGoal.description);
      expect(goalFromDatabase.deadline).to.eq(baseGoal.deadline);
      expect(goalFromDatabase.goalValue).to.eq(baseGoal.goalValue);
      expect(goalFromDatabase.description).to.eq(baseGoal.description);
    });
  });

  describe("When token is invalid and body correct", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/goals/")
        .set("x-access-token", "invalid token")
        .send(baseGoal);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but body is missing required param", () => {
    it("returns error", async () => {
      delete baseGoal.deadline;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/goals/")
        .set("x-access-token", token)
        .send(baseGoal);

      res.should.have.status(400);
      expect(res.error.text).to.include("deadline");
      expect(res.error).to.not.eq(null);
    });
  });

  describe("When token is valid but body has param in wrong type", () => {
    it("returns error", async () => {
      baseGoal.goalValue = "goal value";

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/goals/")
        .set("x-access-token", token)
        .send(baseGoal);

      res.should.have.status(400);
      expect(res.error.text).to.include("goalValue");
      expect(res.error).to.not.eq(null);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/PUT :id Goals", () => {
  let baseGoal = {};
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndGoals();

    baseGoal = {
      goalValue: 10000.0,
      currentValue: 200.0,
      deadline: "2022-01-12",
      reached: false,
      description: "Our updated base goal",
    };
  });

  describe("When token is valid and body correct", () => {
    it("returns the goal updeadlined", async () => {
      const { id } = goals[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/goals/${id}`)
        .set("x-access-token", token)
        .send(baseGoal);

      const goalFromDatabase = await Goal.Model.findOne({
        where: { id },
      });

      res.should.have.status(200);
      expect(res.body.deadline).to.eq(baseGoal.deadline);
      expect(res.body.goalValue).to.eq(baseGoal.goalValue);
      expect(res.body.description).to.eq(baseGoal.description);
      expect(goalFromDatabase.deadline).to.eq(baseGoal.deadline);
      expect(goalFromDatabase.goalValue).to.eq(baseGoal.goalValue);
      expect(goalFromDatabase.description).to.eq(baseGoal.description);
    });
  });

  describe("When token is invalid and body correct", () => {
    it("returns error", async () => {
      const { id } = goals[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/goals/${id}`)
        .set("x-access-token", "invalid token")
        .send(baseGoal);

      res.should.have.status(500);
      expect(res.error).to.not.eq(null);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but body is missing required param", () => {
    it("returns error", async () => {
      const { id } = goals[1];
      delete baseGoal.deadline;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/goals/${id}`)
        .set("x-access-token", token)
        .send(baseGoal);

      res.should.have.status(400);
      expect(res.error.text).to.include("deadline");
      expect(res.error).to.not.eq(null);
    });
  });

  describe("When token is valid but body has param in wrong type", () => {
    it("returns error", async () => {
      const { id } = goals[1];
      baseGoal.deadline = 123123;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/goals/${id}`)
        .set("x-access-token", token)
        .send(baseGoal);

      res.should.have.status(400);
      expect(res.error.text).to.include("deadline");
      expect(res.error).to.not.eq(null);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/DELETE :id Goals", () => {
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndGoals();
  });

  describe("When token is valid", () => {
    it("returns success", async () => {
      const { id } = goals[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/goals/${id}`)
        .set("x-access-token", token);

      const goalFromDatabase = await Goal.Model.findOne({
        where: { id },
      });

      res.should.have.status(200);
      expect(res.body.message).to.eq("Destroyed!");
      expect(goalFromDatabase).to.eq(null);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const { id } = goals[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/goals/${id}`)
        .set("x-access-token", "invalid token");
      const goalFromDatabase = await Goal.Model.findOne({
        where: { id },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(res.error).to.not.eq(null);
      expect(goalFromDatabase).to.not.eq(null);
    });
  });

  describe("When token is valid but id doesnt exist", () => {
    it("returns error", async () => {
      const { id } = goals[1] + 500;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/goals/${id}`)
        .set("x-access-token", token);

      res.should.have.status(500);
      expect(res.error).to.not.eq(null);
    });
  });

  after(async () => {
    await cleanTable();
  });
});
