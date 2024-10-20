const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/AuthMiddleware");

const EventController = require("../controllers/EventController");
const { eventIdValidationRules, eventUpdateValidationRules, eventCreateValidationRules } = require("../validations/EventValidation");

router.use(authMiddleware(0));

router.get("/:id", eventIdValidationRules(), EventController.get);

router.use(authMiddleware(1));

router.post("/:id/update", eventUpdateValidationRules(), EventController.update);

router.post("/create", eventCreateValidationRules(), EventController.create);

module.exports = router;