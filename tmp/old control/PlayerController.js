const { validationResult, matchedData } = require("express-validator");
const PlayerHelper = require("../services/PlayerHelper");
const PlayerStatsHelper = require("../services/PlayerStatsHelper");
const PlayerStandingsHelper = require("../services/PlayerStandingsHelper");

const PlayerController = {
  getAll: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      const { player } = matchedData(req);

      const info = await PlayerHelper.getInfo(player);
      if(info == null){
        return res.status(404).json({message: "Player Info for the player does not exist", player});
      }

      var playerInfo = await PlayerHelper.getInfo(player);
      if(playerInfo == null){
        //send code 200 as non existence of values is handled by client
        return res.status(200).json({message: "Player does not exist", player});
      }

      const data = {};
      data.player = player;
      data.info = playerInfo;
      data.stats = await PlayerStatsHelper.getStats(player);
      standing = {};
      standing.stats = await PlayerStandingsHelper.getAllStatsStanding(player);
      standing.elo = await PlayerStandingsHelper.getAllEloStanding(player);
      data.standings = standing;

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "GetInfo failed check console for error" });
    }
  },
};

module.exports = PlayerController;
