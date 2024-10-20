const jwt = require("jsonwebtoken");
const ApiTokenService = require("../services/ApiTokenService");

const authMiddleware = (permRequired = 0) => {
    return async (req, res, next) => {
        if (req.cookies && req.cookies.token) {
            const token = req.cookies.token;
            jwt.verify(token, process.env.SECRET_KEY, async function (err, decode) {
                if (err) {
                    res.status(500).send({ message: err });
                }

                const userId = decode.userId;

                //todo
                //check user exists
                data = await ApiTokenService.getTokenData(token);

                if (!data) {
                    err = "Expired session, please sign in again";
                } else {
                    req.param.userId = userId;
                    switch (permRequired) {
                        case 2:
                            if (!data.admin) err = 'Api key does not have permission to access this api endpoint.';
                        case 1:
                            if (!data.creator) err = 'Api key does not have permission to access this api endpoint.';
                        case 0:
                            return next();
                    }
                }
                if (err) {
                    res.status(401).send({ message: err });
                }
            });
        } else {
            res.status(500).send({ message: 'User not logged in' });
        }
    }
};

module.exports = authMiddleware;
