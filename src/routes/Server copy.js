const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/AuthMiddleware");

const { PlayerNameValidationRules, UpdatePlayerRankIdValidationRules } = require("../validations/UserValidation");
const { ServerPostValidationRules, ServerBulkPostValidationRules } = require("../validations/ServerValidation");
const ServerController = require("../controllers/UserController");
const PlayerStandingsController = require("../controllers/PlayerStandingsController");

//settings
router.post("/player/bulk", authMiddleware("server.player.update.bulk"), ServerBulkPostValidationRules(), ServerController.bulkPost);

router.post("/player/:player", authMiddleware("server.player.update"), ServerPostValidationRules(), ServerController.post);
router.get("/player/:player", authMiddleware("server.player.get"), PlayerNameValidationRules(), ServerController.get);

router.post("/player/:player/rankId", authMiddleware("server.player.update"), UpdatePlayerRankIdValidationRules(), ServerController.updateRankId);
router.get("/player/:player/rankId", authMiddleware("server.player.get"), PlayerNameValidationRules(), ServerController.getRankId);

router.get("/player/standings/bulk", authMiddleware("server.player.get"), PlayerNameValidationRules(), PlayerStandingsController.getAllStandings);
router.get("/player/:player/standings", authMiddleware("server.player.get"), PlayerNameValidationRules(), PlayerStandingsController.getAllStandings);
router.get("/leaderboard", authMiddleware("server.player.get"), ServerController.getLeaderboard);

router.get("/player/:player/skin", authMiddleware("server.player.get"), PlayerNameValidationRules(), ServerController.getSkin);
module.exports = router;