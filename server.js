/**
 * Created by yuliiastelmakhovska on 2017-05-03.
 */
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./connection');
const routes         = require('./routes/routesuser');
const app            = express();
const port = 8000;


app.set('port', port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));


MongoClient.connect(db.url, function (err, database){
    if (err)
        return console.log(err)
    routes(app, database);
    app.listen(port, function () {
        console.log('Listening on port ' + port)
    });
});