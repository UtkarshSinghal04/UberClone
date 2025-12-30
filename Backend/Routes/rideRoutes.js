const express = require('express')
const router = express.Router()
const { authUser, authCaptain } = require('../Middleware/authentication')
const { body, query } = require('express-validator')
const { RideCreater, FareCreater, ConfirmRideCreater, StartRideCreater, EndRideCreater, CancelRideByUserCreater, CancelRideByCaptainCreater } = require('../Controller/RideController')

router.post('/create-ride',
    body('vehicleType').isString().isIn(['auto', 'car', 'bike']).withMessage('Invalid Vehicle Type'),
    authUser,
    RideCreater
)

router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    FareCreater
)

router.post('/confirm-ride', 
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    ConfirmRideCreater
)

router.get('/start-ride', 
    authCaptain, 
    query('rideId').isMongoId().withMessage('Invalid ride Id'),
    query('otp').isString().isLength({min: 4, max: 4}).withMessage('Invalid Otp'),
    StartRideCreater
)

router.post('/end-ride', 
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride Id'),
    EndRideCreater
)

router.post('/cancel-ride-user',
    authUser, 
    body('rideId').isMongoId().withMessage('Invalid Ride Id'),
    CancelRideByUserCreater
);

router.post('/cancel-ride-captain',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid Ride Id'),
    CancelRideByCaptainCreater
)

module.exports = router