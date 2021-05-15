/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const UpdatePost = require("../../interactors/update-post");
const posts = require("../../models/posts");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let createdPost = {};

describe("UpdatePost", () => {
  beforeEach(async () => {
    await posts.Model.destroy({ where: {} });
    createdPost = await posts.Model.create({
      title: "Base post",
      text: "First post created",
    });
  });

  describe("When context passed is correct", () => {
    it("updates an post", async () => {
      const newTitle = "New title for post";
      const newText = "Another info";
      const context = {
        post: createdPost,
        postInfo: {
          title: newTitle,
          text: newText,
        },
      };

      const res = await UpdatePost.run(context);
      const postFromDatabase = await posts.Model.findOne({
        where: {
          title: createdPost.title,
        },
      });

      expect(res).to.have.own.property("post");
      expect(res.post.title).to.eq(postFromDatabase.title);
      expect(postFromDatabase.title).to.eq(newTitle);
      expect(res.post.text).to.eq(postFromDatabase.text);
      expect(postFromDatabase.text).to.eq(newText);
    });
  });

  describe("When title from context is null", () => {
    it("doesn't update post", async () => {
      const newText = "Another info";
      const context = {
        post: createdPost,
        postInfo: {
          text: newText,
          title: null,
        },
      };

      await UpdatePost.run(context).catch(async (error) => {
        const postFromDatabase = await posts.Model.findOne({
          where: { text: newText },
        });

        expect(error).to.be.an("error");
        expect(postFromDatabase).to.eq(null);
      });
    });
  });

  after(async () => {
    await posts.Model.destroy({ where: {} });
  });
});
