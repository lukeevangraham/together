let db = require("../models");
const { Op } = require("sequelize");

// ROUTES

module.exports = (app) => {
  //   POST route for saving a new post
  app.post("/api/posts", async (req, res) => {
    try {
      const dbPost = await db.Post.create(req.body);
      res.json(dbPost);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  });

  // GET route for getting all of the posts
  app.get("/api/posts", (req, res) => {
    db.Following.findAll({
      where: {
        userId: req.user.id,
      },
    }).then((dbFollowing) => {
      let peopleOfInterest = [];

      dbFollowing.forEach((personFollowed) => {
        peopleOfInterest.push(personFollowed.dataValues.followingUserId);
      });

      db.Post.findAll({
        where: {
          UserId: {
            [Op.or]: peopleOfInterest,
          },
        },
        include: [
          {
            model: db.User,
            attributes: ["firstName", "lastName", "id"],
            include: "ProfilePicture",
          },
        ],
        order: [["createdAt", "DESC"]],
      }).then((dbPost) => {
        res.json(dbPost);
      });
    });
  });

  // DELETE route for delete posts
  app.delete("/api/posts/:id", async (req, res) => {
    const dbPost = await db.Post.destroy({
      where: {
        id: req.params.id,
        UserId: req.user.id,
      },
    });
    res.json(dbPost);
  });
};
