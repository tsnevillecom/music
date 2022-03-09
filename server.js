const { HTTP_PORT } = require("./config");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
require("./db/mongoose");

const authenticate = require("./middleware/auth");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.json());

//Routes
const userRoutes = require("./router/users.route");
const authRoutes = require("./router/auth.route");
const bandRoutes = require("./router/bands.route");
app.use(authRoutes);
app.use("/users", userRoutes);
app.use("/bands", bandRoutes);

app.listen(HTTP_PORT, () => {
  console.log(`Server listening at port ${HTTP_PORT}.`);
});
