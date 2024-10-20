const PlayerElo = require("../models/PlayerElo");
const PlayerStats = require("../models/PlayerStats");
const { objectToQueryString } = require("./Utils");

const PlayerStatsHelper = {
  getStats: async (player) => {
    const data = (await PlayerStats.getStats(player))[0];

    if (data.length == 0) {
      return null;
    }
    delete data[0].player;

    data[0].elo = (await PlayerElo.getElo(player))[0];
    if (data[0].elo.length == 0) {
      data[0].elo = {};
    }else{
      delete data[0].elo[0].player;
      data[0].elo = data[0].elo[0];
    }

    return data[0];
  },
  getAllStats: async () => {
    const data = (await PlayerStats.getAllStats())[0] ?? [];
    const eloData = (await PlayerElo.getAllElo())[0] ?? [];
    
    for (key in data) {
      //merge elo data
      data[key]['elo'] = eloData.find(x => x.player == data[key].player);
      if(data[key]['elo'] == undefined) data[key]['elo'] = {};

      data[key]['stats'] = {};
      for(key2 in data[key]){
        if(key2 == 'player' || key2 == 'stats')continue;
        //move fields to stats object
        data[key]['stats'][key2] = data[key][key2];
        delete data[key][key2];
      }
    }
    return data;
  },
  updateStats: async (player, statsOrig) => {
    //clone stats object to avoid modifying original
    var stats = {...statsOrig};
    elo = stats.elo;
    delete stats.elo;

    const queryString1 = objectToQueryString(stats);
    const result1 = await PlayerStats.updateStats(player, queryString1);
    if (result1[0].affectedRows == 0) {
      return null;
    }

    const queryString2 = objectToQueryString(elo);
    const result2 = await PlayerElo.updateElo(player, queryString2);
    if (result2[0].affectedRows == 0) {
      //todo throw error
      return null;
    }

    return result1.concat(result2);
  },
  // getRankId: async (player) => {
  //   const stats = await PlayerStatsHelper.getStats(player);
  //   if (stats == null) {
  //     return null;
  //   }
  //   return stats.rankId;
  // },
  // updateRankId: async (player, rankId) => {
  //   const result = await PlayerStats.updateRankId(player, rankId);
  //   if(result[0].affectedRows == 0){
  //     return null;
  //   }
  //   return result;
  // },
  init: async (player) => {
    //note this is not called during tryFixPlayer
    const result = await PlayerStats.init(player);
    const result1 = await PlayerElo.init(player);
    return result.concat(result1);
  }
}

module.exports = PlayerStatsHelper;
