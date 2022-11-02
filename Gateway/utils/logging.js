const morgan = require("morgan");

exports.setupLogging = (app) => {
    app.use(morgan('combined'));
}
