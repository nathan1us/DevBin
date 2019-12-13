const config = require('./config/config');
const app = require('express')();
const db = require('./config/database');

global.__basedir = __dirname;

db().then(() => {
    require('./config/express')(app);
    require('./config/routes')(app);

    app.use(function (err, req, res, next){
        console.error(err);
        res.status(500).send(err.message);
    });

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
}).catch(console.error);