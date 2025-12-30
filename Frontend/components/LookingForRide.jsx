import React from 'react'
import 'remixicon/fonts/remixicon.css';

const LookingForRide = ({ setLookingForRideOpen, setPickingOpen, ride, acceptRide }) => {

    return (

        <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md w-screen">
            {/* Close Button */}

            <div className="w-full flex justify-center ">
                <h5
                    onClick={() => {
                        setLookingForRideOpen(false)
                    }}
                    className="cursor-pointer"
                >
                    <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
                </h5>
            </div>

            {/* Heading */}
            <h3 className="text-3xl font-semibold mb-8">Looking for ride</h3>

            {/* rider information */}
            <div className='flex items-center justify-between w-full p-3 mb-4 rounded-2xl bg-yellow-500'>
                <div className='flex items-center justify-start gap-4'>
                    <img className='h-12 w-12 rounded-full object-cover'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnKHS83D8KsSebLSwa4BBk0OsW6Std0xkGqQ&s"
                        alt="Captain photo" />
                    <h4 className='text-xl font-base'>{ride?.user?.fullname.firstname + " " + ride?.user?.fullname.lastname}</h4>
                </div>
                <div className='text-center'>
                    <i className="font-base ri-user-star-line"></i>
                    <p className='text-lg font-medium' >4.9</p>
                </div>
                <div className='mr-3'>
                    <h4 className='text-xl font-medium'>2.2 Km </h4>
                    <p className='text-sm text-gray-600'>Away</p>
                </div>
            </div>

            {/* Destination Details */}
            <div className="flex gap-3 items-start w-full px-4 mb-3">
                <i className="ri-map-pin-2-line text-lg text-gray-600 mt-1 mr-3"></i>
                <div>
                    <h2 className='text-sm text-gray-600'>Pickup Location: </h2>
                    <h2 className="text-md font-semibold text-gray-900">{ride?.pickup}</h2>
                </div>
            </div>

            <div className="flex gap-3 items-start w-full px-4 mb-3">
                <i className="ri-map-pin-2-line text-lg text-gray-600 mt-1 mr-3"></i>
                <div>
                    <h2 className='text-sm text-gray-600'>Drop Location: </h2>
                    <h2 className="text-md font-semibold text-gray-900">{ride?.destination}</h2>
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

            {/* Button on the far right */}
            <button onClick={() => {
                setPickingOpen(true)
                setLookingForRideOpen(false)
                acceptRide()
            }} className="w-[80%] mt-8 bg-green-600 text-white font-semibold p-2 rounded-2xl">
                Accept
            </button>

            <button onClick={() => { setLookingForRideOpen(false) }} className="bg-gray-500 w-[80%] mt-4 text-white font-semibold p-2 rounded-2xl">
                Ignore
            </button>
        </div>

    )
}

export default LookingForRide
