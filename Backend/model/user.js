const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, 'please provide name'],
            minlength: [3, 'firstname must be of atleast 3 character']
        },

        lastname: {
            type: String,
        }
    },

    email: {
        type: String,
        required: [true, 'please provide email'],
        unique: true,
        match: [
            /.*?@?[^@]*\.+.*/,
            'please provide a valid email'
        ]
    },

    password: {
        type: String,
        required: [true, 'please provide password'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            'password must have at least one lowercase letter, one uppercase letter, one number, one special character, and must be at least 8 characters long'
        ],
    },

    socketId: {
        type: String
    }
})

UserSchema.pre('save', async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});


UserSchema.methods.getToken = function () {
    let token = jwt.sign({userId: this.id}, process.env.JwtSecret, {expiresIn: '24h'})
    return token
}

UserSchema.methods.matchPassword = async function(userPassword) {
    const isPasswordCorrect = await bcryptjs.compare(userPassword, this.password)
    return isPasswordCorrect
}

module.exports = mongoose.model('User', UserSchema)
