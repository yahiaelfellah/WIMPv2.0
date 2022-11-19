
const flowProvider = require('./controllers/device.provider');

exports.routesConfig = (app) => {
    app.post('/flows', [
        flowProvider.insert
    ]);
    app.get('/flows', [
        flowProvider.list
    ]);
    app.get('/flows/:id', [
        flowProvider.getById
    ]);

    app.put('/flows/:id', [
        flowProvider.putById
    ]);

    app.patch('/flows/:id', [ 
        flowProvider.patchById
    ]);
    app.delete('/flows/:id', [
        flowProvider.removeById
    ]);



};