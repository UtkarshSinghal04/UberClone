import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css';

const CompleteRide = ({ setCompleteRideOpen, setPaymentOpen, ride, endRide }) => {

    return (

        <div className="flex p-3 flex-col items-center bg-white rounded-lg shadow-md w-screen">
            <div className="w-full flex justify-center ">
                <hr className="w-1/4 -mt-3 border-t-4 border-gray-400 mx-auto mb-5" />
            </div>

            {/* Heading */}
            <h3 className="text-sm font-normal text-gray-600 mb-2">Drop at</h3>
            <h3 className='text-xl font-medium mb-8 text-center'>{ride?.destination}</h3>

            {/* rider information */}
            <div className='flex items-center justify-between w-full p-3 mb-4 rounded-2xl bg-gray-200'>
                <div className='flex items-center justify-start gap-4'>
                    <img className='h-12 w-12 rounded-full object-cover'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnKHS83D8KsSebLSwa4BBk0OsW6Std0xkGqQ&s"
                        alt="User photo" />
                    <h4 className='text-xl font-medium'>{ride?.user?.fullname.firstname + " " + ride?.user?.fullname.lastname}</h4>
                </div>
                <div className='text-center mr-10'>
                    <i className="font-base ri-user-star-line"></i>
                    <p className='text-lg font-medium' >4.9</p>
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

            <h3 className="text-sm font-normal text-gray-600 mt-6">Ride Completed?</h3>
            <button onClick={() => {
                setCompleteRideOpen(false)
                setPaymentOpen(true)
                endRide()
            }} className='bg-green-500 w-[80%] mt-1 text-white font-semibold p-2 rounded-2xl'>
                Accept Payment
            </button>
        </div>

    )
}

export default CompleteRide
