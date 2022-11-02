const { createProxyMiddleware } = require('http-proxy-middleware');

exports.setupProxies = (app,routes) => {
    routes.forEach(route => {
        app.use(route.url,createProxyMiddleware(route.proxy))
    });
}