const { Paste, User } = require('../models');

module.exports = {
    get: {},
    post: async (req, res, next) => {
        const { content } = req.body;
        
        const author = 'anonymous';
        if (req.user)
            author = req.user._id;

        try {
            const createdPaste = await Paste.create({ author, content });
            if (author !== 'anonymous') await User.updateOne({ _id: author }, { $push: { pastes: createdPaste } });

            res.status(200).send(createdPaste);
        } catch (e) {
            next(e);
        }
    },
    put: {},
    delete: {}
}