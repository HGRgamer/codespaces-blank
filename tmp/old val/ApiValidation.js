const { body } = require("express-validator");
const { permissions } = require("../config/config");

const merged_permissions = Object.values(permissions).flat();

const ApiKeyNameValidationRules = () => {
  return [
    body("apikey")
      .notEmpty()
      .withMessage("apikey name must be provided")
      .isLength({ min: 1 })
      .withMessage("apikey must be atleast some long")
      .isString()
      .withMessage("apikey should be a string"),
  ];
};

const ApiKeyGenValidationRules = () => {
  return [
    body("secretKey")
    .notEmpty()
    .withMessage("secretKey must be provided")
    .isLength({ min: 1, max: 32 })
    .withMessage("secretKey must be between 1 and 32 characters"),

    body("createdBy")
      .notEmpty()
      .withMessage("Creator name must be provided")
      .isLength({ min: 1, max: 32 })
      .withMessage("Playername must be between 1 and 32 characters")
      .isAlphanumeric()
      .withMessage("Playername must be Alphanumeric"),

    body("description")
      .notEmpty()
      .withMessage("description must be provided")
      .isLength({ min: 1, max: 100 })
      .withMessage("description must be between 1 and 100 characters")
      .isAlphanumeric()
      .withMessage("description must be Alphanumeric"),

    body("permissions")
      .notEmpty()
      .withMessage("AtLeast 1 Setting should be provided")
      .isObject({ min: 1 })
      .withMessage("Setting should be an object")
      .custom(async value => {
        //checking for valid keys
        for (key in value) {
          if (!merged_permissions.includes(key)) {
            throw new Error('permissions array does not contain valid keys, InvalidKey:' + key + ' Valid keys:' + merged_permissions);
          }
        }
      }),

    body(merged_permissions.map(function (tmp) { return 'permissions.' + tmp; }))
      .optional()
      .isBoolean()
      .withMessage("Permissions array values can only contain bool"),
    ];
};

module.exports = {
  ApiKeyGenValidationRules,
  ApiKeyNameValidationRules
};
