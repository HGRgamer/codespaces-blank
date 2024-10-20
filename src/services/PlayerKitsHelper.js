const PlayerKits = require("../models/PlayerKits");
const { objectArrayToJsonString } = require("./Utils");

const PlayerKitsHelper = {
  getKits: async (player) => {
    const data = (await PlayerKits.getKits(player))[0];

    if (data.length == 0) {
      return null;
    }

    delete data[0].player;

    //convert back to array and remove unset items
    for (const key in data[0]) {
      data[0][key] = JSON.parse(data[0][key]);

      if (data[0][key].length === 0) {
        delete data[0][key];
      }
    }

    return data[0];
  },
  updateKits: async (player, kits) => {
    const queryString = objectArrayToJsonString(kits);

    const result = await PlayerKits.updateKits(player, queryString);
    if (result[0].affectedRows == 0) {
      return null;
    }
    return result;
  },
  init: async (player) => {
    const result = await PlayerKits.init(player);
    return result;
  }
}

module.exports = PlayerKitsHelper;
