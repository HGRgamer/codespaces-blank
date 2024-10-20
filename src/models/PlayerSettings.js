const db = require("../config/database");

const PlayerSettings = {
  init: (player) => {
    return db
      .promise()
      .execute(
        "INSERT INTO practiceSettings (player) VALUES (?)",
        [player]
      );
  },
  //newSettings in string format 
  updateSettings: (player, newSettings) => {
    return db
      .promise()
      .execute(
        "UPDATE practiceSettings SET " + newSettings + " WHERE player = ?",
        [player]
      );
  },

  getSettings: (player) => {
    return db.promise().query("SELECT * FROM practiceSettings WHERE player = ?", [player]);
  }
};

module.exports = PlayerSettings;
