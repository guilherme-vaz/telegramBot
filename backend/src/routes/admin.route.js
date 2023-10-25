const express = require("express");
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.post("/register", AdminController.createAdmin);
router.post("/login", AdminController.loginAdmin);


module.exports = router; 
