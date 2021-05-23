/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Invoice = require("../../models/invoices");
require("../../config/db");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let token = "";
let invoices = [];

const setTokenAndInvoices = async () => {
  const res = await chai
    .request(`http://localhost:${process.env.AUTHENTICATION_PORT}`)
    .post("/api/login")
    .send({
      email: "test@example.com",
      password: "password1234",
    });

  token = res.body.token;

  const newInvoices = [];
  newInvoices.push(
    await new Invoice.Model({
      donationDate: "2021-01-01T20:20:39+00:00",
      donatorName: "Example1",
      donatorEmail: "example@test.com",
    })
      .save()
      .then((doc) => doc)
  );
  newInvoices.push(
    await new Invoice.Model({
      donationDate: "2021-02-01T20:20:39+00:00",
      donatorName: "Example2",
      donatorEmail: "example2@test.com",
    })
      .save()
      .then((doc) => doc)
  );
  newInvoices.push(
    await new Invoice.Model({
      donationDate: "2021-03-01T20:20:39+00:00",
      donatorName: "Example3",
      donatorEmail: "example3@test.com",
    })
      .save()
      .then((doc) => doc)
  );
  newInvoices.push(
    await new Invoice.Model({
      donationDate: "2021-04-01T20:20:39+00:00",
      donatorName: "Example4",
      donatorEmail: "example4@test.com",
    })
      .save()
      .then((doc) => doc)
  );
  newInvoices.push(
    await new Invoice.Model({
      donationDate: "2021-05-01T20:20:39+00:00",
      donatorName: "Example5",
      donatorEmail: "example5@test.com",
    })
      .save()
      .then((doc) => doc)
  );
  newInvoices.push(
    await new Invoice.Model({
      donationDate: "2021-06-01T20:20:39+00:00",
      donatorName: "Example6",
      donatorEmail: "example6@test.com",
    })
      .save()
      .then((doc) => doc)
  );
  invoices = newInvoices;
};

