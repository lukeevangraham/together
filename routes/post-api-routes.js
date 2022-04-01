let db = require("../models");
const { Op } = require("sequelize");

// ROUTES

module.exports = (app) => {
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
        order: [[ 'createdAt', 'DESC' ]]
      }).then((dbPost) => {
        res.json(dbPost);
      });
    });
  });

  //   POST route for saving a new post
  app.post("/api/posts", async (req, res) => {
    try {
      const dbPost = await db.Post.create(req.body);
      res.json(dbPost);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  });
};
