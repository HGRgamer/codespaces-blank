const db = require("../config/database");

const PlayerStats = {
  init: (player) => {
    return db
      .promise()
      .execute(
        "INSERT INTO playerStats (player) VALUES (?)",
        [player]
      );
  },
  updateStats: (player, stats) => {
    return db
    .promise()
    .execute(
      "UPDATE playerStats SET " + stats +" WHERE player = ?",
      [player]
    );
  },
  // updateRankId: (player, rankId) => {
  //   //todo: revamp rankid to a diff table
  //   return db
  //     .promise()
  //     .execute(
  //       "UPDATE playerStats SET rankId = ? WHERE player = ?",
  //       [rankId, player]
  //     );
  // },
  getStats: (player) => {
    return db.promise().query("SELECT * FROM playerStats WHERE player = ?", [player]);
  },
  getAllStats: () => {
    return db.promise().query("SELECT * FROM playerStats");
  },

};

module.exports = PlayerStats;
