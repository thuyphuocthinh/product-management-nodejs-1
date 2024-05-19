const express = require("express");
const clientRoute = require("../product-management/routes/client/index.route");
const adminRoute = require("../product-management/routes/admin/index.route");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { prefixAdmin } = require("./config/system");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
require("dotenv").config();

const app = express();
// flash
app.use(cookieParser("THUYPHUOCTHINH"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// method-override
app.use(methodOverride("_method"));

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// connect db
database.connect();

// env
const port = process.env.PORT;

// static files
app.use(express.static("public"));

// view engine
app.set("views", "./views");
app.set("view engine", "pug");

// App local variables
app.locals.prefixAdmin = prefixAdmin;

// Routes
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
