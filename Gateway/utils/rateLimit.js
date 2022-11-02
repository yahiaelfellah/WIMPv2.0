const rateLimit = require("express-rate-limit");

exports.setupRateLimit = (app,routes) => {
    routes.forEach(route => {
        if(route.rateLimit)
            app.use(route.url,rateLimit(route.rateLimit))
    });
}