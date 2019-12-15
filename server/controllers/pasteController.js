const { Paste, User } = require('../models');

module.exports = {
    get: async (req, res, next) => {
        const pasteId = req.params.id;

        const found = await Paste.findById(pasteId);

        if (!found) { res.status(404).send('Not found!'); return; }

        res.status(200).send(found);
    },
    post: async (req, res, next) => {
        let { author, title, content } = req.body;

        if (title === '') title = undefined;

        try {
            const createdPaste = await Paste.create({ author, title, content });
            if (author !== 'anonymous') await User.updateOne({ username: author }, { $push: { pastes: createdPaste } });

            res.status(200).send(createdPaste);
        } catch (e) {
            next(e);
        }
    },
    put: (req, res, next) => {
        const pasteId = req.params.id;
        const { title, content } = req.body;
        let newContent = '';

        if (!content)
            newContent = ''
        else
            newContent = content;

        Paste.findOneAndUpdate({ _id: pasteId }, { title, content: newContent })
            .then(() => res.status(200).send('Successfully edited!'))
            .catch(next);
    },
    delete: async (req, res, next) => {
        const pasteId = req.params.id;

        try {
            const removedPaste = await Paste.findOneAndDelete({ _id: pasteId });
            await User.updateOne({ username: removedPaste.author }, { $pull: { pastes: removedPaste._id } });
        
            res.status(200).send('Successfully deleted!');
        } catch(e) {
            next(e);
        }
    }
}