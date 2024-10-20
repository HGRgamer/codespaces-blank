const express = require("express");
const router = express.Router();

const playerSettingsController = require("../controllers/PlayerSettingsController");
const playerStatsController = require("../controllers/PlayerStatsController");

const authMiddleware = require("../middleware/AuthMiddleware");

const { UpdatePlayerStatsValidationRules, PlayerNameValidationRules, UpdatePlayerSettingsValidationRules, UpdatePlayerKitsValidationRules, UpdatePlayerInfoValidationRules } = require("../validations/PlayerValidation");
const PlayerKitsController = require("../controllers/PlayerKitsController");
const PlayerStandingsController = require("../controllers/PlayerStandingsController");
const PlayerInfoController = require("../controllers/PlayerInfoController");
const PlayerController = require("../controllers/PlayerController");
const ServerController = require("../controllers/ServerController");

router.get("/:player",authMiddleware("player"), PlayerNameValidationRules(), PlayerController.getAll);

//settings
// router.post("/:player/settings",authMiddleware("player.settings.update"), UpdatePlayerSettingsValidationRules(), playerSettingsController.updateSettings);
// router.get("/:player/settings",authMiddleware("player.settings.get"), PlayerNameValidationRules(), playerSettingsController.getSettings);

//stats
router.get("/:player/stats",authMiddleware("player.stats.get"), PlayerNameValidationRules(), playerStatsController.getStats);
//all stats of all players
// router.get("/:player/stats/all", authMiddleware("player.stats.getAll"), playerStatsController.getAllStats);
router.post("/:player/stats",authMiddleware("player.stats.update"), UpdatePlayerStatsValidationRules(), playerStatsController.updateStats);

//kits
// router.get("/:player/kit", authMiddleware("player.kit.get"), PlayerNameValidationRules(), PlayerKitsController.getKits);
// router.post("/:player/kit", authMiddleware("player.kit.update"), UpdatePlayerKitsValidationRules(), PlayerKitsController.updateKits);

//standings
router.get("/:player/standings", authMiddleware("player.standings.get"), PlayerNameValidationRules(), PlayerStandingsController.getAllStandings);
// router.get("/:player/standings/elo", authMiddleware("player.standings.get"), PlayerNameValidationRules(), PlayerStandingsController.getEloStanding);
// router.get("/:player/standings/stats", authMiddleware("player.standings.get"), PlayerNameValidationRules(), PlayerStandingsController.getStatsStanding);

//info
router.get("/:player/info", authMiddleware("player.info.get"), PlayerNameValidationRules(), PlayerInfoController.getInfo);
router.post("/:player/info", authMiddleware("player.info.update"), UpdatePlayerInfoValidationRules(), PlayerInfoController.updateInfo);

router.get("/leaderboard", authMiddleware("server.player.get"), ServerController.getLeaderboard);


module.exports = router;