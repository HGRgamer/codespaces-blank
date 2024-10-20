const { body, param } = require("express-validator");
const { userIdValidationRules } = require("./UserValidation");
const { imgToUrl } = require("../Utils");

const eventIdValidationRules = () => {
  return [
    param("eventId")
      .notEmpty()
      .withMessage("EventId must be provided")
      .isLength({ min: 1, max: 20 })
      .withMessage("EventId too long or short")
      .isString()
      .withMessage("EventId is not a string"),
  ];
};

const eventUpdateValidationRules = () => {
  return ([
    body("category")
      .notEmpty()
      .isLength({ min: 1, max: 32 }),

    body("title")
      .notEmpty()
      .isLength({ min: 1, max: 32 })
      .isAlphanumeric(),

    body("description")
      .notEmpty()
      .isString(),

    body("hasDate")
      .notEmpty()
      .isBoolean(),

    body("startDate")
      .notEmpty()
      .isString(),

    body("endDate")
      .notEmpty()
      .isString(),

    body("location")
      .notEmpty()
      .isLength({ min: 6 })
      .isString(),

    body("photos")
      .notEmpty()
      .isArray()
      .bail()
      .customSanitizer(async value => {
        var a = [];
        for(const imgData of value){
          a.push(await imgToUrl(imgData));
        }
        return JSON.stringify(a);
      }),

    body("comments")
      .notEmpty()
      .isString(),

    body("artists")
      .notEmpty()
      .isString()
  ])
};

const eventCreateValidationRules = () => {
  return eventUpdateValidationRules().concat(userIdValidationRules(),[
    body("entryFee")
      .notEmpty()
      .isInt(),
  ])
};

module.exports = { eventIdValidationRules, eventCreateValidationRules, eventUpdateValidationRules };