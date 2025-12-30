import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../../components/LocationSearchPanel";
import SelectVehicle from "../../components/SelectVehicle";
import ConfirmRide from "../../components/ConfirmRide";
import LookingForDriver from '../../components/LookingForDriver'
import DriverFound from '../../components/DriverFound'
import LiveTracking from "../../components/LiveTracking";
import axios from 'axios'
import { useGlobalContext } from "../../context/UserContext";
import { useGlobalSocketContext } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const handleSubmit = (e) => e.preventDefault();
  const navigate = useNavigate()

  const [pickup, setPickup] = useState("");
  const [dest, setDest] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false)
  const [searchingDriver, setSearchingDriver] = useState(false)
  const [foundDriver, setFoundDriver] = useState(false)
  const [vehicleType, setVehicleType] = useState('')
  const [fare, setFare] = useState({})
  const [pickupSuggestions, setpickupSuggestions] = useState([])
  const [destSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveFeild] = useState('')
  const [ride, setRide] = useState({})

  const panelRef = useRef(null);
  const arrowRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const searchDriverRef = useRef(null)
  const foundDriverRef = useRef(null)

  const {socket} = useGlobalSocketContext()
  const {user} = useGlobalContext()

  useEffect(() => {
    socket.emit('join', {
      userType: 'user',
      userId: user._id
    })
  }, [user])

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "75%" : "0%",
    });
    gsap.to(arrowRef.current, {
      opacity: panelOpen ? 1 : 0,
    });
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(() => {
    if (confirmRideOpen) {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRideOpen])

  useGSAP(() => {
    if (searchingDriver) {
      gsap.to(searchDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(searchDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [searchingDriver])

  useGSAP(() => {
    if (foundDriver) {
      gsap.to(foundDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(foundDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [foundDriver])

  const handlePickup = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}map/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setpickupSuggestions(response.data)
    } catch (error) {
      throw new Error('can not set the pickUp suggestions')
    }
  }

  const handleDest = async (e) => {
    setDest(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}map/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      })

      setDestinationSuggestions(response.data)
    } catch (error) {
      throw new Error('Can not set the destination suggestions')
    }
  }

  const findTrip = async (e) => {
    setPanelOpen(false)
    setVehiclePanelOpen(true)

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}ride/get-fare`, {
        params: { pickup: pickup, destination: dest },
        headers: {
          Authorization: `bearer ${localStorage.getItem('token')}`
        }
      })

      setFare(response.data)
    } catch (error) {
      throw new Error('can not set the fare for trip')
    }
  }

  socket.on('ride-confirmed', ride => {
    setSearchingDriver(false)
    setFoundDriver(true)
    setVehiclePanelOpen(false)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setFoundDriver(false)
    navigate('/riding', {state: {ride}})
  })

  socket.on('ride-canceled-captain', ride => {
    setFoundDriver(false)
    setRide({})
    navigate('/home')
  })

  const createRide = async() => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}ride/create-ride`, {
      pickup: pickup,
      destination: dest,
      vehicleType: vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="w-1/4 absolute top-5 left-5 z-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Background Map */}
      <div className="h-[70%]">
        {/* <img
          className="object-cover h-full w-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map Background"
        /> */}
        <LiveTracking ></LiveTracking>
      </div>

      {/* Bottom Panel */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative shadow-lg z-20">
          <h5
            ref={arrowRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 text-3xl right-5 top-5 font-bold cursor-pointer transition-opacity duration-300"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className="text-3xl font-semibold mb-4">Find a trip</h4>
          <form onSubmit={handleSubmit}>
            {/* <div className="absolute h-16 w-1 left-10 bg-gray-700 rounded-full top-[35%]"></div> */}
            <div className="relative">
              <i className="ri-map-pin-2-line absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
              <input
                className="bg-gray-200 px-12 py-3 text-base rounded-md w-full mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
                type="text"
                placeholder="Add a pick up location"
                value={pickup}
                onChange={handlePickup}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveFeild("pickup");
                }}
              />
              <i
                className="ri-close-line absolute right-3 top-6 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setPickup('')}
              ></i>
            </div>
            <div className="relative">
              <i className="ri-map-pin-2-line absolute left-3 top-6 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
              <input
                className="bg-gray-200 px-12 py-3 text-base rounded-md w-full mb-3 focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
                type="text"
                placeholder="Add a drop location"
                value={dest}
                onChange={handleDest}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveFeild("dest");
                }}
              />
              <i
                className="ri-close-line absolute right-3 top-6 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setDest('')}
              ></i>
            </div>
          </form>
          <button onClick={findTrip}
            disabled={!pickup || !dest}
            className={`px-4 py-2 ml-10 mt-1 h-11 rounded-xl w-[80%]  text-white ${!pickup || !dest ? 'bg-gray-500' : 'bg-black'
              }`}>
            Find Trip
          </button>
        </div>

        {/* Expandable Panel */}
        <div
          ref={panelRef}
          className="bg-white z-20"
        >

          <LocationSearchPanel
            activeField={activeField}
            setPickup={setPickup}
            setDest={setDest}
            suggestions={activeField === 'pickup' ? pickupSuggestions : destSuggestions}
          ></LocationSearchPanel>
        </div>

        {/* location Selected Panel */}
        <div ref={vehiclePanelRef} className="fixed w-full bottom-0 bg-white p-3 translate-y-full  z-20">
          <SelectVehicle setConfirmRideOpen={setConfirmRideOpen} setVehiclePanelOpen={setVehiclePanelOpen} fare={fare} setVehicleType={setVehicleType}></SelectVehicle>
        </div>

        {/* confirm ride Panel */}
        <div ref={confirmRideRef} className="fixed w-full bottom-0 bg-white p-3 translate-y-full  z-20">
          <ConfirmRide setSearchingDriver={setSearchingDriver}
            setConfirmRideOpen={setConfirmRideOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            pickup={pickup}
            dest={dest}
            fare={fare}
            vehicleType={vehicleType}
            createRide = {createRide}
          ></ConfirmRide>
        </div>

        {/* Looking for driver Panel */}
        <div ref={searchDriverRef} className="fixed w-full bottom-0 bg-white p-3 translate-y-full  z-20">
          <LookingForDriver setSearchingDriver={setSearchingDriver} setVehiclePanelOpen={setVehiclePanelOpen}
            pickup={pickup}
            dest={dest}
            fare={fare}
            vehicleType={vehicleType}></LookingForDriver>
        </div>

        {/* Driver Found Panel */}
        <div ref={foundDriverRef} className="fixed w-full bottom-0 bg-white p-3 translate-y-full  z-20">
          <DriverFound setPanelOpen={setPanelOpen}
          setFoundDriver={setFoundDriver}
          ride = {ride} ></DriverFound>
        </div>
      </div>
    </div>
  );
};

export default Home;
