/* eslint-disable no-undef */
process.env.NODE_ENV = "test";
const chai = require("chai");
const files = require("../../models/files");
const posts = require("../../models/posts");
const UpdatePostOrganizer = require("../../interactors/update-post-organizer");
require("dotenv/config");
require("../../config/db-connection");

const { expect } = chai;

const filePaths = [
  {
    path: "path/to/another/file",
  },
  {
    path: "path/to/file",
  },
];
let postCreatedWithFiles = {};

describe("UpdatePostOrganizer", () => {
  beforeEach(async () => {
    await files.Model.destroy({ where: {} });
    await posts.Model.destroy({ where: {} });

    postCreatedWithFiles = await posts.Model.create(
      {
        title: "Post 1",
        text: "Post 1 very cool",
        files: [
          {
            path: "path/to/file/default",
          },
        ],
      },
      {
        include: files.Model,
      }
    );
  });

  describe("When context passed is correct", () => {
    it("updates the post with new files", async () => {
      const newText = "Brand new text here";
      const context = {
        id: postCreatedWithFiles.id,
        postInfo: {
          text: newText,
        },
        filePaths,
      };

      const res = await UpdatePostOrganizer.run(context);
      const filesFromDatabase = await files.Model.findAll();
      const postsFromDatabase = await posts.Model.findAll({
        include: files.Model,
      });

      expect(res.post.dataValues).to.have.own.property("files");
      expect(postsFromDatabase.length).to.eq(1);
      expect(postsFromDatabase[0].text).to.eq(newText);
      expect(res.post.dataValues.files).to.have.same.members(filePaths);
      expect(filesFromDatabase.length).to.eq(filePaths.length);
      expect(
        postsFromDatabase[0].files.map((f) => f.path)
      ).to.have.same.members(filePaths.map((f) => f.path));
    });
  });

  after(async () => {
    await files.Model.destroy({ where: {} });
    await posts.Model.destroy({ where: {} });
  });
});
