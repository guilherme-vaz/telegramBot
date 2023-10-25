const express = require("express");
const router = express.Router();

const botRoutes = require("./bot.route");
const adminRoutes = require("./admin.route");

router.use(botRoutes);
router.use(adminRoutes);


module.exports = router;
