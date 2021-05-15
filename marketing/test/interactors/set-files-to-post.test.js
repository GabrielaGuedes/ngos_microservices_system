/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const SetFilesToPost = require("../../interactors/set-files-to-post");
const files = require("../../models/files");
const posts = require("../../models/posts");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let post = {};
const filePaths = [
  {
    path: "path/to/another/file",
  },
  {
    path: "path/to/file",
  },
];

describe("SetFilesToPost", () => {
  beforeEach(async () => {
    await files.Model.destroy({ where: {} });
    await posts.Model.destroy({ where: {} });

    post = await posts.Model.create({
      title: "Post 1",
      text: "Post 1 very cool",
    });
  });

  describe("When context passed is correct", () => {
    it("adds files to post", async () => {
      const context = {
        post,
        filePaths: [filePaths[0]],
      };

      const res = await SetFilesToPost.run(context);
      const filesFromDatabase = await files.Model.findAll();
      const postFromDatabase = await posts.Model.findOne({
        where: { id: post.id },
        include: [files.Model],
      });

      expect(res.post.dataValues).to.have.own.property("files");
      expect(res.post.dataValues.files).to.have.same.members([filePaths[0]]);
      expect(postFromDatabase.files.map((f) => f.path)).to.have.same.members([
        filePaths[0].path,
      ]);
      expect(filesFromDatabase.length).to.eq(1);
    });
  });

  describe("When adding more than 1 file", () => {
    it("add all the files", async () => {
      const context = {
        post,
        filePaths,
      };

      const res = await SetFilesToPost.run(context);
      const filesFromDatabase = await files.Model.findAll();
      const postFromDatabase = await posts.Model.findOne({
        where: { id: post.id },
        include: [files.Model],
      });

      expect(res.post.dataValues).to.have.own.property("files");
      expect(res.post.dataValues.files).to.have.same.members(filePaths);
      expect(postFromDatabase.files.map((f) => f.path)).to.have.same.members(
        filePaths.map((f) => f.path)
      );
      expect(filesFromDatabase.length).to.eq(filePaths.length);
    });
  });

  describe("When array is empty", () => {
    it("doesn't add files", async () => {
      const context = {
        post,
        filePaths: [],
      };

      const res = await SetFilesToPost.run(context);
      const filesFromDatabase = await files.Model.findAll();
      const postFromDatabase = await posts.Model.findOne({
        where: { id: post.id },
        include: [files.Model],
      });

      expect(res.post.dataValues).to.have.own.property("files");
      expect(res.post.dataValues.files).to.eql([]);
      expect(postFromDatabase.files).to.eql([]);
      expect(filesFromDatabase.length).to.eq(0);
    });
  });

  after(async () => {
    await files.Model.destroy({ where: {} });
    await posts.Model.destroy({ where: {} });
  });
});
