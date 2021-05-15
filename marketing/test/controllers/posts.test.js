/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const Post = require("../../models/posts");
const files = require("../../models/files");
const { getTokenForTests } = require("../../utils/get-token-for-tests");
require("../../index");

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

let posts = [];
let token = "";

const getTokenAndCreateRecords = async () => {
  token = await getTokenForTests();

  const postsCreated = [];
  postsCreated.push(
    await Post.Model.create(
      {
        title: "Example title for post",
        text: "I like to drink water",
        postedAt: "2021-01-01",
        peopleReached: 1000,
        files: [
          {
            path: "path/to/file/file1",
          },
          {
            path: "path/to/file/file2",
          },
        ],
      },
      {
        include: [files.Model],
      }
    ).then((res) => res)
  );
  postsCreated.push(
    await Post.Model.create({
      title: "Example title for post2",
      text: "I like to drink water",
      postedAt: "2021-03-02",
      peopleReached: 5000,
    }).then((res) => res)
  );
  postsCreated.push(
    await Post.Model.create({
      title: "Example title for post3",
      text: "I like to drink water",
      postedAt: "2021-10-01",
      peopleReached: 10000,
    }).then((res) => res)
  );
  postsCreated.push(
    await Post.Model.create({
      title: "Example title for post4",
      text: "I like to drink water",
      postedAt: "2022-01-01",
    }).then((res) => res)
  );
  postsCreated.push(
    await Post.Model.create({
      title: "Example title for post5",
      text: "I like to drink water",
    }).then((res) => res)
  );
  postsCreated.push(
    await Post.Model.create({
      title: "Example title for post6",
      text: "I like to drink water",
    }).then((res) => res)
  );
  posts = postsCreated;
};

const cleanTables = async () => {
  await files.Model.destroy({ where: {} });
  await Post.Model.destroy({ where: {} });
};

