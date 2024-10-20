const db = require("../config/database");

const PlayerKits = {
  init: (player) => {
    return db
      .promise()
      .execute(
        "INSERT INTO playerKits (player) VALUES (?)",
        [player]
      );
  },
  updateKits: (player, kits) => {
    return db
      .promise()
      .execute(
        "UPDATE playerKits SET " + kits + " WHERE player = ?",
        [player]
      );
  },

  getKits: (player) => {
    return db.promise().query("SELECT * FROM playerKits WHERE player = ?", [player]);
  },
};

module.exports = PlayerKits;
