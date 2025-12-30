import React from 'react';
import { useGlobalContext } from '../context/UserContext';
import 'remixicon/fonts/remixicon.css';

const ConfirmRide = ({ setConfirmRideOpen, setVehiclePanelOpen, setSearchingDriver, pickup, dest, vehicleType, fare, createRide }) => {
    const { vehicleImageUrl } = useGlobalContext();

    return (
        <div className="flex flex-col items-center p-2 bg-white rounded-lg shadow-md w-full">
            {/* Close Button */}

            <div className="w-full flex justify-center ">
                <h5
                    onClick={() => {
                        setConfirmRideOpen(false);
                        setVehiclePanelOpen(true);
                    }}
                    className="cursor-pointer"
                >
                    <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
                </h5>
            </div>

            {/* Heading */}
            <h3 className="text-3xl font-semibold mb-8">Confirm your ride</h3>

            {/* Vehicle Image */}
            <div className="w-full flex justify-center mb-4">
                <img
                    src={vehicleImageUrl}
                    alt="vehicle"
                    className="w-1/2 h-20 object-contain"
                />
            </div>

            {/* pickup Details */}
            <div className="flex gap-3 items-start w-full px-4 mb-3">
                <i className="ri-map-pin-2-line text-lg text-gray-600 mt-1 mr-3"></i>
                <div className='flex flex-col'>
                    <h3 className="text-sm font-normal text-gray-600 ">PickUp at</h3>
                    <h3 className='text-base font-medium'>{pickup}</h3>
                </div>
            </div>

            {/* Destination Details */}
            <div className="flex gap-3 items-start w-full px-4 mb-3">
                <i className="ri-map-pin-2-line text-lg text-gray-600 mt-1 mr-3"></i>
                <div className='flex flex-col'>
                    <h3 className="text-sm font-normal text-gray-600 ">Drop at</h3>
                    <h3 className='text-base font-medium'>{dest}</h3>
                </div>
            </div>

            {/* Vehicle Price and Button */}
            <div className="flex  items-center justify-between w-full px-4 mt-4">
                <div className="flex gap-3 items-center">
                    <i className="ri-wallet-line text-lg text-gray-600 mr-2"></i>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            ₹{fare[vehicleType]}
                        </h2>
                        <p className="text-sm text-gray-500">Pay via Cash</p>
                    </div>
                </div>
            </div>
            {/* Button on the far right */}
            <button onClick={() => {
                setSearchingDriver(true)
                setConfirmRideOpen(false)
                createRide()
            }} className="w-[80%] mt-8 bg-green-600 text-white font-semibold p-2 rounded-2xl">
                Confirm
            </button>
        </div>
    );
};

export default ConfirmRide;