describe("/GET invoice", () => {
  before(async () => {
    await Invoice.Model.remove({});
    await setTokenAndInvoices();
  });

  describe("When token is passed", () => {
    it("Returns the invoices", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/invoices")
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.eq(invoices.length);
    });
  });

  describe("When token is not passed", () => {
    it("Returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/invoices");

      res.should.have.status(401);
      expect(res.text).to.include("No");
      expect(res.text).to.include("token");
      expect(res.text).to.include("provided");
    });
  });

  describe("When token is wrong", () => {
    it("Returns an error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/invoices")
        .set("x-access-token", "invalid_token");

      res.should.have.status(500);
      expect(res.text).to.include("Failed");
    });
  });

  describe("When token is passed and filtered by minDate", () => {
    it("Returns the invoices with date >= minDate", async () => {
      const minDate = "2021-02-02";
      const inRangeInvoices = invoices.filter(
        (i) => i.donationDate >= new Date(minDate)
      );

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/invoices")
        .set("x-access-token", token)
        .query({ minDate });

      res.should.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.eq(inRangeInvoices.length);
    });
  });

  describe("When token is passed and filtered by maxDate", () => {
    it("Returns the invoices with date <= maxDate", async () => {
      const maxDate = "2021-05-02";
      const inRangeInvoices = invoices.filter(
        (i) => i.donationDate <= new Date(maxDate)
      );

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/invoices")
        .set("x-access-token", token)
        .query({ maxDate });

      res.should.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.eq(inRangeInvoices.length);
    });
  });

  describe("When token is passed and filtered by range of dates", () => {
    it("Returns the invoices with date inside range", async () => {
      const minDate = "2021-02-02";
      const maxDate = "2021-05-02";
      const inRangeInvoices = invoices.filter(
        (i) =>
          i.donationDate >= new Date(minDate) &&
          i.donationDate <= new Date(maxDate)
      );

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/invoices")
        .set("x-access-token", token)
        .query({ minDate, maxDate });

      res.should.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.eq(inRangeInvoices.length);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/GET/:id Invoice", () => {
  before(async () => {
    await Invoice.Model.remove({});
    await setTokenAndInvoices();
  });

  describe("When token is passed", () => {
    it("Returns the invoice", async () => {
      const invoice = invoices[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/invoices/${String(invoice._id)}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.donatorEmail).to.eq(invoice.donatorEmail);
    });
  });

  describe("When token is not passed", () => {
    it("Returns unauthorized", async () => {
      const invoice = invoices[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/invoices/${String(invoice._id)}`);

      res.should.have.status(401);
      expect(res.text).to.include("No");
      expect(res.text).to.include("token");
      expect(res.text).to.include("provided");
    });
  });

  describe("When token is wrong", () => {
    it("Returns an error", async () => {
      const invoice = invoices[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/invoices/${String(invoice._id)}`)
        .set("x-access-token", "invalid_token");

      res.should.have.status(500);
      expect(res.text).to.include("Failed");
    });
  });

  describe("When id is wrong", () => {
    it("Returns an error", async () => {
      const invoice = invoices[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/invoices/${String(invoice._id)}123123123`)
        .set("x-access-token", token);

      res.should.have.status(500);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/POST Invoice", () => {
  before(async () => {
    await Invoice.Model.remove({});
    await setTokenAndInvoices();
  });

  describe("When body is correct and token is passed", () => {
    it("creates the invoice", async () => {
      const body = {
        donationDate: "2021-07-01T20:20:39+00:00",
        donatorEmail: "example7@test.com",
        donatorName: "Example7",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post(`/api/invoices/`)
        .set("x-access-token", token)
        .send(body);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: body.donatorName,
      });

      res.should.have.status(200);
      expect(res.body.donatorEmail).to.eq(body.donatorEmail);
      expect(invoiceFromDatabase.donatorEmail).to.eq(body.donatorEmail);
    });
  });

  describe("When token is not passed", () => {
    it("Returns unauthorized", async () => {
      const body = {
        donationDate: "2021-08-01T20:20:39+00:00",
        donatorEmail: "example8@test.com",
        donatorName: "Example8",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post(`/api/invoices/`)
        .send(body);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: body.donatorName,
      });

      res.should.have.status(401);
      expect(res.text).to.include("No");
      expect(res.text).to.include("token");
      expect(res.text).to.include("provided");
      expect(invoiceFromDatabase).to.eq(null);
    });
  });

  describe("When token is wrong", () => {
    it("Returns an error", async () => {
      const body = {
        donationDate: "2021-09-01T20:20:39+00:00",
        donatorEmail: "example9@test.com",
        donatorName: "Example9",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post(`/api/invoices/`)
        .send(body)
        .set("x-access-token", "invalid_token");

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: body.donatorName,
      });

      res.should.have.status(500);
      expect(res.text).to.include("Failed");
      expect(invoiceFromDatabase).to.eq(null);
    });
  });

  describe("When there is a missing param", () => {
    it("Returns an error", async () => {
      const body = {
        donationDate: "2021-02-01T20:20:39+00:00",
        donatorEmail: "example10@test.com",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post(`/api/invoices/`)
        .send(body)
        .set("x-access-token", token);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorEmail: body.donatorEmail,
      });

      res.should.have.status(400);
      expect(res.text).to.include("donatorName");
      expect(invoiceFromDatabase).to.eq(null);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/PUT/:id Invoice", () => {
  beforeEach(async () => {
    await Invoice.Model.remove({});
    await setTokenAndInvoices();
  });

  describe("When token is passed", () => {
    it("Updates the invoice", async () => {
      const invoice = invoices[0];
      const body = {
        donatorEmail: "newEmail@test.com",
        donatorName: invoice.donatorName,
        donationDate: "2022-01-01T20:20:39+00:00",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/invoices/${String(invoice._id)}`)
        .set("x-access-token", token)
        .send(body);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(200);
      expect(res.body.donatorEmail).to.eq(body.donatorEmail);
      expect(invoiceFromDatabase.donatorEmail).to.eq(body.donatorEmail);
    });
  });

  describe("When token is not passed", () => {
    it("Returns unauthorized", async () => {
      const invoice = invoices[0];
      const body = {
        donatorEmail: "newEmail2@test.com",
        donatorName: invoice.donatorName,
        donationDate: "2022-02-01T20:20:39+00:00",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/invoices/${String(invoice._id)}`)
        .send(body);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(401);
      expect(res.text).to.include("No");
      expect(res.text).to.include("token");
      expect(res.text).to.include("provided");
      expect(invoiceFromDatabase.donatorEmail).to.eq(invoice.donatorEmail);
    });
  });

  describe("When token is wrong", () => {
    it("Returns an error", async () => {
      const invoice = invoices[0];
      const body = {
        donatorEmail: "newEmail3@test.com",
        donatorName: invoice.donatorName,
        donationDate: "2022-03-01T20:20:39+00:00",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/invoices/${String(invoice._id)}`)
        .set("x-access-token", "wrong_token")
        .send(body);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(500);
      expect(res.text).to.include("Failed");
      expect(invoiceFromDatabase.donatorEmail).to.eq(invoice.donatorEmail);
    });
  });

  describe("When id is wrong", () => {
    it("Returns an error", async () => {
      const invoice = invoices[0];
      const body = {
        donatorEmail: "newEmail@test.com",
        donatorName: invoice.donatorName,
        donationDate: "2022-01-01T20:20:39+00:00",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/invoices/${String(invoice._id)}123123123`)
        .set("x-access-token", token)
        .send(body);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(500);
      expect(invoiceFromDatabase.donatorEmail).to.eq(invoice.donatorEmail);
    });
  });

  describe("When there is a param missing", () => {
    it("Returns an error", async () => {
      const invoice = invoices[0];
      const body = {
        donatorEmail: "newEmail@test.com",
        donatorName: invoice.donatorName,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/invoices/${String(invoice._id)}`)
        .set("x-access-token", token)
        .send(body);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("donationDate");
      expect(invoiceFromDatabase.donatorEmail).to.eq(invoice.donatorEmail);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});

describe("/DELETE/:id Invoice", () => {
  beforeEach(async () => {
    await Invoice.Model.remove({});
    await setTokenAndInvoices();
  });

  describe("When token is passed", () => {
    it("Deletes the invoice", async () => {
      const invoice = invoices[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/invoices/${String(invoice._id)}`)
        .set("x-access-token", token);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(200);
      expect(res.body.message).to.eq("Destroyed!");
      expect(invoiceFromDatabase).to.eq(null);
    });
  });

  describe("When token is not passed", () => {
    it("Returns unauthorized", async () => {
      const invoice = invoices[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/invoices/${String(invoice._id)}`);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(401);
      expect(res.text).to.include("No");
      expect(res.text).to.include("token");
      expect(res.text).to.include("provided");
      expect(invoiceFromDatabase).to.not.eq(null);
    });
  });

  describe("When token is wrong", () => {
    it("Returns an error", async () => {
      const invoice = invoices[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/invoices/${String(invoice._id)}`)
        .set("x-access-token", "invalid_token");

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(500);
      expect(res.text).to.include("Failed");
      expect(invoiceFromDatabase).to.not.eq(null);
    });
  });

  describe("When id is wrong", () => {
    it("Returns an error", async () => {
      const invoice = invoices[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/invoices/${String(invoice._id)}123123123`)
        .set("x-access-token", token);

      const invoiceFromDatabase = await Invoice.Model.findOne({
        donatorName: invoice.donatorName,
      });

      res.should.have.status(500);
      expect(res.text).to.include("id");
      expect(invoiceFromDatabase).to.not.eq(null);
    });
  });

  after((done) => {
    mongoose.connection.dropDatabase(process.env.TEST_DB);
    done();
  });
});
