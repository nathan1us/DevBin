const config = require('../config/config');
const { User } = require('../models');
const { jwt } = require('../util');

const routes = require('../routes');

module.exports = (app) => {
    app.get('/authorize', (req, res) => {
        const token = req.cookies[config.authCookie.name];

        jwt.verifyToken(token)
            .then(({ id }) => User.findById(id))
            .then(user => res.send(user))
            .catch(() => res.status(401).send('Unauthorized!'));
    });

    app.use('/api/user', routes.user);
}   