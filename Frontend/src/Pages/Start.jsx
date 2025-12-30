import React from 'react';
import { Link } from 'react-router-dom';

const Start = () => {
  return (
    <div>
      {/* Parent container with proper background image */}
      <div
        className="bg-cover bg-center min-h-screen flex flex-col justify-between pt-8"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1683568217010-e390b4f34737?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwaWxsdXN0cmF0aW9ufGVufDB8fDB8fHww')",
        }}
      >
        {/* Uber Logo */}
        <img
          className="w-1/4 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        {/* White Section */}
        <div className="bg-white py-5 px-8 rounded shadow-lg w-full">
          <h1 className="text-3xl font-bold mb-3 text-center">Get started with Uber</h1>
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="w-full text-center bg-black text-white py-3 rounded mt-2 "
            >
              Continue
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
