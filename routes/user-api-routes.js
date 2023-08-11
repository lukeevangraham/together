let db = require("../models");
const Sequelize = require("sequelize");
const { or } = Sequelize.Op;

// ROUTES

module.exports = (app) => {
  // GET route for getting users in a query
  app.get("/api/users/:q", async (req, res) => {
    console.log("[USER ROUTES]: ", req.params.q.split(" ").length);
    console.log("REQ: ", req.user);
    try {
      if (req.params.q.split(" ").length >= 2) {
        dbUser = await db.User.findAll({
          where: Sequelize.where(
            Sequelize.fn(
              "CONCAT",
              Sequelize.col("firstname"),
              " ",
              Sequelize.col("lastName")
            ),
            req.params.q
          ),
          attributes: ["firstName", "lastName", "id"],
          include: "ProfilePicture",
        });
      } else if (req.params.q.split(" ").length === 1) {
        dbUser = await db.User.findAll({
          where: {
            [or]: [{ firstName: req.params.q }, { lastName: req.params.q }],
          },
          attributes: ["firstName", "lastName", "id"],
          include: "ProfilePicture",
        });

        dbFollows = await db.Following.findAll({
          where: { UserId: req.user.id },
          attributes: ["followingUserId"],
        });
        console.log("FOLLOWS: ", dbFollows);
        console.log("U: ", dbUser);
      }

      let idsOfPoepleUserFollows = [];

      dbFollows.forEach((follow) => {
        idsOfPoepleUserFollows.push(follow.dataValues.followingUserId);
      });

      console.log("IDs: ", idsOfPoepleUserFollows);

      dbUser.forEach((user) => {
        user.dataValues.followed = idsOfPoepleUserFollows.includes(
          user.dataValues.id
        );
      });

      console.log("USERS: ", dbUser);

      res.json(dbUser);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  });
};
