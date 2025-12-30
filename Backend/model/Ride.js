const mongoose = require('mongoose')

const RideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'provide user id']
        
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup : {
        type: String,
        requuired: [true, 'provide pickup location']
    },
    destination: {
        type: String,
        required: [true, 'provide drop location']
    },
    fare: {
        type: Number,
        required: true
    },
    duration: {
        type: Number //in seconds
    },
    distance: {
        type: Number //in meters
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'canceled'],
        default: 'pending'
    },
    otp: {
        type: String,
        select: false,
        required: true
    },

    paymentId: {
        type: String
    },
    orderId: {
        type: String
    },
    signature: {
        type: String
    },
})

module.exports = mongoose.model('Ride', RideSchema)