describe("/GET Posts", () => {
  beforeEach(async () => {
    await cleanTables();
    await getTokenAndCreateRecords();
  });

  describe("When token is valid and there are no filters", () => {
    it("returns all posts", async () => {
      const postsTitles = posts.map((post) => post.title);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/posts/")
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(posts.length);
      expect(res.body.map((post) => post.title)).to.have.same.members(
        postsTitles
      );
    });
  });

  describe("When token is invalid and there are no filters", () => {
    it("returns error", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/posts/")
        .set("x-access-token", "invalid token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and there are no filters", () => {
    it("returns unauthorized", async () => {
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/posts/");

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid filtered by posted", () => {
    it("returns some posts", async () => {
      const postsPosted = posts.filter((post) => post.postedAt !== null);
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/posts/")
        .query({ posted: true })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(postsPosted.length);
      expect(res.body.map((post) => post.id)).to.have.same.members(
        postsPosted.map((post) => post.id)
      );
    });
  });

  describe("When token is valid and orderByPeopleReached", () => {
    it("returns all posts ordered by peopleReached", async () => {
      const sortedPostsPeopleReached = posts
        .filter((post) => post.peopleReached !== null)
        .map((post) => post.peopleReached)
        .sort((a, b) => a - b)
        .reverse();

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get("/api/posts/")
        .query({ orderByPeopleReached: true })
        .set("x-access-token", token);

      res.should.have.status(200);
      res.body.should.be.a("array");
      expect(res.body.length).to.eq(sortedPostsPeopleReached.length);
      expect(res.body.map((post) => post.peopleReached)).to.eql(
        sortedPostsPeopleReached
      );
      expect(res.body[0].peopleReached).to.eql(sortedPostsPeopleReached[0]);
    });
  });

  after(async () => {
    await cleanTables();
  });
});

describe("/GET :id Posts", () => {
  beforeEach(async () => {
    await cleanTables();
    await getTokenAndCreateRecords();
  });

  describe("When token is valid and id exists", () => {
    it("returns the post", async () => {
      const { id } = posts[1];
      const post = posts[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/posts/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body.id).to.eql(post.id);
      expect(res.body.title).to.eql(post.title);
      expect(res.body.text).to.eql(post.text);
      expect(res.body.files).to.eql(post.files || []);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = posts[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/posts/${id}`)
        .set("x-access-token", "invalid_token");

      res.should.have.status(500);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = posts[1];
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/posts/${id}`);

      res.should.have.status(401);
      res.body.should.not.be.a("array");
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns empty", async () => {
      const id = posts[1].id + 500;
      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .get(`/api/posts/${id}`)
        .set("x-access-token", token);

      res.should.have.status(200);
      expect(res.body).to.eql(null);
    });
  });

  after(async () => {
    await cleanTables();
  });
});

describe("/POST Posts", () => {
  beforeEach(async () => {
    await cleanTables();
    await getTokenAndCreateRecords();
  });

  const basePostInfo = {
    title: "G Example title",
    texto: "I like to drink water",
  };

  describe("When token is valid and body is correct", () => {
    it("creates the post and return it", async () => {
      const postInfo = {
        ...basePostInfo,
        title: `1${basePostInfo.title}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/posts/")
        .set("x-access-token", token)
        .send(postInfo);

      const postFromDatabase = await Post.Model.findOne({
        where: { title: postInfo.title },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(postFromDatabase.id);
      expect(res.body.title).to.eq(postInfo.title);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const postInfo = {
        ...basePostInfo,
        title: `2${basePostInfo.title}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/posts/")
        .set("x-access-token", "invalid token")
        .send(postInfo);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const postInfo = {
        ...basePostInfo,
        title: `3${basePostInfo.title}`,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/posts/")
        .send(postInfo);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
    });
  });

  describe("When token is valid and body is missing required param (title)", () => {
    it("returns error", async () => {
      const postInfo = {
        ...basePostInfo,
        text: `4${basePostInfo.text}`,
      };
      delete postInfo.title;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .post("/api/posts/")
        .set("x-access-token", token)
        .send(postInfo);

      const postFromDatabase = await Post.Model.findOne({
        where: { text: postInfo.text },
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("title");
      expect(postFromDatabase).to.eq(null);
    });
  });

  after(async () => {
    await cleanTables();
  });
});

describe("/PUT :id Posts", () => {
  beforeEach(async () => {
    await cleanTables();
    await getTokenAndCreateRecords();
  });

  let basePostInfo = {};
  before((done) => {
    basePostInfo = {
      title: `${posts[1].title}+1212`,
      text: posts[1].text,
      postedAt: posts[1].postedAt,
      peopleReached: posts[1].peopleReached,
    };
    done();
  });

  describe("When token is valid and body is correct", () => {
    it("updates the post and return it", async () => {
      const postInfo = {
        ...basePostInfo,
        text: "Salvador",
        peopleReached: 10000000,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/posts/${posts[1].id}`)
        .set("x-access-token", token)
        .send(postInfo);

      const postFromDatabase = await Post.Model.findOne({
        where: { title: postInfo.title },
      });

      res.should.have.status(200);
      expect(res.body.id).to.eq(postFromDatabase.id);
      expect(res.body.text).to.eq(postInfo.text);
      expect(res.body.peopleReached).to.eq(postInfo.peopleReached);
      expect(res.body.title).to.eq(postInfo.title);
    });
  });

  describe("When token is invalid and body is correct", () => {
    it("returns error", async () => {
      const postInfo = {
        ...basePostInfo,
        text: "Salvador2",
        peopleReached: 5511966666662,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/posts/${posts[1].id}`)
        .set("x-access-token", "invalid_token")
        .send(postInfo);

      const postFromDatabase = await Post.Model.findOne({
        where: { title: postInfo.title },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(postFromDatabase.text).to.not.eq(postInfo.text);
      expect(postFromDatabase.peopleReached).to.not.eq(postInfo.peopleReached);
    });
  });

  describe("When token is not passed and body is correct", () => {
    it("returns unauthorized", async () => {
      const postInfo = {
        ...basePostInfo,
        text: "Salvador3",
        peopleReached: 5511966666663,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/posts/${posts[1].id}`)
        .send(postInfo);

      const postFromDatabase = await Post.Model.findOne({
        where: { title: postInfo.title },
      });

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(postFromDatabase.text).to.not.eq(postInfo.text);
      expect(postFromDatabase.peopleReached).to.not.eq(postInfo.peopleReached);
    });
  });

  describe("When token is valid and body is missing required param (title)", () => {
    it("returns error", async () => {
      const postInfo = {
        ...basePostInfo,
        text: "Salvador4",
        peopleReached: 5511966666664,
      };
      delete postInfo.title;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/posts/${posts[1].id}`)
        .set("x-access-token", token)
        .send(postInfo);

      const postFromDatabase = await Post.Model.findOne({
        where: { title: postInfo.title },
      });

      res.should.have.status(400);
      expect(res.error.text).to.include("title");
      expect(postFromDatabase.text).to.not.eq(postInfo.text);
      expect(postFromDatabase.peopleReached).to.not.eq(postInfo.peopleReached);
    });
  });

  describe("When token is valid but the title is already being used", () => {
    it("returns error", async () => {
      const postInfo = {
        ...basePostInfo,
        text: "Salvador5",
        peopleReached: 5511966666665,
        title: posts[2].title,
      };

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .put(`/api/posts/${posts[1].id}`)
        .set("x-access-token", token)
        .send(postInfo);

      const postFromDatabase = await Post.Model.findOne({
        where: { title: posts[1].title },
      });

      res.should.have.status(500);
      expect(res.error.text).to.include("title");
      expect(postFromDatabase.text).to.not.eq(postInfo.text);
      expect(postFromDatabase.peopleReached).to.not.eq(postInfo.peopleReached);
    });
  });

  after(async () => {
    await cleanTables();
  });
});

describe("/DELETE :id Posts", () => {
  beforeEach(async () => {
    await cleanTables();
    await getTokenAndCreateRecords();
  });

  describe("When token is valid and id exists", () => {
    it("deletes the post", async () => {
      const { id } = posts[0];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/posts/${id}`)
        .set("x-access-token", token);

      const postFromDatabase = await Post.Model.findByPk(id);

      console.log(res.error.error);
      res.should.have.status(200);
      expect(res.body.message).to.include("Destroyed");
      expect(postFromDatabase).to.eq(null);
    });
  });

  describe("When token is invalid and id exists", () => {
    it("returns error", async () => {
      const { id } = posts[1];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/posts/${id}`)
        .set("x-access-token", "invalid_token");

      const postFromDatabase = await Post.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error.text).to.include("Failed");
      expect(postFromDatabase).to.not.eq(null);
      expect(postFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is not passed and id exists", () => {
    it("returns unauthorized", async () => {
      const { id } = posts[2];

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/posts/${id}`);

      const postFromDatabase = await Post.Model.findByPk(id);

      res.should.have.status(401);
      expect(res.error.text).to.include("No");
      expect(res.error.text).to.include("provided");
      expect(postFromDatabase).to.not.eq(null);
      expect(postFromDatabase.id).to.eq(id);
    });
  });

  describe("When token is valid and id doesn't exist", () => {
    it("returns error", async () => {
      const id = posts[0].id + 500;

      const res = await chai
        .request(`http://localhost:${process.env.TEST_PORT}`)
        .delete(`/api/posts/${id}`)
        .set("x-access-token", token);

      const postFromDatabase = await Post.Model.findByPk(id);

      res.should.have.status(500);
      expect(res.error).to.be.an("error");
      expect(postFromDatabase).to.eq(null);
    });
  });

  after(async () => {
    await cleanTables();
  });
});
