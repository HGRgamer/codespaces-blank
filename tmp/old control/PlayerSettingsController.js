const { validationResult, matchedData } = require("express-validator");
const PlayerSettingsHelper = require("../services/PlayerSettingsHelper");

const PlayerSettingsController = {
  updateSettings: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player, settings } = matchedData(req);

      const result = await PlayerSettingsHelper.updateSettings(player, settings);
      if(result == null){
        return res.status(404).json({message: "Player Settings for the player does not exist", player});
      }

      res.status(201).json({ message: "Settings Updated successfully", result, player});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "UpdateSettings failed check console for error" });
    }
  },

  getSettings: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      const { player } = matchedData(req);

      const settings = await PlayerSettingsHelper.getSettings(player);
      if(settings == null){
        return res.status(404).json({message: "Player Settings for the player does not exist", player});
      }

      res.status(200).json({player, settings});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "GetSettings failed check console for error" });
    }
  },

};

module.exports = PlayerSettingsController;
