const jwt = require('./jwt');
const config = require('../config/config');
const { Token, User } = require('../models');

module.exports = (redirect = true) => {
    return function (req, res, next) {
        const token = req.cookies[config.authCookie.name] || '';

        Promise.all([
            jwt.verifyToken(token),
            Token.findOne({
                token
            })
        ])
            .then(([resData, blacklistedToken]) => {
                if (blacklistedToken) {
                    return Promise.reject(new Error('Blacklisted token!'));
                }

                User.findById(resData.id)
                    .then(user => {
                        req.user = user;
                        next();
                    });
            })
            .catch(err => {
                if (!redirect) {
                    next();
                    return;
                }

                if (['jwt must be provided', 'blacklisted token', 'jwt expired'].includes(err.message)) {
                    res.status(401).send('Unauthorized');
                    return;
                }

                next(err);
            });
    }
}