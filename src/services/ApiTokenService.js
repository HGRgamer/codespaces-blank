const jwt = require("jsonwebtoken");
const fs = require("fs");
const db = require("./ApiSqliteDatabaseService");

const jwtService = {
    create: () => {
        return jwt.sign(
            {
                check: 'all'
            },
            process.env.SECRET_KEY,
            //{ expiresIn: "1h" } never for now
        );
    },

    decode: (token) => {
        const decodedToken =
            jwt.verify(token, process.env.SECRET_KEY);
        return decodedToken;
    }
}

const ApiTokenService = {
    newToken: async (data) => {
        token = jwtService.create();

        //not implemented yet
        data.uses = 100;

        data.permissions = JSON.stringify(data.permissions); // Store as JSON string
        data.createdAt = new Date().toISOString();

        await db.set(token, data);

        return token;
    },
    deleteToken: async (token) => {
        await db.delete(token);
    },
    getAllTokens: async () => {

    },
    getTokenData: async (token) => {
        data = await db.get(token);

        if (!data) return;
        data.permissions = JSON.parse(data.permissions);
        return data;
    }
}

module.exports = ApiTokenService;