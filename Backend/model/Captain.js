const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const CaptainSchema = new mongoose.Schema({
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
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color: {
            type: String,
            require: [true, 'please provide Color of your vehicle'],
        },
        plate: {
            type: String,
            required: [true, 'please provide Number plate of your vehicle'],
            match: [
                /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/,
                'please enter valid plate number'
            ]
        },
        capacity: {
            type: Number,
            required: [true, 'please provide Capacity of your Vehicle'],
            min: [1, 'capacity must be atleast 1']
        },
        vehicleType:{
            type: String,
            required: [true, 'please provide Type of Vehicle you have'],
            enum: ['car', 'bike', 'auto']
        }
    },

    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
})

CaptainSchema.pre('save', async function () {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});


CaptainSchema.methods.getToken = function () {
    let token = jwt.sign({captainId: this.id}, process.env.JwtSecret, {expiresIn: '24h'})
    return token
}

CaptainSchema.methods.matchPassword = async function(CaptainPassword) {
    const isPasswordCorrect = await bcryptjs.compare(CaptainPassword, this.password)
    return isPasswordCorrect
}

module.exports = mongoose.model('Captain', CaptainSchema)