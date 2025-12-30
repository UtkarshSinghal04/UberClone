import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useGlobalContext } from '../../context/CaptainContext';

const CaptainRegister = () => {

  const {setCaptain} = useGlobalContext()
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [color, setColor] = useState('')
  const [plate, setPlate] = useState('')
  const [capacity, setCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
      vehicle:{
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captain/register`, captainData)

    if(response.status === 201)
    {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setColor('')
    setPlate('')
    setCapacity('')
    setVehicleType('')
    console.log('captain Data:', captainData); // To verify data submission
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      {/* captain login */}
      <div>
        <form onSubmit={HandleSubmit}>
          <img
            className="w-1/4 mb-8"
            src="https://pngimg.com/d/uber_PNG24.png"
            alt="Uber Logo"
          />
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className='flex gap-3'>
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="text"
              placeholder="first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="text"
              placeholder="last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <h3 className="text-base font-medium mt-2 mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="abc@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-base mt-2 font-medium mt-2 mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="password"
            placeholder="Password123!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h3 className="text-base mt-2 font-medium mt-2 mb-2">Enter Vehicle details</h3>
          <div className='flex w-full gap-3' >
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Vehicle Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Plate Number"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
          <div className='flex w-full gap-3 mt-2'>
            <input
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              type="text"
              placeholder="Vehicle Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            <select
              required
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm "
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select vehicle
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>

          </div>

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mt-5 mb-2 rounded px-4 py-2 w-full"
          >
            Register
          </button>
        </form>
        <div className='flex justify-center'>
          <p>Already have a account? </p>
          <Link to="/captain-login" className="text-blue-600 ml-2">
            Login here
          </Link>
        </div>
      </div>
      {/* Captain login */}
      <div>
        <div>
          <p className='text-xs'>This site is protected by reCAPTCHA and <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainRegister;
