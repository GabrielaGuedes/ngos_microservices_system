/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const Area = require("../../models/areas");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let areas = [];
let token = "";

const setTokenAndAreas = async () => {
  token = await getTokenForTests();
  await Area.Model.destroy({
    where: {},
  });
  const areasArray = [];
  areasArray.push(
    await Area.Model.create({
      name: "Area 1",
      description: "We like to drink water",
    }).then((res) => res)
  );
  areasArray.push(
    await Area.Model.create({
      name: "Area 2",
      description: "We like to eat water",
    }).then((res) => res)
  );
  areasArray.push(
    await Area.Model.create({
      name: "Area 3",
      description: "We like to cook water",
    }).then((res) => res)
  );
  areasArray.push(
    await Area.Model.create({
      name: "Area 4",
      description: "We like to fry water",
    }).then((res) => res)
  );
  areasArray.push(
    await Area.Model.create({
      name: "Area 5",
      description: "We like to lick water",
    }).then((res) => res)
  );
  areasArray.push(
    await Area.Model.create({
      name: "Area 6",
      description: "We like to see water",
    }).then((res) => res)
  );
  areas = areasArray;
};

const cleanTable = async () => {
  await Area.Model.destroy({
    where: {},
  });
};

describe("/GET Areas", () => {
  before(async () => {
    await setTokenAndAreas();
  });

  describe("When token is valid", () => {
    it("returns all areas ordered by name", async () => {
      const sortedAreasNames = areas.map((area) => area.name).sort();
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/areas/")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(areas.length);
      expect(res.body.map((area) => area.name)).to.eql(sortedAreasNames);
      expect(res.body[0].name).to.eql(sortedAreasNames[0]);
    });
  });

  describe("When token is invalid", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/areas/")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed", () => {
    it("returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/areas/");

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/GET :id Areas", () => {
  before(async () => {
    await setTokenAndAreas();
  });

  describe("When token is valid and id exists", () => {
    it("returns the area", async () => {
      const { id } = areas[1];
      const area = areas.find((ar) => ar.id === id);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/areas/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.id).to.eql(area.id);
      expect(res.body.name).to.eql(area.name);
      expect(res.body.description).to.eql(area.description);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = areas[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/areas/${id}`)
        .set("x-access-token", "invalid_token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = areas[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/areas/${id}`);

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns empty", async () => {
      const id = 200;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/areas/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.eql(null);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/POST Areas", () => {
  before(async () => {
    await setTokenAndAreas();
  });

  const baseAreaInfo = {
    name: "Area 7",
    description: "We like to dance with water",
  };

  describe("When token is valid and body is correct", () => {
    it("creates the area and return it", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        name: `1${baseAreaInfo.name}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/areas/")
        .set("x-access-token", token)
        .send(areaInfo);

      const areaFromDatabase = await Area.Model.findOne({
        where: { name: areaInfo.name },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(areaFromDatabase.id);
      expect(res.body.name).to.eq(areaInfo.name);
      expect(res.body.description).to.eq(areaInfo.description);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        name: `2${baseAreaInfo.name}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/areas/")
        .set("x-access-token", "invalid token")
        .send(areaInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        name: `3${baseAreaInfo.name}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/areas/")
        .send(areaInfo);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and body is missing required param (name)", () => {
    it("returns error", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        name: `4${baseAreaInfo.name}`,
      };
      delete areaInfo.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/areas/")
        .set("x-access-token", token)
        .send(areaInfo);

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
    });
  });

  describe("When token is valid but the name is already being used", () => {
    it("returns error", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        name: `${areas[0].name}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/areas/")
        .set("x-access-token", token)
        .send(areaInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("name");
    });
  });

  describe("When token is valid but there is additional property in body", () => {
    it("returns error", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        name: `5${baseAreaInfo.name}`,
        otherPropertyHere: "malicious content",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/areas/")
        .set("x-access-token", token)
        .send(areaInfo);

      res.should.have.status(400);
      expect(res.error.text).to.include("additional");
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/PUT :id Areas", () => {
  before(async () => {
    await setTokenAndAreas();
  });

  let baseAreaInfo = {};
  before((done) => {
    baseAreaInfo = {
      name: areas[1].name,
      description: areas[1].description,
    };
    done();
  });

  describe("When token is valid and body is correct", () => {
    it("updates the area and return it", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        description: "We like to drink juice",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/areas/${areas[1].id}`)
        .set("x-access-token", token)
        .send(areaInfo);

      const areaFromDatabase = await Area.Model.findOne({
        where: { name: areaInfo.name },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(areaFromDatabase.id);
      expect(res.body.description).to.eq(areaInfo.description);
      expect(res.body.name).to.eq(areaInfo.name);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        description: "We like to drink juice2",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/areas/${areas[1].id}`)
        .set("x-access-token", "invalid_token")
        .send(areaInfo);

      const areaFromDatabase = await Area.Model.findOne({
        where: { name: areaInfo.name },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(areaFromDatabase.description).to.not.eq(areaInfo.description);
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        description: "We like to drink juice3",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/areas/${areas[1].id}`)
        .send(areaInfo);

      const areaFromDatabase = await Area.Model.findOne({
        where: { name: areaInfo.name },
      });

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(areaFromDatabase.description).to.not.eq(areaInfo.description);
    });
  });

  describe("When token is valid and body is missing required param (name)", () => {
    it("returns error", async () => {
      const areaInfo = {
        ...baseAreaInfo,
        description: "We like to drink juice4",
      };
      delete areaInfo.name;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/areas/${areas[1].id}`)
        .set("x-access-token", token)
        .send(areaInfo);

      const areaFromDatabase = await Area.Model.findOne({
        where: { id: areas[1].id },
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("name");
      expect(areaFromDatabase.description).to.not.eq(areaInfo.description);
    });
  });

  describe("When token is valid but the name is already being used", () => {
    it("returns error", async () => {
      const areaInfo = {
        name: areas[0].name,
        description: "We like to drink juice5",
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/areas/${areas[1].id}`)
        .set("x-access-token", token)
        .send(areaInfo);

      const areaFromDatabase = await Area.Model.findOne({
        where: { name: areas[1].name },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("name");
      expect(areaFromDatabase.description).to.not.eq(areaInfo.description);
    });
  });

  after(async () => {
    await cleanTable();
  });
});

describe("/DELETE :id Areas", () => {
  before(async () => {
    await setTokenAndAreas();
  });

  describe("When token is valid and id exists", () => {
    it("deletes the area", async () => {
      const { id } = areas[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/areas/${id}`)
        .set("x-access-token", token);

      const areaFromDatabase = await Area.Model.findByPk(id);

      res.should.have.status(200);
      expect(res.body.message).to.include("Destroyed");
      expect(areaFromDatabase).to.eq(null);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = areas[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/areas/${id}`)
        .set("x-access-token", "invalid_token");

      const areaFromDatabase = await Area.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(areaFromDatabase).to.not.eq(null);
      expect(areaFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = areas[2];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/areas/${id}`);

      const areaFromDatabase = await Area.Model.findByPk(id);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(areaFromDatabase).to.not.eq(null);
      expect(areaFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns error", async () => {
      const { id } = 200;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/areas/${id}`)
        .set("x-access-token", token);

      const areaFromDatabase = await Area.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error.text).to.include("id");
      expect(areaFromDatabase).to.eq(null);
    });
  });

  after(async () => {
    await cleanTable();
  });
});
