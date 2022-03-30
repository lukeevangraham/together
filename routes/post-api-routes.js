let db = require("../models");

// ROUTES

module.exports = (app) => {
  // GET route for getting all of the posts
  app.get("/api/posts", async (req, res) => {
    let query = {};
    req.query.user_id ? (query.UserId = req.query.user_id) : null;
    try {
      const dbPost = await db.Post(
        findAll({
          where: query,
        })
      );
      res.json(dbPost);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  });

  //   POST route for saving a new post
  app.post("/api/posts", async (req, res) => {
      console.log("[Post ROUTE] BODY: ", req.body)
    try {
      const dbPost = await db.Post.create(req.body);
      res.json(dbPost);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  });
};
