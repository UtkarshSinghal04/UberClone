import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/UserContext';

const UserLogin = () => {
  const { user, setUser } = useGlobalContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}user/login`, userData);
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token)
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }

    setEmail('');
    setPassword('');
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
        <div className="flex justify-center">
          <p>New User? </p>
          <Link to="/signup" className="text-blue-600 ml-1">
            Create Account
          </Link>
        </div>
      </div>
      {/* Captain login */}
      <div>
        <Link
          to="/captain-login"
          className="text-center block bg-[#10b461] text-white font-semibold mt-5 mb-2 rounded px-4 py-2"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
