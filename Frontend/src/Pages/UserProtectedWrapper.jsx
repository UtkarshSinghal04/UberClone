import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context/UserContext';

const UserProtectedWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setUser } = useGlobalContext();

  useEffect(() => {
    // Redirect to login if no token
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setUser(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserProfile();

    // Cleanup function to abort any ongoing request (if necessary)
    return () => {
      setLoading(false); // Ensures no stale state
    };
  }, [token, navigate, setUser]);

  if (loading) {
    return <>loading...</>;
  }

  return <div>{children}</div>;
};

export default UserProtectedWrapper;
