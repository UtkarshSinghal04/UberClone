import React, {useState} from 'react'
import 'remixicon/fonts/remixicon.css';
import axios from 'axios'

const PickingRide = ({ setLookingForRideOpen, setPickingOpen, setCompleteRideOpen, ride, cancelRide }) => {
    const [OTP, setOTP] = useState('')

    const HandleSubmit = async(e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}ride/start-ride`, {
            params: {
                rideId: ride._id,
                otp: OTP
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status === 200){
            setCompleteRideOpen(true)
            setOTP('')
        }
    }
    return (

        <div className="flex p-3 flex-col items-center bg-white rounded-lg shadow-md w-screen">
            {/* Close Button */}

            <div className="w-full flex justify-center ">
            <hr className="w-1/4 -mt-3 border-t-4 border-gray-400 mx-auto mb-5" />
            </div>

            {/* Heading */}
            <h3 className="text-sm font-normal text-gray-600 mb-2">PickUp at</h3>
            <h3 className='text-xl font-medium mb-8 text-center'>{ride?.pickup}</h3>

            {/* rider information */}
            <div className='flex items-center justify-between w-full p-3 mb-4 rounded-2xl bg-gray-200'>
                <div className='flex items-center justify-start gap-4'>
                    <img className='h-12 w-12 rounded-full object-cover'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnKHS83D8KsSebLSwa4BBk0OsW6Std0xkGqQ&s"
                        alt="User photo" />
                    <h4 className='text-xl font-medium'>{ride?.user?.fullname.firstname + " " + ride?.user?.fullname.lastname}</h4>
                </div>
                <div className='text-center'>
                <i className="font-base ri-user-star-line"></i>
                <p className='text-lg font-medium' >4.9</p>
                </div>
                <div className='mr-3'>
                    <h4 className='text-xl font-medium'>Arrived</h4>
                    {/* <p className='text-sm text-gray-600'>Away</p> */}
                </div>
            </div>

            {/* Destination Details */}

            <div className="flex gap-3 items-start w-full px-4 mb-3">
                <i className="ri-map-pin-2-line text-lg text-gray-600 mt-1 mr-3"></i>
                <div>
                    <h2 className='text-sm text-gray-600'>Drop Location: </h2>
                    <h2 className="text-md font-semibold text-gray-900">{ride.destination}</h2>
                </div>
            </div>

            {/* Vehicle Price and Button */}
            <div className="flex  items-center justify-between w-full px-4 mt-4">
                <div className="flex gap-3 items-center">
                    <i className="ri-wallet-line text-lg text-gray-600 mr-2"></i>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            ₹{ride.fare}
                        </h2>
                        <p className="text-sm text-gray-500">Pay via Cash</p>
                    </div>
                </div>
            </div>

            <form onSubmit = {HandleSubmit} className=" w-[80%] mt-4 text-black font-semibold p-2 rounded-2xl flex items-center justify-between gap-6">
                <input type="text" value = {OTP} onChange = {(e) => {setOTP(e.target.value)}} className='w-1/2 bg-gray-200 font-mono h-12 rounded-2xl text-center' placeholder='Enter OTP'/>
                <button onClick={() => {
                    setLookingForRideOpen(false) 
                    setPickingOpen(false)
                }} className='text-xl w-1/2 text-white h-12 bg-green-600 rounded-2xl'>Verify OTP</button>
            </form>

            <button onClick={() => {
                setPickingOpen(false)
                cancelRide()}} className='bg-red-500 w-[80%] mt-4 text-white font-semibold p-2 rounded-2xl'>
                Cancel Ride
            </button>
        </div>

    )
}

export default PickingRide
