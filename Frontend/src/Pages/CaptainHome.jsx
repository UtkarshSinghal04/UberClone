import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DriverInfo from '../../components/DriverInfo'
import LookingForRide from '../../components/LookingForRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import PickingRide from '../Pages/PickingRide'
import CompleteRide from './CompleteRide'
import Payment from './Payment'
import { useGlobalSocketContext } from '../../context/SocketContext'
import { useGlobalContext } from '../../context/CaptainContext'
import axios from 'axios'
import { EventEmitter } from "events";
import { useRideGlobalContext } from '../../context/RideContext'
import LiveTracking from '../../components/LiveTracking'

const CaptainHome = () => {

  const rideEvents = new EventEmitter();

  const [lookingForRideOpen, setLookingForRideOpen] = useState(false)
  const lookingForRideRef = useRef(null)

  const [pickingOpen, setPickingOpen] = useState(false)
  const pickingOpenRef = useRef(null)

  const [completeRideOpen, setCompleteRideOpen] = useState(false)
  const completeRideOpenRef = useRef(null)

  const [paymentOpen, setPaymentOpen] = useState(false)
  const paymentOpenRef = useRef(null)

  const { rideCancelled } = useRideGlobalContext()

  const [ride, setRide] = useState({})

  const { socket } = useGlobalSocketContext()
  const { captain } = useGlobalContext()
  const navigate = useNavigate()

  const acceptRide = async () => {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}ride/confirm-ride`, {
      rideId: ride._id,
      captain: captain._id
    }, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    })

    setPickingOpen(true)
    setLookingForRideOpen(false)
  }

  const cancelRide = async () => {
    console.log('captain is ')
    console.log(captain)
    console.log("ride in captain cancel is")
    console.log(ride)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}ride/cancel-ride-captain`, {
      rideId: ride._id,
      captain: captain._id
    }, {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    })

    setLookingForRideOpen(false)
    setPickingOpen(false)
  }

  useEffect(() => {
    const onRideCancelled = () => {
      console.log("Ride was cancelled");
      setRide({});
      setLookingForRideOpen(false);
      setPickingOpen(false);
      setCompleteRideOpen(false);
      setPaymentOpen(false);
      navigate('/home');
    };

    rideEvents.on("rideCancelled", onRideCancelled);

    return () => {
      rideEvents.off("rideCancelled", onRideCancelled); // Cleanup listener
    };
  });

  useEffect(() => {
    if (rideCancelled) {
      console.log("Ride was cancelled");
      setRide({});
      setLookingForRideOpen(false);
      setPickingOpen(false);
      setCompleteRideOpen(false);
      setPaymentOpen(false);
      setRideCancelled(false);
      navigate('/home');
    }
  }, [rideCancelled]);

  useEffect(() => {
    socket.emit('join', {
      userType: 'captain',
      userId: captain._id
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    return () => {
      clearInterval(locationInterval); // Clear interval on unmount
    };
  }, [captain])


  socket.on('new-ride', data => {
    setRide(data);
    setLookingForRideOpen(true);
  });


  const endRide = async () => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}ride/end-ride`, {
      rideId: ride._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {
      setPaymentOpen(true)
    }
  }

  useGSAP(() => {
    if (lookingForRideOpen) {
      gsap.to(lookingForRideRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(lookingForRideRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [lookingForRideOpen])

  useGSAP(() => {
    if (pickingOpen) {
      gsap.to(pickingOpenRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(pickingOpenRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [pickingOpen])

  useGSAP(() => {
    if (completeRideOpen) {
      gsap.to(completeRideOpenRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(completeRideOpenRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [completeRideOpen])

  useGSAP(() => {
    if (paymentOpen) {
      gsap.to(paymentOpenRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(paymentOpenRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [paymentOpen])

  return (
    <div onClick={() => console.log(paymentOpen)} className='h-screen overflow-hidden'>
      {/* Uber Logo */}
      <img
        className="w-1/4 absolute top-5 left-5 z-20"
        src="https://pngimg.com/d/uber_PNG24.png"
        alt="Uber Logo"
      />
      <Link to='/captain-home' onClick={() => setLookingForRideOpen(false)} className='fixed right-2 top-2 h-14 w-14 bg-white flex items-center justify-center rounded-full'>
        <i className="text-xl font-bold ri-logout-box-r-line"></i>
      </Link>
      <div className='h-[65%]'>
        {/* <img
          className="object-cover h-full w-full"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map Background"
        /> */}
        <LiveTracking></LiveTracking>
      </div>
      <div className='h-[35%] p-6 mt-2 z-20'>
        <DriverInfo setLookingForRideOpen={setLookingForRideOpen}
          ride={ride} />
      </div>
      {/* Looking for Ride Panel */}
      <div ref={lookingForRideRef} className="fixed w-full bottom-0 bg-white p-3 translate-y-full  z-20">
        <LookingForRide
          setLookingForRideOpen={setLookingForRideOpen}
          setPickingOpen={setPickingOpen}
          acceptRide={acceptRide}
          ride={ride} ></LookingForRide>

      </div>
      {/* Picking Ride Panel */}
      <div ref={pickingOpenRef} className="fixed w-full bottom-0 bg-white p-3 translate-y-full  z-20">
        <PickingRide setLookingForRideOpen={setLookingForRideOpen} cancelRide = {cancelRide} setPickingOpen={setPickingOpen} setCompleteRideOpen={setCompleteRideOpen} ride={ride} ></PickingRide>
      </div>
      {/* Complete Ride Panel */}
      <div ref={completeRideOpenRef} className="fixed w-full bottom-0 bg-white p-3 translate-y-full z-20">
        <CompleteRide setPaymentOpen={setPaymentOpen} setLookingForRideOpen={setLookingForRideOpen} setPickingOpen={setPickingOpen} setCompleteRideOpen={setCompleteRideOpen} ride={ride} endRide={endRide} ></CompleteRide>
      </div>

      {/* Payment Panel */}
      <div ref={paymentOpenRef} className="fixed w-full bottom-0 bg-white p-3 translate-y-full z-20">
        <Payment setPaymentOpen={setPaymentOpen} setPickingOpen = {setPickingOpen} setRide = {setRide} ride={ride}></Payment>
      </div>
    </div>
  )
}

export default CaptainHome
