const { validationResult, matchedData } = require("express-validator");
const ApiTokenService = require("../services/ApiTokenService");
const bcrypt = require("bcrypt");
const { apiSecretKeyHash } = require("../config/config");

const ApiTokenController = {
  newToken: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      data = matchedData(req);
      const isSecretKeyValid = await bcrypt.compare(data.secretKey, apiSecretKeyHash);

      if (!isSecretKeyValid) {
        return res.status(401).json({ message: "Invalid secretKey" });
      }
      
      //convert permissions sub object to array {'stats.get': true} -> ['stats.get']
      data['permissions'] = Object.keys(data['permissions']);

      const token = await ApiTokenService.newToken(data);

      res.setHeader("Content-type", "text/html");
      res.write('Api Key Generated Successfull');
      res.write('<br>');
      res.write('Following is the api key , it will not be shown again !!!');
      res.write('<br>');
      res.write('<br>');
      res.write(token);
      res.end();

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "newToken failed check console for error" });
    }
  },

  deleteToken: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const {apikey} = matchedData(req);

      const data = await ApiTokenService.deleteToken(apikey);
      res.status(201).json({ message: "Token Deleted successfully", data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "deleteToken failed check console for error" });
    }
  },

  getInfo: async (req, res) => {
    try {
      // Validate the user input
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }
      const {apikey} = matchedData(req);

      const data = await ApiTokenService.getTokenData(apikey);

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "getInfo failed check console for error" });
    }
  },

  getAllTokens: async (req, res) => {
    try {
      const data = await ApiTokenService.getAllTokens();
      //todo sort data
      res.status(200).json({ data });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "getAllTokens failed, check console for error" });
    }
  },

};

module.exports = ApiTokenController;
