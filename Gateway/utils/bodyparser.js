const bodyParser = require('body-parser');

exports.setupBodyParser = (app,routes) => {
    routes.forEach(route => {
        if(route.applyBodyParser)
            //console.log(`adding bodyParser for this url ${route.url}`)
            app.use(route.url,bodyParser.json())
    });
}