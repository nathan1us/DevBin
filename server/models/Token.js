const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
    token: String
});

module.exports = model('Token', tokenSchema);