
const DeviceProvider = require('./controllers/device.provider');

exports.routesConfig = (app) => {
    app.post('/devices', [
        DeviceProvider.insert
    ]);
    app.get('/devices', [
        DeviceProvider.list
    ]);
    app.get('/devices/:deviceId', [
        DeviceProvider.getById
    ]);

    app.put('/devices/:deviceId', [
        DeviceProvider.putById
    ]);

    app.patch('/devices/:deviceId', [ 
        DeviceProvider.patchById
    ]);
    app.delete('/devices/:deviceId', [
        DeviceProvider.removeById
    ]);
};