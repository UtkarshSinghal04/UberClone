import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppUserProvider } from '../context/UserContext'
import { AppCaptainProvider } from '../context/CaptainContext'
import { SocketProvider } from '../context/SocketContext'
import { RideProvider } from '../context/RideContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RideProvider>
      <SocketProvider>
        <AppCaptainProvider>
          <AppUserProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AppUserProvider>
        </AppCaptainProvider>
      </SocketProvider>
    </RideProvider>
  </StrictMode>,
)
