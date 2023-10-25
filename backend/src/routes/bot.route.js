const express = require("express");
const BotController = require("../controllers/BotController");
const authenticateToken = require("../middlewares/webToken");
const router = express.Router();

router.get("/logs", BotController.getMessages);
router.post("/response", BotController.answerMessage);
router.delete("/delete/:id", BotController.deleteMessage);
router.get("/", (req, res) => {
    res.send("Home page funcionando")
})

module.exports = router;
