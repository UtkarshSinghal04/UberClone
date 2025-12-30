const BlackListToken = require('../model/BlackListToken')
const User = require('../model/user')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body });
        const token = user.getToken();
        res.status(StatusCodes.CREATED).json({ user, token });
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

    const user = await User.findOne({email})

    if(!user)
    {
        res.status(StatusCodes.BAD_REQUEST).json('user does not exist');

    }

    const isPasswordCorrect = await user.matchPassword(password)
    if(!isPasswordCorrect)
    {
        res.status(StatusCodes.BAD_REQUEST).json('Invalid credentials');
    }

    const token = user.getToken()
    res.cookie('token', token)
    res.status(StatusCodes.OK).json({user: user, token: token})
}

const Profile = async(req, res) => {
    res.status(StatusCodes.OK).json(req.user)
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