

import axios from "axios"
import React, { useState, useEffect } from "react"

import { Card, CardContent, CardHeader} from "@mui/material"
import { Link } from "react-router-dom"

export default function DriverProfile() {
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    license_number: '',
    address: '',
    date_of_birth: '',
  })

  useEffect(() => {
    axios
      .get("https://dbms-project-taxi-booking-system.onrender.com/api/drivers/profile")
      .then((res) => {
        setProfile(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/driver-profile" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900">
                Profile
              </Link>
              <Link to="/driver-trippage" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Current Trips
              </Link>
              <Link to="/driver-triphistory" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Trip History
              </Link>
            </div>
            <div className="pt-4">
            <Link to="/" className="text-black text-3xl font-bold tracking-tighter">
              FASTAXI
            </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          
            <h1 className="text-3xl font-bold text-center text-gray-900 p-5 font-nunito">Driver Profile</h1>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center font-nunito md:pl-[15rem]">
              <div className="p-3 flex items-center gap-4">
                <p className="font-medium text-gray-500">Full Name</p>
                <p className="text-lg font-semibold text-gray-900">{profile.full_name}</p>
              </div>
              <div className="p-3 flex items-center gap-4">
                <p className="font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900">{profile.email}</p>
              </div>
              <div className="p-3 flex items-center gap-4">
                <p className="font-medium text-gray-500">Phone Number</p>
                <p className="text-lg font-semibold text-gray-900">{profile.phone_number}</p>
              </div>
              <div className="p-3 flex items-center gap-4">
                <p className="font-medium text-gray-500">License Number</p>
                <p className="text-lg font-semibold text-gray-900">{profile.license_number}</p>
              </div>
              <div className="p-3 flex items-center gap-4">
                <p className="font-medium text-gray-500">Address</p>
                <p className="text-lg font-semibold text-gray-900">{profile.address}</p>
              </div>
              <div className="p-3 flex items-center gap-4">
                <p className="font-medium text-gray-500">Date of Birth</p>
                <p className="text-lg font-semibold text-gray-900">{profile.date_of_birth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4">
          <Link to="/driver-trippage">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
              View Current Trips
            </button>
          </Link>
          <Link to="/driver-triphistory">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
              View Trip History
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}