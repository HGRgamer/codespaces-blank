const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const sessionId = Math.random().toString(36).substring(2, 15);
const pendingRequests = new Map();

//a regular interval to check how long ago token was created and delete if more than 5min
// setInterval(() => {
//     const now = Date.now();
//     pendingRequests.forEach((value, key) => {
//         if (now - value.time > 1 * 60 * 1000) {
//             pendingRequests.delete(key);
//         }
//     });
// }, 5000);

router.use((req, res, next) => {

    // res.locals.isLoggedIn = false;

    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token;
        found = false;
        try {
            found = jwt.verify(token, process.env.SECRET_KEY);
            if (found) {
                if (found.sessionId === sessionId) {
                    // res.locals.isLoggedIn = true;
                    next();
                    return;
                } else {
                    res.clearCookie('token');
                }
            }
        } catch (err) {
            //todo error handling
            // console.log(err);
        };
    }
    // if (req.path === "/verify" && req.cookies.redirect === "true") {
    //     next();
    //     return;
    // }else if(req.path !== "/verify" && req.cookies.redirect){
    //     //remove cookie as soon as user leaves page
    //     res.clearCookie('redirect');
    // }
    const uniqueKey = Math.random().toString(36).substring(2, 15);
    pendingRequests.set(uniqueKey, { path: req.originalUrl, time: Date.now() });

    console.log(uniqueKey + " " + req.originalUrl + " " + new Date().toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }));

    res.cookie('redirect', true);
    res.redirect(req.baseUrl + `/verify`);
});

router.get('/verify', (req, res) => {
    res.render("verify");
});

router.post('/verify', (req, res) => {
    const { key } = req.body;
    const request = pendingRequests.get(key);
    
    res.clearCookie('redirect');
    if (!request) {
        res.status(403).send('Invalid or expired key.');
        return;
    }
    
    const { path } = request;
    pendingRequests.delete(key);
    try {
        token = jwt.sign({ key, sessionId }, process.env.SECRET_KEY, { expiresIn: '2m' });
        res.cookie('token', token, {
            httpOnly: true,
            //todo https
            // secure: true ,
            // maxAge: 5 * 60
        });
        // console.log(token);
        if (path == req.baseUrl + "/logout") {
            res.redirect(req.baseUrl + "/verify");
        } else {
            res.redirect(path);
        }
    } catch (err) {
        if (err) {
            res.status(500).send('Error generating token.');
            console.log(err);
            return;
        }
    }
});

router.all("/logout", (req, res) => {
    res.clearCookie('token');
    res.clearCookie('redirect');
    res.redirect(req.baseUrl + "/verify");
});

module.exports = router;