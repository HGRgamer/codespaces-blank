const { valid_settings_bools } = require("../config/config");
const PlayerSettings = require("../models/PlayerSettings");
const { objectToQueryString } = require("./Utils");

const PlayerSettingsHelper = {
  getSettings: async (player) => {
    const data = (await PlayerSettings.getSettings(player))[0];

    if (data.length == 0) {
      return null;
    }

    delete data[0].player;

    for (key in data[0]) {
      if (valid_settings_bools.includes(key)) {
        //converts 0 or 1 int to true/false
        data[0][key] = (data[0][key] == 0) ? false : true;
      }
    };
    
    return data[0];
  },
  updateSettings: async (player, settings) => {
    const queryString = objectToQueryString(settings);

    const result = await PlayerSettings.updateSettings(player, queryString);
    if (result[0].affectedRows == 0) {
      return null;
    }
    return result;
  },
  init: async (player) => {
    const result = await PlayerSettings.init(player);
    return result;
  }
}

module.exports = PlayerSettingsHelper;
