import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context/CaptainContext';

const CaptainProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setCaptain } = useGlobalContext();

  useEffect(() => {
    // Redirect to login if no token
    if (!token) {
      navigate('/captain-login');
      return;
    }

    const fetchCaptainProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}captain/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setCaptain(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/captain-login');
      }
    };

    fetchCaptainProfile();

    // Cleanup function to prevent state updates on unmounted components
    return () => {
      setLoading(false); // Prevents potential memory leaks
    };
  }, [token, navigate, setCaptain]);

  if (loading) {
    return <>loading...</>;
  }

  return <div>{children}</div>;
};

export default CaptainProtectedWrapper;
