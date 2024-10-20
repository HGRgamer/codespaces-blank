const { valid_duels_games, valid_stats_standing } = require("../config/config");
const { PlayerEloStanding, PlayerStatsStanding } = require("../models/PlayerStanding");

const PlayerStandingsHelper = {
  getEloStanding: async (player, mode) => {
    const data = (await PlayerEloStanding.get(player, mode))[0];
    if (data.length == 0) {
      return null;
    }
    return data[0];
  },
  getAllEloStanding: async (player) => {
    var data = {};
    for (mode of valid_duels_games) {
      const eloStanding = (await PlayerEloStanding.get(player, mode))[0];
      //[0]['standing'];
      //todo throw error
      if (!eloStanding) continue;
      data[mode] = (eloStanding[0]['standing']);
    }
    return data;
  },
  getStatsStanding: async (player, type) => {
    const data = (await PlayerStatsStanding.get(player, type))[0];

    if (data.length == 0) {
      return null;
    }
    return data;
  },
  getAllStatsStanding: async (player) => {
    var data = {};
    for (type of valid_stats_standing) {
      const standing = (await PlayerStatsStanding.get(player, type))[0];
      //[0]['standing'];
      
      //todo throw error
      if (!standing) continue;
      data[type] = (standing[0]['standing']);
    }
    return data;
  }
};

module.exports = PlayerStandingsHelper;
