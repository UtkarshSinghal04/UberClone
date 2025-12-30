import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context/UserContext';

const UserRegister = () => {

  const { setUser } = useGlobalContext()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const navigate = useNavigate()

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}user/register`, newUser)

    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    console.log('User Data:', newUser); // To verify data submission
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      {/* user login */}
      <div>
        <form onSubmit={HandleSubmit}>
          <img
            className="w-1/4 mb-8"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
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
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mt-5 mb-2 rounded px-4 py-2 w-full"
          >
            Create Account
          </button>
        </form>
        <div className='flex justify-center'>
          <p>Already have a account? </p>
          <Link to="/login" className="text-blue-600 ml-2">
            Login here
          </Link>
        </div>
      </div>
      {/* Captain login */}
      <div>
        <div>
          <p className='text-xs'>By proceding, you consent to get calls, Whatsapp or SMS messages, including by the automated means, from Uber and its affilates to the number provided</p>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
