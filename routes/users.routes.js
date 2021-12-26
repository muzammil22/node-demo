module.exports = (app) => {
  const bodyParser = require("body-parser");
  const cors = require('cors');
  app.use(bodyParser.json());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  const users = require("../controllers/user.controller");

  var router = require("express").Router();

  // Create a new User subscription
  router.post("/create", users.create);

  // Retrieve all Users
  router.get("/getAllUsers", users.findAll);

  app.use("/api/users", router);
};
