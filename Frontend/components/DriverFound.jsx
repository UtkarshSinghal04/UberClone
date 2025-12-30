import React, { useEffect } from 'react';

import 'remixicon/fonts/remixicon.css';

const DriverFound = ({ setPanelOpen, setFoundDriver, ride}) => {
  
    return (
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-full mx-auto">
            {/* Close Button */}

            <div className="w-full flex justify-center ">
                <h5
                    onClick={() => {
                        setPanelOpen(true);
                        setFoundDriver(false);
                    }}
                    className="cursor-pointer"
                >
                    <i className="text-2xl text-gray-300 ri-arrow-down-wide-fill"></i>
                </h5>
            </div>

            {/* Heading */}
            <h3 className="text-3xl font-semibold mb-8">Start your ride</h3>

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
                {/* Button on the far right */}
                <button className=" w-1/4 py-2 bg-black text-white rounded-full text-sm font-semibold ml-auto">
                    OTP {ride?.otp}
                </button>
            </div>
        </div>
    );
};

export default DriverFound;