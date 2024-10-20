const { validationResult, matchedData } = require("express-validator");
const { removeDuplicates } = require("../services/Utils");

const PlayerKitsHelper = require("../services/PlayerKitsHelper");
const PlayerSettingsHelper = require("../services/PlayerSettingsHelper");
const PlayerStatsHelper = require("../services/PlayerStatsHelper");
const PlayerHelper = require("../services/PlayerHelper");
const PlayerStats = require("../models/PlayerStats");
const PlayerSettings = require("../models/PlayerSettings");
const PlayerElo = require("../models/PlayerElo");
const PlayerKits = require("../models/PlayerKits");
const PlayerStandingsHelper = require("../services/PlayerStandingsHelper");
const PlayerLeaderboardHelper = require("../services/PlayerLeaderboardHelper");

const ServerController = {
  bulkPost: async (req, res) => {
    try {
      // no need already handled
     // const errors = validationResult(req);

     errors = [];
     success = [];

     for(const value of req.body){
      const { player, info, stats, settings, kits } = value;
      //note if a setting is not given then old value will not change !!
      //note if a kit is not given then old value will change to empty !!
      //all stats are required

      var isNewPlayer = false;

      if((await PlayerHelper.playerExists(player)) == false){
        await initPlayer(player);
        isNewPlayer = true;
      }

      const result = await updateData(player, info, stats, settings, kits);
      if(result == false){
        console.log("Player data update failed, trying to auto fix it");
        await tryFixPlayer(player);
        const result2 = await updateData(player, stats, settings, kits);
        if(result2 == false){
          console.error("Auto fix failed (on bulk)", {player});
          errors.push({message: "Some error occured while trying to save player data. Auto fix failed, check console for more info", player});
        } else {
          console.success("Auto fix success", {player});
          success.push({message: "Updated player data successfully", player, isNewPlayer});
        }
      } else {
        success.push({message: "Updated player data successfully", player, isNewPlayer});
      }
    }
      res.status(201).json({errors: errors.length, success: success.length,result: success.concat(errors)});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Updated player data(bulkPost) failed check console for error" });
    }
  },

  post: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: removeDuplicates(errors.array()) });
      }

      const { player, info, stats, settings, kits } = matchedData(req);
      //note if a setting is not given then old value will not change !!
      //note if a kit is not given then old value will change to empty !!
      //all stats are required

      var isNewPlayer = false;

      if((await PlayerHelper.playerExists(player)) == false){
        await initPlayer(player);
        isNewPlayer = true;
      }

      const result = await updateData(player, info, stats, settings, kits);
      if(result == false){
        console.log("Player data update failed, trying to auto fix it");
        await tryFixPlayer(player);
        const result2 = await updateData(player, stats, settings, kits);
        if(result2 == false){
          console.error("Auto fix failed", {player});
          return res.status(500).json({message: "Some error occured while trying to save player data. Auto fix failed, check console for more info", player});
        }else{
          console.success("Auto fix success", {player});
        }
      }
      res.status(201).json({ message: "Updated player data successfully", player, isNewPlayer});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Updated player data(post) failed check console for error" });
    }
  },

  get: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player } = matchedData(req);
      // var isNewPlayer = false;
      var playerInfo = await PlayerHelper.getInfo(player);
      if(playerInfo == null){
        //send code 200 as non existence of values is handled by client
        return res.status(200).json({message: "Player does not exist", player});
        
        // return res.status(404).json({message: "Player does not exist", player});
        //!!!!!!!! change it after dev
        // await initPlayer(player);
        // isNewPlayer = true;
      }

      const data = {};
      data.player = player;
      data.info = playerInfo;
      // data.isNewPlayer = isNewPlayer;
      data.stats = await PlayerStatsHelper.getStats(player);
      data.settings = await PlayerSettingsHelper.getSettings(player);
      data.kits = await PlayerKitsHelper.getKits(player);
      standing = {};
      standing.stats = await PlayerStandingsHelper.getAllStatsStanding(player);
      standing.elo = await PlayerStandingsHelper.getAllEloStanding(player);
      data.standings = standing;

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get player data(get) failed check console for error" });
    }
  },
  getRankId: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player } = matchedData(req);
      const result = await PlayerHelper.getRankId(player);
      if(result == null){
        return res.status(404).json({message: "Player does not exist", player, result});
      }
      res.status(200).json({player, rankId: result});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get player data(getRankId) failed check console for error" });
    }
  },
  updateRankId: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player, rankId } = matchedData(req);
      const result = await PlayerHelper.updateRankId(player, rankId);
      if(result == null){
        return res.status(404).json({message: "Player does not exists in stats table(rankId couldnt be updated)", player, result});
      }
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get player data(getRankId) failed check console for error" });
    }
  },
  getLeaderboard: async (req, res) => {
    try {
      Leaderboard = {};
      Leaderboard.stats = await PlayerLeaderboardHelper.getStatsLeaderboard();
      Leaderboard.elo = await PlayerLeaderboardHelper.getEloLeaderboard();
      res.status(200).json(Leaderboard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get player data(getLeaderboard) failed check console for error" });
    }
  },
  getSkin: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { player } = matchedData(req);
      var playerInfo = await PlayerHelper.getInfo(player);
      if(playerInfo == null){
        return res.status(200).json({message: "Player does not exist", player});
      }
      const defaultdata = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAB1UlEQVR4nO2b0a7DIAiG6cne2/jm52qLMVJQwR9bv5s1a0fxL4JVdxFRonuycF5Csi/xvX9tp/w+M+fFe/9NOheFVkNVwn/sfTGHa8hsZBE9KAKGOQKgHUBzBEA7gOZCO1BgktUL6vFLcxwRpQxqGi81aIgIXWCk8dx3tV1u9Pi7JoIA3qSb4xxdgMy8C6TG+RHbISJA04BUfdbHo/ZzlCpgXQG+cG+Sv/MRIsCr8aV9LommS5EpWwbv8J4/4OwPCRkhAqAcAdAOoIlSBTxQ5YTXR8ARAO0AmiMA2gE0RwC0A2iOAGgH0BwB0A6g8ZgP2ArvCJiZtFyCpwC5mJsPKwInQGtR4ZG0cgCKek+Pao/PLFGqAKyLaGaExPU1hQ3t01weBSuqACmnuiFRECkHUIdgZnh1gZ7QLe0NbXacwWuDRLl62zrmriXmd9J9yt9x55p4JsHRp7e0G6zIAbMNco2Az4LFTMsyaY7UBbgEJ11Dk10gVBWQiFRGu0HsD1i6/i8R5V0AxhEA7QCakXFAXWtRr7ImOWFkKLx11q9pCRB2/s6D1+eAVgTM5ITteH0XiPKHCUu0DzDRQwXo6sJPzAHdERCtAUvhRoI7iGIyINt5q6yJAP9G2Ffy+f2JDAAAAABJRU5ErkJggg==";
      var data = playerInfo.skin ?? defaultdata;
      const base64Data = data.replace(/^data:image\/png;base64,/, "");
      const img = Buffer.from(base64Data, "base64");

      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length
      });
      res.end(img);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Get player data(getSkin) failed check console for error" });
    }
  }
};

