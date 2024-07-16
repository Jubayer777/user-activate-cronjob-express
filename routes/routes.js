const express = require("express");
const { createUser,activateUser,deactivateUser } = require("../controllers/user.controller");
const router = express.Router();

router.post("/user", createUser);
router.post("/activate-user", activateUser);
router.post("/deactivate-user", deactivateUser);
module.exports = router;
