const config = require('../config/config');
const { User, Token } = require('../models');
const { jwt } = require('../util');

console.log(config.authCookie);

module.exports = {
    get: (req, res, next) => {
        const { username } = req.body;

        User.findOne({ username: { $regex: new RegExp(username, "i") } })
            .then((user) => res.status(200).send(user))
            .catch(next);
    },
    post: {
        register: (req, res, next) => {
            const { username, password } = req.body;

            User.create({ username, password })
                .then((createdUser) => {
                    res.send(createdUser);
                })
                .catch(err => {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        res.status(401).send('Username taken!');
                    } else {
                        next(err);
                    }
                });
        },
        login: (req, res, next) => {
            const { username, password } = req.body;

            User.findOne({ username: { $regex: new RegExp(username, "i") } })
                .then((user) => { return Promise.all([user, user.matchPassword(password)]) })
                .then(([user, match]) => {
                    if (!match) { res.status(401).send('Invalid credentials!'); return; }

                    user.populate('Paste');

                    const token = jwt.createToken({ id: user._id });
                    res.cookie(config.authCookie, token).send(user);
                })
                .catch(next);
        },
        logout: (req, res, next) => {
            const token = req.cookies[config.authCookie];

            Token.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookie).send('Successfully logged out!');
                })
                .catch(next);
        }
    },
    put: {
        edit: (req, res, next) => {
            const data = req.body;

            User.updateOne({ username: data.username }, data)
                .then(() => res.status(200).send('Successfully updated!'))
                .catch(next);
        }
    },
    delete: (req, res, next) => {
        const id = req.params.id;

        User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next);
    }
}