const db = require("../config/database");

const PlayerElo = {
  init: (player) => {
    return db
      .promise()
      .execute(
        "INSERT INTO playerElo (player) VALUES (?)",
        [player]
      );
  },
  updateElo: (player, elo) => {
    return db
      .promise()
      .execute(
        "UPDATE playerElo SET " + elo +" WHERE player = ?",
        [player]
      );
  },

  getElo: (player) => {
    return db.promise().query("SELECT * FROM playerElo WHERE player = ?", [player]);
  },
  getAllElo: () => {
    return db.promise().query("SELECT * FROM playerElo");
  },

};

module.exports = PlayerElo;
