import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/captain-login')
    }, [token])

    axios.get(`${import.meta.env.VITE_BASE_URL}captain/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if(res.status === 200)
        {
            localStorage.removeItem('token')
        }
    })
  return (
    <div>
      Captain-logout
    </div>
  )
}

export default CaptainLogout
