const db = require("../models");

module.exports = (app) => {
  // POST route for saving a new following
  app.post("/api/following", async (req, res) => {
    console.log("BODY: ", req.body);
    try {
      const dbFollowing = await db.Following.create(req.body);
      res.json(dbFollowing);
    } catch (error) {
      console.log("ERROR: ", error);
      res.json(error);
    }
  });

  app.delete("/api/following/:id/:user", async (req, res) => {
    try {
      const response = await db.Following.destroy({
        where: {
          UserId: req.params.user,
          followingUserId: req.params.id,
        },
      });
      res.json(response)
    } catch (error) {
      console.log("ERROR: ", error);
      res.json(error);
    }
  });
};
