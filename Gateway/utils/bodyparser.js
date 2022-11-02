const bodyParser = require('body-parser');

exports.setupBodyParser = (app,routes) => {
    routes.forEach(route => {
        if(route.bodyParser)
            app.use(route.url,bodyParser.json())
    });
}