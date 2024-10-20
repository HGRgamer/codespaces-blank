const { body, param } = require("express-validator");
const { valid_settings_bools, valid_lang, valid_games, valid_stats_int, valid_duels_games, valid_info_keys } = require("../config/config");

const PlayerNameValidationRules = () => {
  return [
    param("player")
      .notEmpty()
      .withMessage("Player name must be provided")
      .isLength({ min: 1, max: 20 })
      .withMessage("Playername must be between 1 and 20 characters")
      .isAscii()
      .withMessage("Playername must be Ascii (gamertag condition)")
      .toLowerCase(),
  ];
};

const UpdatePlayerInfoValidationRules = () => {
  return PlayerNameValidationRules().concat([
    body("info")
      .optional()
      .isObject()
      .withMessage("Info should be an object")
      .custom(async value => {
        //checking for valid keys
        for (key in value) {
          if (!valid_info_keys.includes(key)) {
            throw new Error('Info object does not contain valid keys, InvalidKey: ' + key + '\nValid keys: ' + valid_info_keys);
          }
        }
      }),

    body("info.skin")
      .optional()
      .isString()
      .withMessage("Skin should be a string"),
      
    body("info.playtime")
      .optional()
      .isInt()
      .withMessage("Playtime should be an integer"),

    body("info.first_login")
      .optional()
      .isInt()
      .withMessage("First login should be an integer"),

    body("info.last_login")
      .optional()
      .isInt()
      .withMessage("Last login should be an integer"),

    body("info.rankId")
      .optional()
      .isInt()
      .withMessage("RankId should be an integer"),
  ]);
};

const UpdatePlayerStatsValidationRules = () => {
    return PlayerNameValidationRules().concat([
      body("stats")
        .notEmpty()
        .withMessage("Stats object cannot be empty")
        .isObject()
        .withMessage("Stats should be object")
        .custom(async value => {
          //checking for valid keys
          for (key in value) {
            if (!valid_stats_int.concat(["elo"]).includes(key)) {
              throw new Error('Stats array does not contain valid keys, InvalidKey: ' + key + '\nValid keys: ' + valid_settings_bools.concat(["elo"]));
            }
          }
        }),

      body(valid_stats_int.map(function (tmp) { return 'stats.' + tmp; }))
        .notEmpty()
        .withMessage("All Stats should be present")
        .isInt()
        .withMessage("Stats should be a positive Int"),

      body("stats.elo")
        .notEmpty()
        .withMessage("All Stats should be present")
        .isObject()
        .withMessage("Elo should be an object")
        .custom(async value => {
          //checking for valid keys
          for (key in value) {
            if (!valid_duels_games.includes(key)) {
              throw new Error('elo object does not contain valid keys, InvalidKey: ' + key + '\nValid keys: ' + valid_duels_games.join(", "));
            }
            if (!Number.isInteger(value[key])) {
              throw new Error('elo object does not contain valid values, InvalidValue: ' + value[key] + '\nValid values: Int');
            }
          }
        }),
    ]);
  };

  const UpdatePlayerSettingsValidationRules = () => {
    return PlayerNameValidationRules().concat([
      body("settings")
        .notEmpty()
        .withMessage("AtLeast 1 Setting should be provided")
        .isObject({ min: 1 })
        .withMessage("Setting should be an object")
        .custom(async value => {
          //checking for valid keys
          for (key in value) {
            if (!valid_settings_bools.concat(["lang"]).includes(key)) {
              throw new Error('Settings array does not contain valid keys, InvalidKey: ' + key + '\nValid keys: ' + valid_settings_bools.concat(["lang"]));
            }
          }
        }),

      body(valid_settings_bools.map(function (tmp) { return 'settings.' + tmp; }))
        .optional()
        .isBoolean()
        .withMessage("Settings array values can only contain bool (except lang)"),

      body("settings.lang")
        .optional()
        .isString()
        .isIn(valid_lang),
    ]);
  };

  //required for ServerPostValidationRules
  //makes it necessary to have all settings
  const UpdatePlayerSettingsAllValidationRules = () => {
    return PlayerNameValidationRules().concat([
      body("settings")
        .notEmpty()
        .withMessage("All settings should be provided, none found")
        .isObject({ min: 1 })
        .withMessage("Setting should be an object")
        .custom(async value => {
          //checking for valid keys
          for (key in value) {
            if (!valid_settings_bools.concat(["lang"]).includes(key)) {
              throw new Error('Settings array does not contain valid keys, InvalidKey:' + key + ' Valid keys:' + valid_settings_bools.concat(["lang"]));
            }
          }
        }),

      body(valid_settings_bools.map(function (tmp) { return 'settings.' + tmp; }))
        .notEmpty()
        .withMessage("All Settings should be present")
        .isBoolean()
        .withMessage("Settings array values can only contain bool (except lang)"),

      body("settings.lang")
        .notEmpty()
        .withMessage("All Settings should be present")
        .isString()
        .isIn(valid_lang),
    ]);
  };

  //for kit validation
  //if no kit is provided, it will be set to default []
  const UpdatePlayerKitsValidationRules = () => {
    return PlayerNameValidationRules().concat([
      body("kits")
        .exists()
        .withMessage("kits field should not be undefined. Note: If no custom kit exists set it to an empty object {}.")
        .isObject()
        .withMessage("kits should be an object")
        .bail() //
        .custom(async value => {
          //checking for valid keys
          for (key in value) {
            if (!valid_games.includes(key)) {
              throw new Error('kits object does not contain valid keys, InvalidKey:' + key + ' Valid keys: ' + valid_games.join(", "));
            }
          }
        }),

      body(valid_games.map(function (tmp) { return 'kits.' + tmp; }))
        .default([])
        .isArray()
        .withMessage("Kits object values can only be an array")
        .custom(async value => {
          //make sure array contains integers only
          for (arrayValue of value) {
            if (typeof arrayValue !== 'number') {
              throw new Error('kit.gamemode does not contain valid values in array. Only int are accepted., InvalidValue:' + arrayValue);
            }
          }
        }),

    ]);
  };

  const UpdatePlayerRankIdValidationRules = () => {
    return PlayerNameValidationRules().concat([
      body("rankId")
        .notEmpty()
        .withMessage("RankId must be provided")
        .isInt()
        .withMessage("RankId should be an integer"),
    ]);
  };

  module.exports = {
    UpdatePlayerStatsValidationRules,
    PlayerNameValidationRules,
    UpdatePlayerInfoValidationRules,
    UpdatePlayerSettingsValidationRules,
    UpdatePlayerSettingsAllValidationRules,
    UpdatePlayerKitsValidationRules,
    UpdatePlayerRankIdValidationRules,
  };
