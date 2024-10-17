

import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Card, CardContent } from "@mui/material"
import { Link } from 'react-router-dom'

export default function DriverTripPage() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = () => {
    axios
      .get('http://localhost:5000/api/drivers/driver-trips')
      .then((res) => setTrips(res.data))
      .catch((err) => console.log(err))
  }

  function markAsFinished(tripId) {
    axios
      .put(`http://localhost:5000/api/drivers/finish-trip/${tripId}`)
      .then(() => {
        setTrips(trips.filter(trip => trip.trip_id !== tripId))
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/driver-profile" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Profile
              </Link>
              <Link to="/driver-trippage" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900">
                Current Trips
              </Link>
              <Link to="/driver-triphistory" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Trip History
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 font-nunito">
        <Card>
          <h1 className="text-3xl font-bold text-center text-gray-900 p-5">Assigned Trips</h1>
          <CardContent>
            {trips.length === 0 ? (
              <p className="text-center text-gray-500">No assigned trips at the moment.</p>
            ) : (
              <ul className="space-y-4">
                {trips.map(trip => (
                  <li key={trip.trip_id} className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
                      <div className="flex items-center justify-center">
                        <div className='text-center'>
                          <p className="text-lg font-medium text-gray-500 w-[250px]">Pickup</p>
                          <p className="mt-1 text-sm text-gray-900">{trip.pickup_location}</p>
                        </div>
                        <div className='text-center'>
                          <p className="text-lg font-medium text-gray-500 w-[250px]">Dropoff</p>
                          <p className="mt-1 text-sm text-gray-900">{trip.dropoff_location}</p>
                        </div>
                        <div className='text-center'>
                          <p className="text-lg font-medium text-gray-500 w-[250px]">Fare</p>
                          <p className="mt-1 text-sm text-gray-900">₹{trip.trip_fare}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() => markAsFinished(trip.trip_id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Mark as Finished
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}