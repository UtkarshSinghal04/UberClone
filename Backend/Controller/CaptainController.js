const BlackListToken = require('../model/BlackListToken')
const Captain = require('../model/Captain')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {
    try {
        const captain = await Captain.create({ ...req.body });
        const token = captain.getToken();
        res.status(StatusCodes.CREATED).json({ captain, token });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password)
    {
        res.status(StatusCodes.BAD_REQUEST).json('please provide email and password');
    }

    const captain = await Captain.findOne({email})

    if(!captain)
    {
        res.status(StatusCodes.BAD_REQUEST).json('Captain does not exist');

    }

    const isPasswordCorrect = await captain.matchPassword(password)
    if(!isPasswordCorrect)
    {
        res.status(StatusCodes.BAD_REQUEST).json('Invalid credentials');
    }

    const token = captain.getToken()
    res.cookie('token', token)
    res.status(StatusCodes.OK).json({captain: captain, token: token})
}

const Profile = async(req, res) => {
    res.status(StatusCodes.OK).json(req.captain)
}

const logout = async(req, res) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await BlackListToken.create({token});
    res.status(StatusCodes.OK).json({message: "Logged out"})
}

module.exports = {
    register,
    login,
    Profile,
    logout
}