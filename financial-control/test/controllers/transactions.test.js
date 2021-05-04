/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");

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
      origin: "Fine",
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

describe("/GET Transactions", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndTransactions();
  });

  describe("When token is valid", () => {
    it("returns all transactions ordered by date desc", async () => {
      const sortedTransactionsDates = transactions
        .map((t) => t.date)
        .sort()
        .reverse();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/transactions")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(transactions.length);
      expect(res.body.map((t) => t.date)).to.eql(sortedTransactionsDates);
      expect(res.body[0].date).to.eql(sortedTransactionsDates[0]);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/transactions")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid and filtered by recurrence", () => {
    it("returns only recurrent transactions", async () => {
      const filteredTransactions = transactions.filter((t) => t.recurrent);
      const sortedFilteredTransactionsDates = filteredTransactions
        .map((t) => t.date)
        .sort()
        .reverse();

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/transactions")
        .query({ recurrent: true })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(sortedFilteredTransactionsDates.length);
      expect(res.body.map((t) => t.date)).to.eql(
        sortedFilteredTransactionsDates
      );
      expect(res.body[0].date).to.eql(sortedFilteredTransactionsDates[0]);
    });
  });

  describe("When token is valid and filtered by value range", () => {
    it("returns all transactions in range", async () => {
      const minValue = 500.0;
      const maxValue = 2000.0;
      const filteredTransactions = transactions.filter(
        (t) => t.value >= minValue && t.value <= maxValue
      );
      const sortedFilteredTransactionsDates = filteredTransactions
        .map((t) => t.date)
        .sort()
        .reverse();

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/transactions")
        .query({ minValue, maxValue })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(sortedFilteredTransactionsDates.length);
      expect(res.body.map((t) => t.date)).to.eql(
        sortedFilteredTransactionsDates
      );
      expect(res.body[0].date).to.eql(sortedFilteredTransactionsDates[0]);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/GET :id Transactions", () => {
  before(async () => {
    await cleanTable();
    await setTokenAndTransactions();
  });

  describe("When token is valid", () => {
    it("returns the requested transaction", async () => {
      const { id } = transactions[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/transactions/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.id).to.eq(transactions[1].id);
      expect(res.body.date).to.eq(transactions[1].date);
      expect(res.body.value).to.eq(transactions[1].value);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const { id } = transactions[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/transactions/${id}`)
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but id is invalid", () => {
    it("returns error", async () => {
      const { id } = transactions[1] + 5000;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/transactions/${id}`)
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

describe("/POST Transactions", () => {
  let baseTransaction = {};
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndTransactions();
    baseTransaction = {
      date: "2021-05-01",
      value: 300.0,
      origin: "Donation",
      kind: "IN",
      recurrent: true,
      description: "Post Base transaction",
    };
  });

  describe("When token is valid and body correct", () => {
    it("returns the transaction created", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/transactions/")
        .set("x-access-token", token)
        .send(baseTransaction);
      const transactionFromDatabase = await Transaction.Model.findOne({
        where: { description: baseTransaction.description },
      });

      res.should.have.status(200);
      expect(res.body.date).to.eq(baseTransaction.date);
      expect(res.body.value).to.eq(baseTransaction.value);
      expect(res.body.description).to.eq(baseTransaction.description);
      expect(transactionFromDatabase.date).to.eq(baseTransaction.date);
      expect(transactionFromDatabase.value).to.eq(baseTransaction.value);
      expect(transactionFromDatabase.description).to.eq(
        baseTransaction.description
      );
    });
  });

  describe("When token is invalid and body correct", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/transactions/")
        .set("x-access-token", "invalid token")
        .send(baseTransaction);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but body is missing required param", () => {
    it("returns error", async () => {
      delete baseTransaction.date;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/transactions/")
        .set("x-access-token", token)
        .send(baseTransaction);

      res.should.have.status(400);
      expect(res.error.text).to.include("date");
      expect(res.error).to.not.eq(null);
    });
  });

  describe("When token is valid but body has param in wrong type", () => {
    it("returns error", async () => {
      baseTransaction.value = "transaction value";

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/transactions/")
        .set("x-access-token", token)
        .send(baseTransaction);

      res.should.have.status(400);
      expect(res.error.text).to.include("value");
      expect(res.error).to.not.eq(null);
    });
  });
});

describe("/PUT :id Transactions", () => {
  let baseTransaction = {};
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndTransactions();

    baseTransaction = {
      date: "2021-05-01",
      value: 300.0,
      origin: "Donation",
      kind: "IN",
      recurrent: true,
      description: "Updated Base transaction",
    };
  });

  describe("When token is valid and body correct", () => {
    it("returns the transaction updated", async () => {
      const { id } = transactions[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/transactions/${id}`)
        .set("x-access-token", token)
        .send(baseTransaction);

      const transactionFromDatabase = await Transaction.Model.findOne({
        where: { id },
      });

      res.should.have.status(200);
      expect(res.body.date).to.eq(baseTransaction.date);
      expect(res.body.value).to.eq(baseTransaction.value);
      expect(res.body.description).to.eq(baseTransaction.description);
      expect(transactionFromDatabase.date).to.eq(baseTransaction.date);
      expect(transactionFromDatabase.value).to.eq(baseTransaction.value);
      expect(transactionFromDatabase.description).to.eq(
        baseTransaction.description
      );
    });
  });

  describe("When token is invalid and body correct", () => {
    it("returns error", async () => {
      const { id } = transactions[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/transactions/${id}`)
        .set("x-access-token", "invalid token")
        .send(baseTransaction);

      res.should.have.status(500);
      expect(res.error).to.not.eq(null);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is valid but body is missing required param", () => {
    it("returns error", async () => {
      const { id } = transactions[1];
      delete baseTransaction.date;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/transactions/${id}`)
        .set("x-access-token", token)
        .send(baseTransaction);

      res.should.have.status(400);
      expect(res.error.text).to.include("date");
      expect(res.error).to.not.eq(null);
    });
  });

  describe("When token is valid but body has param in wrong type", () => {
    it("returns error", async () => {
      const { id } = transactions[1];
      baseTransaction.date = 123123;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/transactions/${id}`)
        .set("x-access-token", token)
        .send(baseTransaction);

      res.should.have.status(400);
      expect(res.error.text).to.include("date");
      expect(res.error).to.not.eq(null);
    });
  });
});

describe("/DELETE :id Transactions", () => {
  beforeEach(async () => {
    await cleanTable();
    await setTokenAndTransactions();
  });

  describe("When token is valid", () => {
    it("returns success", async () => {
      const { id } = transactions[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/transactions/${id}`)
        .set("x-access-token", token);

      const transactionFromDatabase = await Transaction.Model.findOne({
        where: { id },
      });

      res.should.have.status(200);
      expect(res.body.message).to.eq("Destroyed!");
      expect(transactionFromDatabase).to.eq(null);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const { id } = transactions[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/transactions/${id}`)
        .set("x-access-token", "invalid token");
      const transactionFromDatabase = await Transaction.Model.findOne({
        where: { id },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(res.error).to.not.eq(null);
      expect(transactionFromDatabase).to.not.eq(null);
    });
  });

  describe("When token is valid but id doesnt exist", () => {
    it("returns error", async () => {
      const { id } = transactions[1] + 500;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/transactions/${id}`)
        .set("x-access-token", token);

      res.should.have.status(500);
      expect(res.error).to.not.eq(null);
    });
  });
});
