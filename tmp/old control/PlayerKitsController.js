const { validationResult, matchedData } = require("express-validator");
const PlayerKitsHelper = require("../services/PlayerKitsHelper");

const PlayerKitsController = {
  updateKits: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player, kits } = matchedData(req);

      const result = await PlayerKitsHelper.updateKits(player, kits);
      if(result == null){
        return res.status(404).json({message: "Player Kits for the player does not exist", player});
      }

      res.status(201).json({ message: "Kits Updated successfully", result, player});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "UpdateKits failed check console for error" });
    }
  },

  getKits: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(404).json({ message: errors.array() });
      }
      const { player } = matchedData(req);

      const kits = await PlayerKitsHelper.getKits(player);
      if(kits == null){
        return res.status(400).json({message: "Player Kits for the player does not exist", player});
      }

      res.status(200).json({player, kits});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "GetKits failed check console for error" });
    }
  },

};

module.exports = PlayerKitsController;
