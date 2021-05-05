/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const groupBy = require("lodash.groupby");

const Transaction = require("../../models/transactions");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let transactions = [];
let token = "";

const setTokenAndTransactions = async () => {
  token = await getTokenForTests();

  const transactionsArray = [];

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);

  transactionsArray.push(
    await Transaction.Model.create({
      date: new Date(),
      value: 200.0,
      origin: "Donation",
      kind: "IN",
      recurrent: false,
      description: "Our first transaction",
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: lastMonth,
      value: 200.0,
      origin: "Bills",
      kind: "OUT",
      recurrent: true,
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: lastYear,
      value: 500.0,
      origin: "Fine",
      kind: "OUT",
      recurrent: false,
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: new Date(),
      value: 20.0,
      origin: "Donation",
      kind: "IN",
      recurrent: true,
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: lastMonth,
      value: 1000.0,
      origin: "Great Event",
      kind: "IN",
      recurrent: false,
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: lastYear,
      value: 2000.0,
      origin: "Taxes",
      kind: "OUT",
      recurrent: true,
    })
  );
  transactions = transactionsArray;
};

const cleanTable = async () => {
  await Transaction.Model.destroy({ where: {} });
};

describe("/GET Totals/current-value", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndTransactions();
  });

  describe("When token is valid", () => {
    it("returns the total value", async () => {
      const currentValue =
        transactions[0].value -
        transactions[1].value -
        transactions[2].value +
        transactions[3].value +
        transactions[4].value -
        transactions[5].value * 12;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/totals/current-value")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.currentValue).to.eq(currentValue);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/totals/current-value")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/GET Totals/recurrent-transactions", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndTransactions();
  });

  describe("When token is valid", () => {
    it("returns the value expected by month", async () => {
      const recurrentTransations = transactions.filter((t) => t.recurrent);
      const groupedTransactions = groupBy(recurrentTransations, (t) => t.kind);

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/totals/recurrent-transactions")
        .set("x-access-token", token);

      const allIns = groupedTransactions.IN.map((t) => t.value).reduce(
        (sum, value) => sum + value
      );
      const allOuts = groupedTransactions.OUT.map((t) => t.value).reduce(
        (sum, value) => sum + value
      );

      res.should.have.status(200);
      expect(res.body.currentValue).to.eql(allIns - allOuts);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/totals/recurrent-transactions")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/GET Totals/all-origins", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndTransactions();
  });

  describe("When token is valid", () => {
    it("returns all the origins", async () => {
      const origins = [...new Set(transactions.map((t) => t.origin))];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/totals/all-origins")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.have.same.members(origins);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/totals/all-origins")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  after(async () => {
    await cleanTable();
  });
});
