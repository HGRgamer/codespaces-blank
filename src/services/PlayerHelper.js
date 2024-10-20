//playerhelper.js

const Player = require("../models/User");
const { objectToQueryString } = require("./Utils");

const PlayerHelper = {
    getInfo: async (player) => {
        const result = (await Player.get(player))[0];
        if (result.length == 0) {
            return null;
        } else {
            delete result[0].player;
            return result[0];
        }
    },
    playerExists: async (player) => {
        return (await PlayerHelper.getInfo(player)) != null;
    },
    initPlayer: async (player) => {
        await Player.init(player);
    },
    updateInfo: async (player, info) => {
        const queryString = objectToQueryString(info);

        const result = await Player.update(player, queryString);
        if (result[0].affectedRows == 0) {
            return null;
        }
        return result;
    },
    getStandingId: async (player) => {
        const result = await Player.getStandingId(player)[0];
        if (result.length == 0) {
            return null;
        }
        return result[0].standingId;
    },
    updateStandingId: async (player, standingId) => {
        const result = await Player.updateStandingId(player, standingId);
        if (result[0].affectedRows == 0) {
            return null;
        }
        return result;
    },
}

module.exports = PlayerHelper;