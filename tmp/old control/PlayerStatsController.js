const { validationResult, matchedData } = require("express-validator");
const PlayerStatsHelper = require("../services/PlayerStatsHelper");

const PlayerStatsController = {
  updateStats: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player, stats } = matchedData(req);
      
      const result = await PlayerStatsHelper.updateStats(player, stats);
      if(result == null){
        return res.status(404).json({message: "Player Stats for the player does not exist", player});
      }

      res.status(201).json({ message: "Stats Updated successfully", result, player });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "UpdateStats failed check console for error" });
    }
  },

  getStats: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      const { player } = matchedData(req);

      const stats = await PlayerStatsHelper.getStats(player);
      if(stats == null){
        return res.status(404).json({message: "Player Stats for the player does not exist", player});
      }

      res.status(200).json({player, stats});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "GetStats failed check console for error" });
    }
  },

  getAllStats: async (req, res) => {
    try {
      const data = await PlayerStatsHelper.getAllStats();
      //todo sort data
      res.status(200).json(data);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "GetAllStats failed, check console for error" });
    }
  },

};

module.exports = PlayerStatsController;
