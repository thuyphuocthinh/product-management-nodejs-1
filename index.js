const express = require("express");
const route = require("../product-management/routes/client/index.route");
const app = express();
const port = 3030;

app.set("views", "./views");
app.set("view engine", "pug");

// Routes
route(app);

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
