const express = require("express");
const {
  getRoles,
  getRolesCreate,
  postRolesCreate,
  getRolesEdit,
  patchRolesEdit,
  getPermissions,
  patchRolesPermissions,
} = require("../../controllers/admin/roles.controller");
const router = express.Router();

router.get("/", getRoles);

router.get("/create", getRolesCreate);
router.post("/create", postRolesCreate);

router.get("/edit/:id", getRolesEdit);
router.patch("/edit/:id", patchRolesEdit);

router.get("/permissions", getPermissions);
router.patch("/permissions", patchRolesPermissions);

module.exports = router;
