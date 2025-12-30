const {createRide, getFare, confirmRide, startRide, endRide, cancelRideByUser, cancelRideByCaptain} = require('../Service/rideService')
const {validationResult} = require('express-validator')
const mapService = require('../Service/mapService')
const {sendMessageToSocketId} = require('../socket')
const Ride = require('../model/Ride')

const RideCreater = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }

    const {userId, pickup, destination, vehicleType} = req.body

    try {
        const ride = await createRide({user: req.user._id, pickup, destination, vehicleType})
        res.status(201).json(ride)

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup)
        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 4)
        
        ride.otp = ""

        try {
            const rideWithUser = await Ride.findOne({_id: ride._id}).populate('captain').populate('user')
            // console.log(captainsInRadius, rideWithUser)
            captainsInRadius.map(captain => {
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: rideWithUser
                })
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: error.message})
        }


    } catch (error) {
        console.log(error)
    }   
}

const FareCreater = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }

    const {pickup, destination} = req.query

    try {
        const ride = await getFare(pickup, destination)
        res.status(201).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }   
}

const ConfirmRideCreater = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {rideId} = req.body

    try {
        const ride = await confirmRide({rideId, captain: req.captain})
        console.log("ride with both captain and user")
        console.log(ride)
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const StartRideCreater = async(req, res) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }

    const {rideId, otp} = req.query

    try {
        const ride = await startRide({rideId, otp, captain: req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const EndRideCreater = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()})
    }

    const {rideId} = req.body;

    try {
        const ride = await endRide({rideId, captain: req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})        
    }
}

const CancelRideByUserCreater = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await cancelRideByUser({ rideId, user: req.user });

        // Notify the captain via socket
        sendMessageToSocketId(ride.captain.socketId, {
            event: 'ride-canceled',
            data: ride,
        });

        return res.status(200).json({ message: 'Ride canceled successfully', ride });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

const CancelRideByCaptainCreater = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await cancelRideByCaptain({ rideId, captain: req.captain });

        // Notify the user via socket
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-canceled-captain',
            data: ride,
        });

        return res.status(200).json({ message: 'Ride canceled successfully', ride });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {RideCreater, FareCreater, ConfirmRideCreater, StartRideCreater, EndRideCreater, CancelRideByUserCreater, CancelRideByCaptainCreater}