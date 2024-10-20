const express = require("express");
const router = express.Router();

const { ApiKeyGenValidationRules, ApiKeyNameValidationRules } = require("../validations/ApiValidation");
const ApiTokenController = require("../controllers/ApiTokenController");

const authMiddleware = require("../middleware/AuthMiddleware");
const consoleAuthMiddleware = require("../middleware/ConsoleAuthMiddleware");

const { permissions } = require("../config/config");

const bcrypt = require("bcrypt");

//requires access to console to access this page
// router.use("/key", passwordMiddleware);
router.use(consoleAuthMiddleware);
//web page
router.get("/gen", (req, res) => {
  //file is in views folder
  res.render("keygen", { permissions: permissions });
});

router.get("/hash/:pass", (req, res) => {
  res.setHeader("Content-type", "text/html");
  res.write(bcrypt.hashSync(req.params.pass, 10));
  res.end();
});

router.post("/gen", ApiKeyGenValidationRules(), ApiTokenController.newToken);

//router.get("/key/list", ApiKeyNameValidationRules(), ApiTokenController.getAllTokens);
router.get("/info", ApiKeyNameValidationRules(), ApiTokenController.getInfo);

router.post("/delete", ApiKeyNameValidationRules(), ApiTokenController.deleteToken);

module.exports = router;