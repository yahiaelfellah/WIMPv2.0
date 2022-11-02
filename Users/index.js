//const config = require('./env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const IdentityRouter = require('./routes/routes.config');
const SecurityRouter = require('./security/routes.config');
const config = require("./security/env.config")


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

app.use(bodyParser.json());
IdentityRouter.routesConfig(app);
SecurityRouter.routesConfig(app);
app.listen(3001,() =>{
    console.log("user service is running");
});
app.on('error',(error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    } else {
        console.log('express main configured  and listening on port:.')
    }
});