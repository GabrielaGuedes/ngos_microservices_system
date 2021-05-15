/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const files = require("../../models/files");
const posts = require("../../models/posts");
const DestroyPost = require("../../interactors/destroy-post");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

let postToBeDestroyed = {};

describe("DestroyPost", () => {
  beforeEach(async () => {
    await posts.Model.destroy({ where: {} });

    postToBeDestroyed = await posts.Model.create({
      title: "Post to be destroyed",
      text: "no more info",
    });
  });

  describe("When context passed is correct", () => {
    it("destroys the post", async () => {
      const context = {
        id: postToBeDestroyed.id,
      };

      const res = await DestroyPost.run(context);
      const postsFromDatabase = await posts.Model.findAll({
        where: { title: postToBeDestroyed.title },
      });

      expect(res.success).to.eql(true);
      expect(postsFromDatabase).to.eql([]);
    });
  });

  after(async () => {
    await posts.Model.destroy({ where: {} });
  });
});
