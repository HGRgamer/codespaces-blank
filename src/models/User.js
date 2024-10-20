const db = require("../config/database");

const User = {
  init: (id) => {
    return db
      .promise()
      .execute(
        "INSERT INTO users (id) VALUES (?)",
        [id]
      );
  },
  get: (id) => {
    return db.promise().query("SELECT * FROM users WHERE id = ?", [id]);
  },
  update: (id, newInfo) => {
  //newSettings in string format 
    return db
      .promise()
      .execute(
        "UPDATE users SET " + newInfo + " WHERE id = ?",
        [id]
      );
  }
};

module.exports = User;
