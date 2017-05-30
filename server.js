/**
 * Created by yuliiastelmakhovska on 2017-05-03.
 */
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./connection');
const app            = express();
const filesystem = require('fs');
const port = 8000;
const routes         = require('./routes/routesuser');

app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(express.static(__dirname + '/public'));

MongoClient.connect(db.url, function (err, database){
    if (err)
        return console.log(err)
    routes(app, database,filesystem);
    app.listen(port, function () {
        console.log('Listening on port ' + port)
    });
});