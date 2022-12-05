var http = require('http');
var express = require("express");
var RED = require("node-red");
const { broker } =  require('./messaging/flows.messaging')
const permissions = require("./security/flow.permission")
const flowRouter = require("./routes/route.config");
const bodyParser = require('body-parser');
require('dotenv').config()
// Create an Express app
var app = express();
// body parser 
app.use(bodyParser.json());
/// add api to to the app
flowRouter.routesConfig(app);
// Create a server
var server = http.createServer(app);
// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    httpNodeCors: true,
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { 
        os:require('os')
    }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,permissions.PermissionLevelRequired,RED.httpNode);

server.listen(8000);
// Connecting to the broker 
broker.connect();
// Start the runtime
RED.start();