module.exports = (app) => {
    const therapists = require('../controllers/therapist.controllers.js');

    // Default route
    app.get('/', therapists.root);
    // Create a new Therapist
    app.post('/therapists', therapists.create);

    // Retrieve all Therapists
    app.get('/therapists', therapists.findAll);

    // Retrieve a single Therapist specified by therapistId
    app.get('/therapists/:therapistId', therapists.findOne);

    app.put('/therapists/:therapistId', therapists.update);

      // Update a therapist's quotation field specified by therapistId
    app.put('/therapists/fname/:therapistId', therapists.updateQuote);


    // Delete a Therapist specified by therapistId
    app.delete('/therapists/:therapistId', therapists.delete);
    //UI stuff
    app.get('/fname/:s', therapists.searchFname);
    app.get('/sname/:s', therapists.searchSname);

}
