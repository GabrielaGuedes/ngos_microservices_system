/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const fs = require("fs");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let token = "";

describe("/POST add", () => {
  const filesAdded = [];
  before(async () => {
    token = await getTokenForTests();
  });

  describe("When adding 1 image", () => {
    it("store the images and return the path", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/file-uploads/add")
        .set("x-access-token", token)
        .set("Content-Type", "multipart/form-data")
        .attach(
          "multiple_files",
          fs.createReadStream("./test/controllers/files-for-tests/kitten.jpg"),
          "kitten.jpg"
        );

      filesAdded.push(res.body.images.map((img) => img.path)[0]);

      res.should.have.status(200);
      expect(res.body.images.map((img) => img.path)[0]).to.include(
        "public-files"
      );
    });
  });

  describe("When adding 2 images", () => {
    it("stores the images and return the path", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/file-uploads/add")
        .set("x-access-token", token)
        .set("Content-Type", "multipart/form-data")
        .attach(
          "multiple_files",
          fs.createReadStream("./test/controllers/files-for-tests/kitten.jpg"),
          "kitten.jpg"
        )
        .attach(
          "multiple_files",
          fs.createReadStream("./test/controllers/files-for-tests/kitten2.jpg"),
          "kitten2.jpg"
        );

      filesAdded.push(res.body.images.map((img) => img.path)[0]);
      filesAdded.push(res.body.images.map((img) => img.path)[1]);

      res.should.have.status(200);
      expect(res.body.images.map((img) => img.path)[0]).to.include(
        "public-files"
      );
      expect(res.body.images.length).to.eq(2);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/file-uploads/add")
        .set("x-access-token", "invalid token")
        .set("Content-Type", "multipart/form-data")
        .attach(
          "multiple_files",
          fs.createReadStream("./test/controllers/files-for-tests/kitten.jpg"),
          "kitten.jpg"
        );

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(res.body.images).to.eq(undefined);
    });
  });

  describe("When file is not supported", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/file-uploads/add")
        .set("x-access-token", token)
        .set("Content-Type", "multipart/form-data")
        .attach(
          "multiple_files",
          fs.createReadStream("./test/controllers/files-for-tests/kitten.zip"),
          "kitten.zip"
        );

      res.should.have.status(500);
      expect(res.error.text).to.include("allowed");
      expect(res.body.images).to.eq(undefined);
    });
  });

  after((done) => {
    filesAdded.forEach((path) => {
      fs.unlinkSync(path);
    });
    done();
  });
});

describe("/POST remove", () => {
  let imagePath = "";

  beforeEach(async () => {
    token = await getTokenForTests();
    const res = await chai
      .request(`http://localhost:${process.env.TEST_PORT}`)
      .post("/api/file-uploads/add")
      .set("x-access-token", token)
      .set("Content-Type", "multipart/form-data")
      .attach(
        "multiple_files",
        fs.createReadStream("./test/controllers/files-for-tests/kitten.jpg"),
        "kitten.jpg"
      );

    // eslint-disable-next-line prefer-destructuring
    imagePath = res.body.images.map((img) => img.path)[0];
  });

  describe("When removing file", () => {
    it("removes the file", async () => {
      const body = {
        paths: [imagePath],
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/file-uploads/remove")
        .set("x-access-token", token)
        .send(body);

      res.should.have.status(200);
      expect(res.body.success).to.eq(true);
    });
  });

  describe("When file doesnt exist", () => {
    it("store the images and return the path", async () => {
      const body = {
        paths: ["imagePath.jpg"],
      };
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/file-uploads/remove")
        .set("x-access-token", token)
        .send(body);

      res.should.have.status(500);
      expect(res.error).to.be.an("error");
    });
  });

  after((done) => {
    fs.unlinkSync(imagePath);
    done();
  });
});
