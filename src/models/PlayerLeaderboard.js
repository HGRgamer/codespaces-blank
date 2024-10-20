const db = require("../config/database");

const PlayerEloLeaderboard = {
    get: (mode) => {
        return db
            .promise()
            .query(`SELECT
                        player,
                        ${mode}
                    FROM
                        playerElo
                    ORDER BY
                        ${mode} DESC
                    LIMIT 10;`,
                `
                WITH TopPlayers AS (
                    SELECT
                        player,
                        ${mode}
                    FROM
                        playerElo
                    ORDER BY
                        ${mode} DESC
                    LIMIT 10
                )
                SELECT
                    player,
                    ${mode},
                    RANK() OVER (ORDER BY ${mode} DESC) AS rank
                FROM
                    TopPlayers;
                `
            );
    },
};

const PlayerStatsLeaderboard = {
    get: (type) => {
        return db
            .promise()
            .query( `SELECT
                        player,
                        ${type}
                    FROM
                        playerStats
                    ORDER BY
                        ${type} DESC
                    LIMIT 10;`,
                `
                WITH TopPlayers AS (
                    SELECT
                        player,
                        ${type}
                    FROM
                        playerStats
                    ORDER BY
                        ${type} DESC
                    LIMIT 10
                )
                SELECT
                    player,
                    ${type},
                    RANK() OVER (ORDER BY ${type} DESC) AS rank
                FROM
                    TopPlayers;
                `            
            );
    },
};


module.exports = { PlayerEloLeaderboard, PlayerStatsLeaderboard };
