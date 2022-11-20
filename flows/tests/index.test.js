var http = require('http');
var express = require("express");
var RED = require("node-red");
var axios = require("axios");
require('dotenv').config()

// Create an Express app
var app = express();
// Create a server
var server = http.createServer(app);
const config = {
    headers : {
        "Node-RED-API-Version":"v1",
        "Node-RED-Deployment-Type":"full"
    }
    }
const opt1 ={ 
    flows: [
    {
        "id": "templateflow0",
        "type": "tab",
        "label": "tempalte flow",
        "disabled": false,
        "info": "",
        "env": []
    }
],
req:{
    "Node-RED-API-Version":"v1",
    "Node-RED-Deployment-Type":"full"
}
}


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
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8000);


// Start the runtime
RED.start();

// // RED test addFlow 



RED.runtime.flows.addFlow(opt1);





