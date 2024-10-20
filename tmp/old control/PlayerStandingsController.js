const { validationResult, matchedData } = require("express-validator");
const PlayerStandingsHelper = require("../services/PlayerStandingsHelper");

const PlayerStandingsController = {
  bulkGet: async (req, res) => {
    try {
     errors = [];
     success = [];

     for(const value of req.body){
      const { player, info, stats, settings, kits } = value;
      //note if a setting is not given then old value will not change !!
      //note if a kit is not given then old value will change to empty !!
      //all stats are required

      var isNewPlayer = false;

      if((await PlayerHelper.playerExists(player)) == false){
        await initPlayer(player);
        isNewPlayer = true;
      }

      const result = await updateData(player, info, stats, settings, kits);
      if(result == false){
        console.log("Player data update failed, trying to auto fix it");
        await tryFixPlayer(player);
        const result2 = await updateData(player, stats, settings, kits);
        if(result2 == false){
          console.error("Auto fix failed (on bulk)", {player});
          errors.push({message: "Some error occured while trying to save player data. Auto fix failed, check console for more info", player});
        } else {
          console.success("Auto fix success", {player});
          success.push({message: "Updated player data successfully", player, isNewPlayer});
        }
      } else {
        success.push({message: "Updated player data successfully", player, isNewPlayer});
      }
    }
      res.status(201).json({errors: errors.length, success: success.length,result: success.concat(errors)});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Updated player data(bulkPost) failed check console for error" });
    }
  },

  getAllStandings: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player } = matchedData(req);
      standings = {};
      standings.stats = await PlayerStandingsHelper.getAllStatsStanding(player);
      standings.elo = await PlayerStandingsHelper.getAllEloStanding(player);
      res.status(200).json(standings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get player data(getStandings) failed check console for error" });
    }
  },

  getEloStanding: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player } = matchedData(req);
      const standing = await PlayerStandingsHelper.getEloStanding(player);
      res.status(200).json(standing);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get player elo standing failed, check console for error" });
    }
  },

  getStatsStanding: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player } = matchedData(req);
      const standing = await PlayerStandingsHelper.getStatsStanding(player);
      res.status(200).json(standing);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get player stats standing failed, check console for error" });
    }
  },
};

module.exports = PlayerStandingsController;
