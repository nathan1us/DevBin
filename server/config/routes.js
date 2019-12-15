const config = require('../config/config');
const { User } = require('../models');
const { jwt } = require('../util');

const routes = require('../routes');

module.exports = (app) => {
    app.get('/authorize', (req, res) => {
        const token = req.cookies[config.authCookie];

        jwt.verifyToken(token)
            .then(({ id }) => User.findById(id).populate('pastes'))
            .then(user => res.send(user))
            .catch(() => res.status(401).send('Unauthorized!'));
    });

    app.use('/api/user', routes.user);
    app.use('/api/pastes', routes.paste);
}   
