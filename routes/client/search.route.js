const express = require("express");
const { search } = require("../../controllers/client/search.controller");
const router = express.Router();

router.get("/", search);

module.exports = router;