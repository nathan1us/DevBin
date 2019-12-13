const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        unique: [true, 'The username is already taken!'],
        required: true
    },
    password: {
        type: Schema.Types.String,
        required: true
    },
    authLevel: {
        type: Schema.Types.Number,
        default: 1
    },
    pastes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Paste'
        }
    ]
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return; }

                this.password = hash;
                next();
            });
        });

        return;
    }

    next();
});

module.exports = new model('User', userSchema);
