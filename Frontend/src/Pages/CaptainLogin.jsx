import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/CaptainContext';

const userLogin = () => {

  const navigate = useNavigate()
  const {setCaptain}  = useGlobalContext()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const HandleSubmit = async(e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    setEmail('');
    setPassword('');

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}captain/login`, captainData)

    if(response.status === 200)
    {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      {/* user login */}
      <div>
        <form onSubmit={HandleSubmit}>
          <img
            className="w-1/4 mb-5"
            src="https://pngimg.com/d/uber_PNG24.png"
            alt="Uber Logo"
          />
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="abc@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mt-2 mb-2">Enter Password</h3>
          <input
            required
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            placeholder="Password123!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mt-5 mb-2 rounded px-4 py-2 w-full"
          >
            Login
          </button>
        </form>
        <div className='flex justify-center'>
          <p>Join a fleet? </p>
          <Link to="/captain-signup" className="text-blue-600 ml-2">
            Register as a captain
          </Link>
        </div>
      </div>
      {/* user login */}
      <div>
        <Link
          to="/login"
          className="text-center block bg-[#d5622d] text-white font-semibold mt-5 mb-2 rounded px-4 py-2"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default userLogin;
