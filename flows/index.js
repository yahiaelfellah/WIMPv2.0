var http = require('http');
var express = require("express");
var RED = require("node-red");
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
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,permissions.PermissionLevelRequired,RED.httpNode);

server.listen(8000);

// Start the runtime
RED.start();