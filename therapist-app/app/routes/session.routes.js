module.exports = (app) => {
    const sessions = require('../controllers/session.controllers.js');

    // Default route
    app.get('/', sessions.root);
    // Create a new Session
    app.post('/sessions', sessions.create);

    // Retrieve all Sessions
    app.get('/sessions', sessions.findAll);

    // Retrieve a single Session specified by sessionId
    app.get('/sessions/:sessionId', sessions.findOne);

    // Update a Session specified by sessionId
    app.put('/sessions/:sessionId', sessions.update);

    // Delete a Session specified by sessionId
    app.delete('/sessions/:sessionId', sessions.delete);
}
