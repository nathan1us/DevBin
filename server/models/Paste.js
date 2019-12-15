const { Schema, model } = require('mongoose');

const pasteSchema = new Schema({
    author: {
        type: Schema.Types.String,
        ref: 'User'
    },
    title: {
        type: Schema.Types.String,
        default: 'Untitled'
    },
    content: {
        type: Schema.Types.String,
        required: true
    },
    pastedOn: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = model('Paste', pasteSchema);
