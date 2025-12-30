const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors') 
const cookieParser = require('cookie-parser') 
const userRouter = require('./Routes/UserRoute')
const capRouter = require('./Routes/CapRoute')
const mapRouter = require('./Routes/MapRoutes')
const rideRouter = require('./Routes/rideRoutes')

app.use(cors())
app.use(express.json())
app.use(cookieParser())

//routes setup
app.get('/', (req, res) => {
    res.send("this is uber clone")
})

app.use('/user', userRouter)
app.use('/captain', capRouter)
app.use('/map', mapRouter)
app.use('/ride', rideRouter)

//payment page

app.post('/api/generate-qr', async (req, res) => {
    const { amount } = req.body;

    const paymentUrl = `upi://pay?pa=divyanshi.15903-1@okhdfcbank&pn=YourName&am=${amount}&cu=INR`;

    try {
        const qrCode = await QRCode.toDataURL(paymentUrl); // Generate a base64 QR code
        res.status(200).json({ qrCode });
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ message: 'Failed to generate QR code' });
    }
});

module.exports = app

