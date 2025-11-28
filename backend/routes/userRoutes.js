const express = require("express");
const router = express.Router();

//! get all users
router.get("/");

//! get one user
router.get("/:id");

module.exports = router;
