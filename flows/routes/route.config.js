
const flowProvider = require('./controllers/flows.provider');

exports.routesConfig = (app) => {
    app.post('/flow', [
        flowProvider.insert
    ]);
    app.get('/flow', [
        flowProvider.list
    ]);
    app.get('/flow/:id', [
        flowProvider.getById
    ]);

    app.put('/flow/:id', [
        flowProvider.putById
    ]);
    app.post('/flows/updates',[
        flowProvider.updateFlows
    ])

    app.delete('/flow/:id', [
        flowProvider.removeById
    ]);



};