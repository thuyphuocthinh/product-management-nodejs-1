const express = require("express");
const clientRoute = require("../product-management/routes/client/index.route");
const adminRoute = require("../product-management/routes/admin/index.route");
const database = require("./config/database");
const { prefixAdmin } = require("./config/system");
require("dotenv").config();

const app = express();

// connect db
database.connect();

// env
const port = process.env.PORT;

// static files
app.use(express.static("public"));

// view engine
app.set("views", "./views");
app.set("view engine", "pug");

// Routes
clientRoute(app);
adminRoute(app);

// App local variables
app.locals.prefixAdmin = prefixAdmin;

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
