import React from 'react'
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className='text-center font-climate text-7xl'>FASTAXI</h1>
      <p className='font-space text-3xl text-center p-3 w-[65vw]'>Your go-to platform for quick, reliable, and affordable taxi bookings. Whether you're a driver or a rider, we've got you covered!</p>
      <div className="flex space-x-8">
        
        <Link to="/rider-login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
          Join as User
        </Link>

        <Link to="/driver-login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded">
          Join as Driver
        </Link>
      </div>
    </div>
    </>
  )
}

export default Homepage