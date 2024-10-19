'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Card, CardContent } from "@mui/material"
import { Table, TableBody} from "@mui/material"
import { Link } from 'react-router-dom'

export default function DriverTripHistory() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/drivers/driver-history')
      .then((res) => setTrips(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <Link to="/driver-profile" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Profile
              </Link>
              <Link to="/driver-trippage" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Current Trips
              </Link>
              <Link to="/driver-triphistory" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900">
                Trip History
              </Link>
            </div>
            <div className='pt-4'>
            <Link to="/" className="text-black text-3xl font-bold tracking-tighter">
              FASTAXI
            </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <h1 className="text-3xl font-bold text-center text-gray-900 font-nunito p-5">Trip History</h1>
          <CardContent>
            <div className="overflow-x-auto font-nunito">
              <Table>
                  <tr className='p-3'>
                    <th className="w-[250px] text-lg">Pickup Location</th>
                    <th className="w-[250px] text-lg">Dropoff Location</th>
                    <th className="w-[200px] text-lg">Start Time</th>
                    <th className='text-lg'>Fare</th>
                    <th className='text-lg'>Status</th>
                  </tr>
                <TableBody>
                  {trips.map((trip) => (
                    <tr key={trip.trip_id}>
                      <td className="text-center py-3">{trip.pickup_location}</td>
                      <td className="text-center py-3">{trip.dropoff_location}</td>
                      <td className="text-center py-3">{new Date(trip.trip_start_time).toLocaleString()}</td>
                      <td className="text-center py-3">₹{trip.trip_fare}</td>
                      <td className="text-center py-3">{trip.status}</td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}