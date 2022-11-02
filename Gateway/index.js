const express = require("express");
const  { setupLogging } = require("./utils/logging");
const { setupProxies } = require("./utils/proxy");
const { setupAuth,setupAuthentication } = require("./security/index.security")
const { routes } = require("./routes/routes");
const { setupRateLimit } = require('./utils/rateLimit');
var bodyParser = require('body-parser');

const app = express()
const port = 3000; 

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*' );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range,X-Auth');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Setting up the logging
setupLogging(app);
// Setting up the Authentication for the gateway
setupAuthentication(app,routes);
// Setting up the rate Limit for the gateway
setupRateLimit(app,routes);
// Setting up the Proxy
setupProxies(app,routes);
app.listen(port ,()=> {
    console.log("Gateway running on port :3000");
})