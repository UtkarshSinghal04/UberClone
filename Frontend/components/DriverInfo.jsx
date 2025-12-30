import React from 'react'
import { useGlobalContext } from '../context/CaptainContext'

const DriverInfo = ({ setLookingForRideOpen, ride }) => {

    const { captain } = useGlobalContext()

    return (
        <div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-12'>
                    <img className='h-12 w-12 rounded-full object-contain'
                        src="https://static.tiktokemoji.com/202410/31/qGSQZXu6.webp"
                        alt="Captain photo" />
                    <h4 className='text-lg font-medium ml-2'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
                </div>
                <div className='text-center'>
                    <i className="font-base ri-user-star-line"></i>
                    <p className='text-lg font-medium' >4.7</p>
                </div>
                <div className='mr-3'>
                    <h4 className='text-xl font-medium'>₹1295.20</h4>
                    <p className='text-sm text-gray-600'>Earned</p>
                </div>
            </div>
            <div className='flex gap-10 p-3 mt-12 bg-gray-200 rounded-xl justify-between'>
                <div className='text-center '>
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className='text-lg font-medium'>10.2</h5>
                    <p className='text-sm text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center mr-4'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className='text-lg font-medium'>30 Km</h5>
                    <p className='text-sm text-gray-600'>Total Distance</p>
                </div>
                <div className='text-center mr-4'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className='text-lg font-medium'>20</h5>
                    <p className='text-sm text-gray-600'>Total Jobs</p>
                </div>
            </div>

            <div className='text-center'>
                <button
                    onClick={() => {
                        setLookingForRideOpen(true);
                    }}
                    disabled={Object.keys(ride).length === 0} // Disable if ride is empty
                    className={`w-[80%] mt-8 font-semibold p-2 rounded-2xl ${Object.keys(ride).length === 0
                            ? "bg-gray-400 cursor-not-allowed" // Disabled styles
                            : "bg-green-600 text-white"       // Enabled styles
                        }`}
                >
                    Look for Rides
                </button>

            </div>
        </div>
    )
}

export default DriverInfo
