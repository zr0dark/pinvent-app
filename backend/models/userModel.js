const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name.'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email.'],
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please enter a valid email address.',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please enter a good password.'],
            minLength: [
                10,
                'Password must be at least 10 characters in length.',
            ],
            maxLength: [
                30,
                'Password must not be longer than 30 characters in length.',
            ],
        },
    },
    {
        timestamps: true,
    }
)
const User = mongoose.model('User', userSchema)

module.exports = User
