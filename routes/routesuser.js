var ObjectID = require('mongodb').ObjectID;
const parser=require('subtitles-parser');

module.exports = function(app, db, filesystem) {

    app.get('/Users/:email', function(req, res) {

        const email = req.params.email;
        const details = { 'user_email': email}
        db.collection('Users').findOne(details, function(err, item){
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        })
    });

    app.get('/Users/count/:email', function(req, res) {

        const email = req.params.email;
        const details = { 'user_email': email};
        db.collection('Users').count(details, function(err, item){
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
              //  console.log(item);
                res.send(item.toString());
            }
        })
    });

    app.get('/Users/verify/:email/:password', function(req, res) {

        const email = req.params.email;
        const password = req.params.password;
        const details = { 'user_email': email, 'user_password':password };
        db.collection('Users').findOne(details, function(err, item){
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        })
    });

    app.post('/Users', function(req, res) {
        console.log("req"+req.toString());
        const usr = { user_name: req.body.user_name, user_password: req.body.user_password, user_email: req.body.user_email};
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
        const details = { 'user_id':id };

        db.collection('Statistics').find(details).toArray( function(err, item){
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        })
    });
    app.post('/Statistics', function(req, res) {
        console.log(req)
        const stat = { user_id: req.body.user_id, date: new Date() , score: req.body.score };
        db.collection('Statistics').insert(stat, function(err, result)  {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });
    app.get('/content/:name', function (req, res, next) {

        var options = {
            root: './content/',
            headers: {
                'x-timestamp': Date.now(),
                'Content-Type': 'video/mp4',
                'x-sent': true
            }
        };

        var fileName = req.params.name;
        res.sendFile(fileName, options, function (err) {
            if (err) {
                next(err);
            } else {
                console.log('Sent:', fileName);
            }
        });

    });
    app.get('/content/sub/:name', function (req, res, next) {

        var filename=req.params.name;

        var srt = filesystem.readFileSync('./'+filename);

        var data1 = parser.fromSrt(srt.toString(),true);

            res.send(data1);

    });
    app.delete('/Statistics/delete/:id', function (req, res) {
        console.log('delete/statistics:', req);
        const id = req.params.id;
        const details = { 'user_id':id };

        db.collection('Statistics').remove(details);

    });
    app.delete('/Users/delete/:id', function (req, res) {
        console.log('delete/users:', req);
        const id = req.params.id;
        const details = { 'user_id':id };
        var ObjectId = require('mongodb').ObjectID;
        const detailsUsers={'_id':  ObjectId(id)};
        db.collection('Statistics').remove(details);
        db.collection('Users').remove(detailsUsers);

    });
};