async function initPlayer(player){
  await PlayerHelper.initPlayer(player);
  await PlayerStatsHelper.init(player);
  await PlayerSettingsHelper.init(player);
  await PlayerKitsHelper.init(player);
}

async function updateData(player, info, stats, settings, kits){
  const result_info = await PlayerHelper.updateInfo(player, info);
  const result_stats = await PlayerStatsHelper.updateStats(player, stats);
  const result_settings = await PlayerSettingsHelper.updateSettings(player, settings);
  const result_kits = await PlayerKitsHelper.updateKits(player, kits);

  if(result_info == null || result_stats == null || result_settings == null || result_kits == null){
    console.error("Critical error Player exists in PLAYERS db but not in others", {info: playerInfo, stats: result_stats, settings: result_settings, kits: result_kits});
    return false;
  }

  return true;
}

async function tryFixPlayer(player){
  if((await PlayerHelper.playerExists(player)) == false){
    await PlayerHelper.init(player);
  }
  const statsExists = (await PlayerStats.getStats(player)) [0];
  if(statsExists.length == 0){
    await PlayerStats.init(player);
  }
  const eloExists = (await PlayerElo.getElo(player)) [0];
  if(eloExists.length == 0){
    await PlayerElo.init(player);
  }
  const settingsExists = (await PlayerSettings.getSettings(player)) [0];
  if(settingsExists.length == 0){
    await PlayerSettingsHelper.init(player);
  }
  const kitsExists = (await PlayerKits.getKits(player)) [0];
  if(kitsExists.length == 0){
    await PlayerKitsHelper.init(player);
  }

}

module.exports = ServerController;
