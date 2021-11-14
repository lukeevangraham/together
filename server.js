const express = require("express");
const session = require("express-session")
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const passport = require("./config/passport");
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "cefalu pizza", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/api-routes")(app)

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(() => {
  app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
