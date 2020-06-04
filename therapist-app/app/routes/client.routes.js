module.exports = (app) => {
    const clients = require('../controllers/client.controllers.js');

    // Default route
    app.get('/', clients.root);
    // Create a new Client
    app.post('/clients', clients.create);

    // Retrieve all Clients
    app.get('/clients', clients.findAll);

    // Retrieve a single Client specified by clientId
    app.get('/clients/:clientId', clients.findOne);

    // Update a Client specified by clientId
    app.put('/clients/:clientId', clients.update);

    // Delete a Client specified by clientId
    app.delete('/clients/:clientId', clients.delete);
}
