let db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// ROUTES

module.exports = (app) => {
  // GET route for getting users in a query
  app.get("/api/users/:q", async (req, res) => {
    console.log("[USER ROUTES]: ", req.params.q.split(" "));
    try {
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
        include: [db.Image],
      });
      res.json(dbUser);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  });
};
