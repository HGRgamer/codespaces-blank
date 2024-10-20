const express = require("express");
const router = express.Router();

const playerStatsController = require("../controllers/PlayerStatsController");

const authMiddleware = require("../middleware/AuthMiddleware");

const { PlayerNameValidationRules, UpdatePlayerInfoValidationRules, UpdatePlayerRankIdValidationRules } = require("../validations/UserValidation");
const PlayerStandingsController = require("../controllers/PlayerStandingsController");
const PlayerInfoController = require("../controllers/PlayerInfoController");
const PlayerController = require("../controllers/PlayerController");
const ServerController = require("../controllers/UserController");

router.get("/:player",authMiddleware("player"), PlayerNameValidationRules(), PlayerController.getAll);

router.get("/:player/stats",authMiddleware("player.get"), PlayerNameValidationRules(), playerStatsController.getStats);

router.get("/:player/standings", authMiddleware("player.get"), PlayerNameValidationRules(), PlayerStandingsController.getAllStandings);

router.get("/:player/info", authMiddleware("player.get"), PlayerNameValidationRules(), PlayerInfoController.getInfo);
router.post("/:player/info", authMiddleware("player.post"), UpdatePlayerInfoValidationRules(), PlayerInfoController.updateInfo);

router.get("/leaderboard", authMiddleware("player.get"), ServerController.getLeaderboard);

router.get("/:player/rankId", authMiddleware("player.get"), PlayerNameValidationRules(), ServerController.getRankId);
router.post("/:player/rankId", authMiddleware("player.post"), UpdatePlayerRankIdValidationRules(), ServerController.updateRankId);

module.exports = router;