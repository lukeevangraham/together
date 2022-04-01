const db = require("../models");

module.exports = (app) => {
    // POST route for saving a new following
    app.post("/api/following", async (req, res) => {
        console.log("BODY: ", req.body)
        try {
            const dbFollowing = await db.Following.create(req.body)
            res.json(dbFollowing);
            
        } catch (error) {
            console.log("ERROR: ", error)
            res.json(error)
        }
    })
}