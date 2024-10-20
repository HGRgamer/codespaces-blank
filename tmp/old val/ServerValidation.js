const { body } = require("express-validator");
const { PlayerNameValidationRules, UpdatePlayerStatsValidationRules, UpdatePlayerSettingsAllValidationRules, UpdatePlayerKitsValidationRules, UpdatePlayerInfoValidationRules } = require("./UserValidation");

const ServerPostValidationRules = () => {
  //handle duplicate error in controller
  return PlayerNameValidationRules().concat(UpdatePlayerInfoValidationRules(), UpdatePlayerStatsValidationRules(), UpdatePlayerSettingsAllValidationRules(), UpdatePlayerKitsValidationRules());
};

const ServerBulkPostValidationRules = () => {
  return async (req, res, next) => {
    list = req.body;
    if (!Array.isArray(list) && list.length > 0) {
      return res.status(400).json({ message: "Body must be an array and of atleast 1 length" });
    }
    for (const value of list) {
      //a hack to pass player in params
      req.params.player = value.player;
      for (const validation of ServerPostValidationRules()) {
        const result = await validation.run({ ...req, body: value });
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() });
        }
      }
    }
    // res.status(200).json({ message: "All good" });
    // return;
    next();

  }
}


module.exports = {
  ServerPostValidationRules,
  ServerBulkPostValidationRules,
};
