
const DeviceProvider = require('./controllers/devices.provider');

exports.routesConfig = (app) => {
    app.post('/devices', [
        DeviceProvider.create
    ]);
    app.put('/devices/:deviceId', [
        DeviceProvider.updateById
    ])
    app.get('/devices', [
        DeviceProvider.list
    ]);
    app.get('/devices/:deviceId', [
        DeviceProvider.findById
    ]);
    app.delete('/devices/:deviceId', [
        DeviceProvider.removeById
    ]);
};