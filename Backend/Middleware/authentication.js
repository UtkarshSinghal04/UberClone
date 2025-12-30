const User = require('../model/user')
const Captain = require('../model/Captain')
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const BlackListToken = require('../model/BlackListToken');


const authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({message: "Unauthorized person"})
    }

    const isBlacklisted = await BlackListToken.findOne({token: token})
    if(isBlacklisted)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Unauthorized User'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JwtSecret);
        const user = await User.findById(decoded.userId)

        req.user = user;
        
        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized person 2"})
    }
}

const authCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({message: "Unauthorized person"})
    }

    const isBlacklisted = await BlackListToken.findOne({token: token})
    if(isBlacklisted)
    {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Unauthorized User'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JwtSecret);
        const captain = await Captain.findById(decoded.captainId)

        req.captain = captain;
        
        return next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized person"})
    }
}

module.exports = {authUser, authCaptain}