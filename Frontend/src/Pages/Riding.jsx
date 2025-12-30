import React from 'react'
import 'remixicon/fonts/remixicon.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useGlobalSocketContext } from "../../context/SocketContext";
import LiveTracking from '../../components/LiveTracking';


const Riding = () => {

    const location = useLocation()
    const {ride} = location.state || {}
    const navigate = useNavigate()

    const {socket} = useGlobalSocketContext()

    socket.on('ride-ended', () => {
        navigate('/home')
    })

    return (
        <div className='h-screen overflow-hidden'>
            {/* Uber Logo */}
            <img
                className="w-1/4 absolute top-5 left-5"
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt="Uber Logo"
            />
            <Link to='/home' className='fixed right-2 top-2 h-12 w-12 bg-white flex items-center justify-center rounded-full'>
                <i className="text-xl font-bold ri-home-3-line"></i>
            </Link>
            <div className='h-[50%]'>
                {/* <img
                    className="object-cover h-full w-full"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Map Background"
                /> */}
                <LiveTracking></LiveTracking>
            </div>
            <div className="h-[50%] mt-5 mb-5 flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-full mx-auto">

                {/* Heading */}
                <h3 className="text-3xl font-semibold mb-8">Enjoy your journey</h3>

                {/* Driver and vehicle info */}

                <div className="flex justify-between items-center mb-5">
                    <img
                        src=''
                        className="w-4"
                    />
                    <img
                        src="https://i.pinimg.com/736x/76/cb/1c/76cb1ca2526f87c4d3ab9261d17c9cae.jpg"
                        alt="vehicle"
                        className="w-1/4"
                    />
                    <div className="flex flex-col items-end ml-6">
                        <h2 className="text-lg font-semibold mb-1">{ride?.captain?.fullname.firstname + " " + ride?.captain?.fullname.lastname}</h2>
                        <h4 className="text-lg font-bold mb-1">{ride?.captain?.vehicle.plate}</h4>
                        <p className="text-sm text-gray-600">{ride?.captain?.vehicle.color + " " + ride?.captain?.vehicle.vehicleType}</p>
                    </div>
                    <img
                        src=''
                        className="w-4"
                    />
                </div>


                {/* Destination Details */}
                <div className="flex gap-3 items-start w-full px-4 mb-3">
                    <i className="ri-map-pin-2-line text-lg text-gray-600 mt-1 mr-3"></i>
                    <div>
                        <h2 className="text-md font-semibold text-gray-900">{ride?.destination} </h2>
                    </div>
                </div>

                {/* Vehicle Price and Button */}
                <div className="flex  items-center justify-between w-full px-4 mt-4">
                    <div className="flex gap-3 items-center">
                        <i className="ri-wallet-line text-lg text-gray-600 mr-2"></i>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                ₹{ride?.fare}
                            </h2>
                            <p className="text-sm text-gray-500">Pay via Cash</p>
                        </div>
                    </div>
                    
                </div>

                <h3 className="text-sm font-normal text-gray-600 mt-5">Ride Completed?</h3>
                <button className='w-[80%] mt-1 mb-1 bg-green-600 text-white font-semibold p-2 rounded-2xl'>Make a Payment</button>
            </div>

        </div>
    )
}

export default Riding
