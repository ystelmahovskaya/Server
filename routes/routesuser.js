var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    app.get('/Users/:id', function(req, res) {

        const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('Users').findOne(details, function(err, item){
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(item);
}
})
 });
    app.post('/Users', function(req, res) {
        console.log("req"+req);
        const usr = { user_name: req.body.user_name, user_password: req.body.user_password, user_password: req.body.user_score };
    db.collection('Users').insert(usr, function(err, result)  {
        if (err) {
            res.send({ 'error': 'An error has occurred' });
        } else {
            res.send(result.ops[0]);
}
});
});
    app.get('/Statistics/:id', function(req, res) {

        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('Statistics').findOne(details, function(err, item){
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        })
    });
    app.post('/Statistics', function(req, res) {
        const usr = { _id: req.body._id, date: req.body.date, score: req.body.score };
        db.collection('Statistics').insert(usr, function(err, result)  {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};

