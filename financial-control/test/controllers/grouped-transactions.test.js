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
  transactionsArray.push(
    await Transaction.Model.create({
      date: "2021-03-02",
      value: 200.0,
      origin: "Donation",
      kind: "IN",
      recurrent: false,
      description: "Our first transaction",
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: "2021-02-02",
      value: 200.0,
      origin: "Bills",
      kind: "OUT",
      recurrent: true,
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: "2021-03-02",
      value: 500.0,
      origin: "Bills",
      kind: "OUT",
      recurrent: false,
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: "2021-04-02",
      value: 20.0,
      origin: "Donation",
      kind: "IN",
      recurrent: true,
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: "2021-03-20",
      value: 1000.0,
      origin: "Great Event",
      kind: "IN",
      recurrent: false,
    })
  );
  transactionsArray.push(
    await Transaction.Model.create({
      date: "2021-05-02",
      value: 2000.0,
      origin: "Great Event",
      kind: "IN",
      recurrent: true,
    })
  );
  transactions = transactionsArray;
};

const cleanTable = async () => {
  await Transaction.Model.destroy({ where: {} });
};

describe("/GET Transactions grouped by origin", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndTransactions();
  });

  describe("When token is valid and has no filters", () => {
    it("groups all the records by origin", async () => {
      const groupedTransactions = groupBy(transactions, (t) => t.origin);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/grouped-transactions/by-origin")
        .set("x-access-token", token);

      const exampleOrigin = res.body[0].origin;
      const transactionTotalValue = groupedTransactions[exampleOrigin]
        .map((t) => t.value)
        .reduce((sum, value) => sum + value);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(Object.keys(groupedTransactions).length);
      expect(res.body[0].totalValue).to.eql(transactionTotalValue);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/grouped-transactions/by-origin")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid and has IN filter", () => {
    it("groups all the IN records by origin", async () => {
      const kind = "IN";
      const inTransactions = transactions.filter((t) => t.kind === kind);
      const groupedTransactions = groupBy(inTransactions, (t) => t.origin);

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/grouped-transactions/by-origin")
        .query({ kind })
        .set("x-access-token", token);

      const exampleOrigin = res.body[0].origin;
      const transactionTotalValue = groupedTransactions[exampleOrigin]
        .map((t) => t.value)
        .reduce((sum, value) => sum + value);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(Object.keys(groupedTransactions).length);
      expect(res.body[0].totalValue).to.eql(transactionTotalValue);
    });
  });

  after(async () => {
    await cleanTable();
  });
});
