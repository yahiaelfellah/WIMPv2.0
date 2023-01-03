//const config = require('./env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const IdentityRouter = require('./routes/routes.config');
const SecurityRouter = require('./security/routes.config');
const  { setupLogging } = require("./utils/logging");
const path = require('path')
const { sender , consumer } = require("./messaging/user.messaging");

require('dotenv').config({ path: path.resolve(__dirname, '../.env' )});
const PORT = process.env.PORT || 3001;
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*' );
    res.header('Access-Control-Allow-Methods', 'GET,GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Origin,Accept, Authorization, Content-Type, X-Requested-With, Range,X-Auth');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
      }
      else {
        next();
      }
    });
app.use(bodyParser.json());
/// setting up logging
setupLogging(app);
SecurityRouter.routesConfig(app);
IdentityRouter.routesConfig(app);



app.listen(PORT,() =>{
    console.log("user service is running on port:" + PORT);
});
app.on('error',(error) => {
    if (error) {
        console.error(error);
        return process.exit(1)
    } else {
        console.log('express main configured  and listening on port:.')
    }
});

/// Connection to the RabbitMQ broker 
/// Listen to the data sent by other ms
consumer()