const express = require("express");
const router = express.Router();

const playerStatsController = require("../controllers/PlayerStatsController");
const authMiddleware = require("../middleware/AuthMiddleware");

const { UpdatePlayerStatsValidationRules, PlayerNameValidationRules } = require("../validations/PlayerValidation");

//add authentication
//router.use(authMiddleware("stats"));

router.get("",authMiddleware("player.stats.get"), PlayerNameValidationRules(), playerStatsController.getStats);
router.post("",authMiddleware("player.stats.update"), UpdatePlayerStatsValidationRules(), playerStatsController.updateStats);

router.post("/init",authMiddleware("player.stats.init"), PlayerNameValidationRules(), playerStatsController.init);
router.get("/all",authMiddleware("player.stats.init"), playerStatsController.getAllStats)

module.exports = router;
