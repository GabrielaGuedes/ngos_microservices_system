/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const DestroyPostOrganizer = require("../../interactors/destroy-post-organizer");
const posts = require("../../models/posts");
const files = require("../../models/files");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let postWithFiles = {};
let postWithNothing = {};

describe("DestroyPostOrganizer", () => {
  beforeEach(async () => {
    await files.Model.destroy({ where: {} });
    await posts.Model.destroy({ where: {} });

    postWithFiles = await posts.Model.create(
      {
        title: "Post with files",
        text: "Just a cool post",
        files: [
          {
            path: "path/to/file",
          },
          {
            path: "path/to/another/file",
          },
        ],
      },
      {
        include: files.Model,
      }
    );

    postWithNothing = await posts.Model.create({
      title: "Post without files",
      text: "no more info",
    });
  });

  describe("When post has files", () => {
    it("removes files and destroys post", async () => {
      const context = {
        id: postWithFiles.id,
      };

      const res = await DestroyPostOrganizer.run(context);
      const filesFromDatabase = await files.Model.findAll({
        where: { postId: postWithFiles.id },
      });
      const postFromDatabase = await posts.Model.findAll({
        where: { title: postWithFiles.title },
      });

      expect(res.fileIds).to.eql([]);
      expect(res.success).to.eql(true);
      expect(filesFromDatabase.length).to.eq(0);
      expect(postFromDatabase).to.eql([]);
    });
  });

  describe("When post has nothing", () => {
    it("destroys post", async () => {
      const context = {
        id: postWithNothing.id,
      };

      const res = await DestroyPostOrganizer.run(context);
      const postFromDatabase = await posts.Model.findAll({
        where: { title: postWithNothing.title },
      });

      expect(res.success).to.eql(true);
      expect(postFromDatabase).to.eql([]);
    });
  });

  after(async () => {
    await files.Model.destroy({ where: {} });
    await posts.Model.destroy({ where: {} });
  });
});
