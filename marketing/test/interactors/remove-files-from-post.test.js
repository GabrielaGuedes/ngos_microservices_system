/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const RemoveFilesFromPost = require("../../interactors/remove-files-from-post");
const posts = require("../../models/posts");
const files = require("../../models/files");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let postCreatedWithFiles = {};
let postCreatedWithoutFiles = {};

describe("RemoveFilesFromPost", () => {
  beforeEach(async () => {
    await files.Model.destroy({ where: {} });
    await posts.Model.destroy({ where: {} });

    postCreatedWithFiles = await posts.Model.create(
      {
        title: "Base post",
        text: "no more info",
        files: [
          {
            path: "/path/to/file",
          },
          {
            path: "/path/to/another/file",
          },
        ],
      },
      {
        include: files.Model,
      }
    );

    postCreatedWithoutFiles = await posts.Model.create({
      title: "Base post 2",
      text: "no more info for post 2",
    });
  });

  describe("When context passed is correct", () => {
    it("remove files from post", async () => {
      const context = {
        id: postCreatedWithFiles.id,
      };

      const res = await RemoveFilesFromPost.run(context);
      const postFromDatabase = await posts.Model.findOne({
        where: { title: postCreatedWithFiles.title },
        include: files.Model,
      });
      const filesInDatabase = await files.Model.findAll();

      expect(res.fileIds).to.eql([]);
      expect(postFromDatabase.files).to.eql([]);
      expect(filesInDatabase).to.eql([]);
    });
  });

  describe("When post has no files", () => {
    it("just does nothing", async () => {
      const context = {
        id: postCreatedWithoutFiles.id,
      };

      const res = await RemoveFilesFromPost.run(context);
      const postFromDatabase = await posts.Model.findOne({
        where: { title: postCreatedWithoutFiles.title },
        include: files.Model,
      });

      expect(res.fileIds).to.eql([]);
      expect(postFromDatabase.files).to.eql([]);
    });
  });

  after(async () => {
    await files.Model.destroy({ where: {} });
    await posts.Model.destroy({ where: {} });
  });
});
