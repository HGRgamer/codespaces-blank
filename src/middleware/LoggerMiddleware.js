const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/1269555106530197548/MDWMwpqPyIP_Dsm9BD1n5uSiVZW_VnTizaiRx6R1W1fUVV7HzBbCy9_Uvjh2upgsXnp9");

/**
 * @param res Original Response Object
 * @param send Original UNMODIFIED res.send function
 * @return A patched res.send which takes the send content, binds it to contentBody on
 * the res and then calls the original res.send after restoring it
 */
const resDotSendInterceptor = (res, send) => (content) => {
    res.contentBody = content;
    res.send = send;
    res.send(content);
};

/**
 * Middleware which takes an initial configuration and returns a middleware which will call the
 * given logger with the request and response content.
 *
 * @param logger Logger function to pass the message to
 * @return Middleware to perform the logging
 */
const requestLoggerMiddleware = () => (req, res, next) => {
    startTime = new Date().getTime();
    res.send = resDotSendInterceptor(res, res.send);
    res.on("finish", () => {
        message = (res.statusCode == 200 || res.statusCode == 201) ? "Success" : "\n```" + (typeof res.contentBody === 'string' ? res.contentBody : JSON.stringify(res.contentBody)) + "```";
        hook.send("RECV <<<" + " " + req.method + " " + req.url + " " + req.body.player
            + "\n" +
            "SEND >>>" + " " + res.statusCode + " " + message
            + "\n" +
            "TimeTaken: " + (new Date().getTime() - startTime) + "ms");
    });
    next();
};

module.exports = { requestLoggerMiddleware };