import React from 'react'
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Taxi Management System</h1>
      
      <div className="flex space-x-8">
        {/* User Button */}
        <Link to="/rider-login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
          Join as User
        </Link>

        {/* Driver Button */}
        <Link to="/driver-login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded">
          Join as Driver
        </Link>
      </div>
    </div>
    </>
  )
}

export default Homepage