const db = require("../config/database");

const PlayerEloStanding = {
    get: (player, mode) => {
        return db
            .promise()
            .query(
                `SELECT 
                    1 + (
                        SELECT count(*)
                        FROM playerElo a
                        WHERE a.${mode} > b.${mode}
                    ) AS standing
                FROM 
                    playerElo b
                WHERE 
                    player = ?
                ORDER BY 
                    standing
                LIMIT 1;`,
                [player]
            );
    },
};

const PlayerStatsStanding = {
    get: (player, type) => {
        return db
            .promise()
            .query(
                `SELECT 
                    1 + (
                        SELECT count(*)
                        FROM playerStats a
                        WHERE a.${type} > b.${type}
                    ) AS standing
                FROM 
                    playerStats b
                WHERE 
                    player = ?
                ORDER BY 
                    standing
                LIMIT 1;`,
                [player]
            );
    },
};


module.exports = { PlayerEloStanding, PlayerStatsStanding };
