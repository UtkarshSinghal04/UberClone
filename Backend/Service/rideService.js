const Ride = require('../model/Ride')
const mapService = require('./mapService')
const crypto = require('crypto')

const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new Error('Please provide both pickup and destination')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination)

    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    }
    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    }
    const perMinRate = {
        auto: 2,
        car: 3,
        bike: 1.5
    }

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinRate.car)),
        bike: Math.round(baseFare.bike + ((distanceTime.distance.value / 1000) * perKmRate.bike) + ((distanceTime.duration.value / 60) * perMinRate.bike))
    }

    return fare
}

const getOtp = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

const createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination)
    const fare = await getFare(pickup, destination)

    const ride = Ride.create({
        user,
        pickup,
        destination,
        otp: getOtp(4),
        fare: fare[vehicleType],
        duration: distanceTime.duration.value,
        distance: distanceTime.distance.value
    })

    console.log(ride)

    return ride
}

const confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride Id is required')
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await Ride.findOne({
        _id: rideId
    }).populate('captain').populate('user').select('+otp')
    console.log(`ride with both user and data captain should be ${ride}`)

    if (!ride) {
        throw new Error('Ride Not found')
    }

    return ride
}

const startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride Id and OTP are required')
    }

    const ride = await Ride.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp')

    if (!ride) {
        throw new Error('Ride not found')
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted')
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP')
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride
}

const endRide = async ({ rideId, captain }) => {
    // console.log(`ride id here in rideService is: ${rideId}`)
    if (!rideId) {
        throw new Error('Ride id is required')
    }

    const ride = await Ride.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp')

    if (!ride) {
        throw new Error('ride not found')
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing')
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    console.log("ride in service is ")
    console.log(ride)
    return ride
}

const cancelRideByUser = async ({ rideId, user }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await Ride.findOne({
        _id: rideId,
        user: user._id, // Ensure the ride belongs to the captain
    });

    if (!ride) {
        throw new Error('Ride not found or does not belong to the user');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride cannot be canceled as it is not ongoing');
    }

    await Ride.findOneAndUpdate(
        { _id: rideId },
        { status: 'canceled' }
    );

    return ride;
};

const cancelRideByCaptain = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await Ride.findOne({
        _id: rideId,
        captain: captain._id, // Ensure the ride belongs to the captain
    }).populate('user').populate('captain');

    if (!ride) {
        throw new Error('Ride not found or does not belong to the user');
    }

    // if (ride.status !== 'accepted') {
    //     throw new Error('Ride cannot be canceled as status is diff than accepted');
    // }

    await Ride.findOneAndUpdate(
        { _id: rideId },
        { status: 'canceled' }
    );

    return ride;
};


module.exports = { createRide, getFare, confirmRide, startRide, endRide, cancelRideByUser, cancelRideByCaptain }