let db = require("../models");
const Sequelize = require("sequelize");
const { or } = Sequelize.Op;

const checkUsersForAlreadyFollowing = (users, peopleBeingFollowed) => {
  let idsOfPoepleUserFollows = [];

  peopleBeingFollowed.forEach((follow) => {
    idsOfPoepleUserFollows.push(follow.dataValues.followingUserId);
  });

  console.log("IDs: ", idsOfPoepleUserFollows);

  users.forEach((user) => {
    user.dataValues.followed = idsOfPoepleUserFollows.includes(
      user.dataValues.id
    );
  });

  return users;
};

// ROUTES

module.exports = (app) => {
  // GET route for getting users in a query
  app.get("/api/users/:q", async (req, res) => {
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
      }

      dbFollows = await db.Following.findAll({
        where: { UserId: req.user.id },
        attributes: ["followingUserId"],
      });

      res.json(checkUsersForAlreadyFollowing(dbUser, dbFollows));
    } catch (error) {
      console.log("ERROR: ", error);
    }
  });
};
