const { body, param } = require("express-validator");

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
  return eventIdValidationRules.concat([
    body("type")
      .notEmpty()
      .isLength({ min: 1, max: 32 }),

    body("name")
      .notEmpty()
      .isLength({ min: 1, max: 32 })
      .isAlphanumeric(),

    body("description")
      .notEmpty()
      .isString(),

    body("hasDate")
      .notEmpty()
      .isBool(),

    body("startDate")
      .notEmpty()
      .isInt(),

    body("endDate")
      .notEmpty()
      .isInt(),

    body("location")
      .notEmpty()
      .isLength({ min: 6 })
      .isString(),

    body("photos")
      .notEmpty()
      .isString()
  ])
};

const eventCreateValidationRules = () => {
  return eventUpdateValidationRules.concat([
    body("paymentId")
      .notEmpty()
      .isString(),

    body("createdBy")
      .notEmpty()
      .isLength({ min: 1, max: 32 })
      .isString(),

    body("createTime")
      .notEmpty()
      .isInt(),
  ])
};

module.exports = { eventIdValidationRules, eventCreateValidationRules, eventUpdateValidationRules };