const { valid_duels_games, valid_stats_standing } = require("../config/config");
const { PlayerEloLeaderboard, PlayerStatsLeaderboard } = require("../models/PlayerLeaderboard");

const PlayerLeaderboardHelper = {
  getEloLeaderboard: async () => {
    var data = {};
    for (mode of valid_duels_games) {
      const eloLeaderboard = (await PlayerEloLeaderboard.get(mode))[0];
      //todo throw error
      if (eloLeaderboard.length == 0) continue;
      data[mode] = (eloLeaderboard);
    }
    return data;
  },
  getStatsLeaderboard: async () => {
    var data = {};
    for (type of valid_stats_standing) {
      const leaderboard = (await PlayerStatsLeaderboard.get(type))[0];
      //todo throw error
      if (leaderboard.length == 0) continue;
      data[type] = (leaderboard);
    }
    return data;
  }
};

module.exports = PlayerLeaderboardHelper;
