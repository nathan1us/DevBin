const { Paste, User } = require('../models');

module.exports = {
    get: async (req, res, next) => {
        const pasteId = req.params.id;

        const found = await Paste.findById(pasteId);

        if (!found) { res.status(404).send('Not found!'); return; }

        res.status(200).send(found);
    },
    post: async (req, res, next) => {
        const { author, content } = req.body;

        try {
            const createdPaste = await Paste.create({ author, content });
            if (author !== 'anonymous') await User.updateOne({ username: author }, { $push: { pastes: createdPaste } });

            res.status(200).send(createdPaste);
        } catch (e) {
            next(e);
        }
    },
    put: (req, res, next) => {
        const pasteId = req.params.id;
        const { content } = req.body;
        let newContent = '';

        if (!content)
            newContent = ''
        else
            newContent = content;

        Paste.findOneAndUpdate({ _id: pasteId }, { content: newContent })
            .then(() => res.status(200).send('Successfully edited!'))
            .catch(next);
    },
    delete: async (req, res, next) => {
        const pasteId = req.params.id;

        try {
            const removedPost = await Paste.findOneAndDelete({ _id: pasteId });
            await Paste.updateOne({ username: removedPost.author }, { $pull: { posts: removedPost._id } });
        
            res.status(200).send('Successfully deleted!');
        } catch(e) {
            next(e);
        }
    }
}